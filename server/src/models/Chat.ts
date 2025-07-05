import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize';
import sequelize from '@/config/db';
import User from './User';
import Message from './Message';

class Chat extends Model<InferAttributes<Chat>, InferCreationAttributes<Chat>> {
  declare id: CreationOptional<number>;
  declare user1Id: number;
  declare user2Id: number;

  // By making lastMessageIdForUser1 and lastMessageIdForUser2 optional, we allow one
  // sided message soft deletion and the other user keep accessing the messages.
  declare lastMessageIdForUser1: number | null;
  declare lastMessageIdForUser2: number | null;

  // Associations
  declare user1?: User;
  declare user2?: User;
  declare lastMessageForUser1?: Message;
  declare lastMessageForUser2?: Message;
}

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    user1Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    user2Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    lastMessageIdForUser1: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    lastMessageIdForUser2: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    tableName: 'chats',
    timestamps: false,
    sequelize
  }
);

export default Chat;
