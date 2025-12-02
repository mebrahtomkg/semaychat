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

interface BaseMessageSendPayload {
  messageType: 'text' | 'attachment';
  userId: number;
  receiverId: number;
  parentMessageId?: number;
}

interface TextMessageSendPayload extends BaseMessageSendPayload {
  messageType: 'text';
  content: string;
}

interface AttachmentSendPayload extends BaseMessageSendPayload {
  messageType: 'attachment';
  attachment: Pick<
    Attachment,
    'name' | 'originalname' | 'size' | 'width' | 'height' | 'caption'
  >;
}

type MessageSendPayload = TextMessageSendPayload | AttachmentSendPayload;

const sendMessage = async (payload: MessageSendPayload) => {
  const transaction = await sequelize.transaction();

  try {
    const { messageType, userId, receiverId, parentMessageId } = payload;

    const senderId = userId;

    let content: string | null = null;

    if (messageType === 'text') {
      content = payload.content.trim();

      if (!content) {
        throw new MessageSendError('Invalid message content.', 400);
      }
      //TODO: Check content for xss security, filter it.
    }

    if (userId === receiverId) {
      throw new MessageSendError('You cannot send message to yourself.', 400);
    }

    const [user1Id, user2Id] = sortChatUsersId(senderId, receiverId);
    let chat = await Chat.findOne({
      where: { user1Id, user2Id },
      transaction,
      lock: transaction.LOCK.UPDATE,
    });

    if (parentMessageId) {
      const parentMessage = await Message.findByPk(parentMessageId, {
        transaction,
      });

      if (!parentMessage) {
        throw new MessageSendError('Message being replied to not found.', 400);
      }

      // Parent message must be in this chat
      if (!chat || parentMessage.chatId !== chat.id) {
        throw new MessageSendError(
          'Cannot reply to a message outside of this chat.',
          400,
        );
      }
    }

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

    let attachment: Attachment | null = null;

    if (messageType === 'attachment') {
      attachment = await Attachment.create(payload.attachment, {
        transaction,
      });
    }

    if (!chat) {
      chat = await Chat.create(
        { user1Id, user2Id },
        {
          transaction,
          lock: transaction.LOCK.UPDATE,
        },
      );
    }

    const message = await Message.create(
      {
        senderId,
        receiverId,
        chatId: chat.id,
        content,
        attachmentId: attachment?.id || null,
        parentMessageId: parentMessageId || null,
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

    const sentMessage = await Message.scope([
      'withAttachment',
      'withParentMessage',
    ]).findByPk(message.id, { transaction });

    if (!sentMessage) {
      throw new Error('Unable to fetch saved message from database.');
    }

    const filteredMessage = filterMessageData(sentMessage);

    await transaction.commit();

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
