import sequelize from '@/config/db';
import { VISIBILITY_OPTIONS } from '@/constants';
import { Attachment, Chat, Message, User } from '@/models';
import {
  applyUserPrivacy,
  filterAttachmentData,
  filterMessageData,
  sortChatUsersId,
} from '@/utils';

export class MessageSendError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'MessageSendError';
    this.status = status;
  }
}

interface MessageSendProps {
  senderId: number;
  receiverId: number;
  content?: string;
  attachment?: Pick<
    Attachment,
    'name' | 'originalname' | 'size' | 'width' | 'height' | 'caption'
  >;
}

const sendMessage = async ({
  senderId,
  receiverId,
  content,
  attachment,
}: MessageSendProps) => {
  const transaction = await sequelize.transaction();

  try {
    const [sender, receiver] = await Promise.all([
      // Get The Sender
      User.scope([
        { method: ['withBlockedUsers', { blockedId: receiverId }] },
        { method: ['withContacts', { addedId: receiverId }] },
      ]).findOne({ where: { id: senderId }, limit: 1, transaction }),

      // Get The Receiver
      User.scope([
        { method: ['withBlockedUsers', { blockedId: senderId }] },
        { method: ['withContacts', { addedId: senderId }] },
      ]).findOne({ where: { id: receiverId }, limit: 1, transaction }),
    ]);

    if (!sender) {
      throw new MessageSendError('Sender does not exist.', 409);
    }

    if (!receiver) {
      throw new MessageSendError('Receiver does not exist.', 409);
    }

    const isSenderBlockedByReceiver = !!receiver.blockedUsers?.length;
    const isReceiverBlockedBySender = !!sender.blockedUsers?.length;

    const isSenderContactOfReceiver = !!receiver.contacts?.length;
    const isReceiverContactOfSender = !!sender.contacts?.length;

    if (isReceiverBlockedBySender) {
      throw new MessageSendError(
        'You cannot send message to a user you blocked.',
        403,
      );
    }

    // Receiver could disabled accepting messages via privacy settings.
    const canReceiverAcceptThisMessage =
      receiver.messageSender === VISIBILITY_OPTIONS.everybody ||
      (receiver.messageSender === VISIBILITY_OPTIONS.contacts &&
        isSenderContactOfReceiver);

    if (!canReceiverAcceptThisMessage) {
      throw new MessageSendError('Receiver is not accepting messages.', 403);
    }

    const savedAttachment = attachment
      ? await Attachment.create(attachment, { transaction })
      : null;

    const [user1Id, user2Id] = sortChatUsersId(senderId, receiverId);

    const [chat] = await Chat.findOrCreate({
      where: { user1Id, user2Id },
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    const message = await Message.create(
      {
        senderId,
        receiverId,
        chatId: chat.id,
        content: content || null,
        attachmentId: savedAttachment?.id || null,
        // If the sender is blocked by the receiver, soft delete the message for
        // the receiver. so that the message will not be visible by the receiver.
        // only the sender can see the message.
        isDeletedByReceiver: isSenderBlockedByReceiver,
      },
      { transaction },
    );

    type ChatUpdateValues = Partial<
      Pick<Chat, 'lastMessageIdForUser1' | 'lastMessageIdForUser2'>
    >;

    let chatUpdateValues: ChatUpdateValues = {};

    type ChatUser = 'user1' | 'user2';

    const senderChatUser: ChatUser =
      senderId === chat.user1Id ? 'user1' : 'user2';

    // If the sender is blocked by receiver, only update sender's last message's id.
    if (isSenderBlockedByReceiver) {
      if (senderChatUser === 'user1') {
        chatUpdateValues = { lastMessageIdForUser1: message.id };
      } else {
        chatUpdateValues = { lastMessageIdForUser2: message.id };
      }
    } else {
      chatUpdateValues = {
        lastMessageIdForUser1: message.id,
        lastMessageIdForUser2: message.id,
      };
    }

    await chat.update(chatUpdateValues, { transaction });

    await transaction.commit();

    const filteredMessage = {
      ...filterMessageData(message),
      attachment: savedAttachment
        ? filterAttachmentData(savedAttachment)
        : undefined,
    };

    return {
      message: filteredMessage,
      sender: applyUserPrivacy(sender, {
        // Tip: Requester is the receiver, since the data will be sent to the receiver via socket
        requesterIsBlocked: isReceiverBlockedBySender,
        requesterIsContact: isReceiverContactOfSender,
      }),
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export default sendMessage;
