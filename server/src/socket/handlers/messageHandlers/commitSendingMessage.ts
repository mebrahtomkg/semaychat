import { VISIBILITY_OPTIONS } from '@/constants';
import { Chat, Message, User } from '@/models';
import { filterMessageData, sortChatUsersId } from '@/utils';
import { Transaction } from 'sequelize';

interface MessageSendResponse {
  status: number;
  message: string;
  success?: boolean;
  data?: object;
}

interface MessageMainProps {
  transaction: Transaction;
  senderId: number;
  receiverId: number;
  content?: string | null;
  attachmentId?: number | null;
}

const commitSendingMessage = async ({
  transaction,
  senderId,
  receiverId,
  content = null,
  attachmentId = null,
}: MessageMainProps): Promise<MessageSendResponse> => {
  const [[sender], [receiver]] = await Promise.all([
    User.scope({
      method: ['withBlockedUsers', { blockedId: receiverId }],
    }).findAll({
      where: { id: senderId },
      limit: 1,
    }),

    User.scope([
      {
        method: ['withBlockedUsers', { blockedId: senderId }],
      },
      {
        method: ['withContacts', { addedId: senderId }],
      },
    ]).findAll({
      where: { id: receiverId },
      limit: 1,
    }),
  ]);

  if (!receiver) {
    return {
      status: 409,
      message: 'Cannot send message to non existed user.',
    };
  }

  // Cannot send message to blocked person.
  if (sender.blockedUsers?.length) {
    return {
      status: 403,
      message: 'You cannot send message to a user you blocked.',
    };
  }

  const senderIsBlockedByReceiver = receiver.blockedUsers
    ? receiver.blockedUsers.length > 0
    : false;

  const senderIsContactOfReceiver = receiver.contacts
    ? receiver.contacts.length > 0
    : false;

  // Receiver could disabled accepting messages via privacy settings.
  const receiverCanAcceptThisMessage =
    receiver.messageSender === VISIBILITY_OPTIONS.everybody ||
    (receiver.messageSender === VISIBILITY_OPTIONS.contacts &&
      senderIsContactOfReceiver);

  if (!receiverCanAcceptThisMessage) {
    return {
      status: 403,
      message: 'Receiver is not accepting messages.',
    };
  }

  const [user1Id, user2Id] = sortChatUsersId(senderId, receiverId);

  const [[chat], message] = await Promise.all([
    Chat.findOrCreate({
      where: { user1Id, user2Id },
      transaction,
      lock: transaction.LOCK.UPDATE,
    }),

    Message.create(
      {
        senderId,
        receiverId,
        content,
        attachmentId,
        // If the sender is blocked by the receiver, soft delete the message for
        // the receiver. so that the message will not be visible by the receiver.
        // only the sender can see the message.
        isDeletedByReceiver: senderIsBlockedByReceiver,
      },
      { transaction },
    ),
  ]);

  let valuesToUpdate: {
    lastMessageIdForUser1?: number;
    lastMessageIdForUser2?: number;
  } = {
    lastMessageIdForUser1: message.id,
    lastMessageIdForUser2: message.id,
  };

  // If the sender is blocked by receiver, only update sender's last message's id.
  if (senderIsBlockedByReceiver) {
    valuesToUpdate =
      senderId === chat.user1Id
        ? { lastMessageIdForUser1: message.id }
        : { lastMessageIdForUser2: message.id };
  }

  const [theMessage] = await Promise.all([
    Message.scope('withAttachment').findOne({
      where: {
        id: message.id,
      },
      transaction,
    }),

    chat.update(valuesToUpdate, { transaction }),
  ]);

  return {
    status: 200,
    message: 'Message sent successfully.',
    success: true,
    data: filterMessageData(theMessage as Message),
  };
};

export default commitSendingMessage;
