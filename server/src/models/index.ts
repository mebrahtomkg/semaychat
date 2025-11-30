import User from './User';
import ProfilePhoto from './ProfilePhoto';
import Message from './Message';
import Attachment from './Attachment';
import Chat from './Chat';
import Contact from './Contact';
import BlockedUser from './BlockedUser';

export { User, ProfilePhoto, Message, Attachment, Chat, Contact, BlockedUser };

User.belongsTo(ProfilePhoto, {
  foreignKey: 'profilePhotoId',
  as: 'profilePhoto',
});

// To get a message with its attachment
Message.belongsTo(Attachment, {
  foreignKey: 'attachmentId',
  as: 'attachment',
});

User.hasMany(Chat, { foreignKey: 'user1Id', as: 'chatsWithUser2' });
Chat.belongsTo(User, { foreignKey: 'user1Id', as: 'user1' });

User.hasMany(Chat, { foreignKey: 'user2Id', as: 'chatsWithUser1' });
Chat.belongsTo(User, { foreignKey: 'user2Id', as: 'user2' });

Chat.belongsTo(Message, {
  foreignKey: 'lastMessageIdForUser1',
  as: 'lastMessageForUser1',
  onDelete: 'SET NULL',
});

Chat.belongsTo(Message, {
  foreignKey: 'lastMessageIdForUser2',
  as: 'lastMessageForUser2',
  onDelete: 'SET NULL',
});

Message.belongsTo(Chat, {
  foreignKey: 'chatId',
  as: 'chat',
});

Message.addScope('withChat', {
  include: {
    model: Chat,
    as: 'chat',
    required: true,
  },
});

// Helps us to get the  actual contact as a user model.
Contact.belongsTo(User, {
  foreignKey: 'addedId',
  as: 'user',
});

// Helps us to get a list of contacts added by a user.
User.hasMany(Contact, {
  foreignKey: 'adderId',
  as: 'contacts',
});

// To get bolcked user as a user.
BlockedUser.belongsTo(User, {
  foreignKey: 'blockedId',
  as: 'user',
});

// Helps us to get a list of blocked users of a user.
User.hasMany(BlockedUser, {
  foreignKey: 'blockerId',
  as: 'blockedUsers',
});

// To fetch a user with his/her current profile photo
User.addScope('withProfilePhoto', {
  include: {
    model: ProfilePhoto,
    as: 'profilePhoto',
    required: false,
  },
});

/**
 * Scope to fetch a user with his/her contacts list
 * @param where : {object} Where clause to select contacts
 * eg. User.scope(
 *          { method: ['withContacts', {addedId: 5 }] },
 *     ).fetch...
 */
User.addScope('withContacts', (where) => ({
  include: {
    model: Contact,
    as: 'contacts',
    required: false,
    attributes: [],
    where,
  },
}));

/**
 * Scope to fetch a user with his/her blocked users list
 * @param where : {object} Where clause to select blocked users
 * eg. User.scope(
 *          { method: ['withBlockedUsers', { blockedId: 5 }] },
 *     ).fetchAll(options);
 */
User.addScope('withBlockedUsers', (where) => ({
  include: {
    model: BlockedUser,
    as: 'blockedUsers',
    required: false,
    attributes: [],
    where,
  },
}));

// To fetch a message with its attachment
Message.addScope('withAttachment', {
  include: {
    model: Attachment,
    as: 'attachment',
    required: false,
  },
});
