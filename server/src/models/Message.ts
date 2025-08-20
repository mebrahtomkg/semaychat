import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/db';
import Attachment from './Attachment';

class Message extends Model<
  InferAttributes<Message>,
  InferCreationAttributes<Message>
> {
  declare id: CreationOptional<number>;
  declare senderId: number;
  declare receiverId: number;
  declare content: string | null;
  declare attachmentId: number | null;
  declare isSeen: CreationOptional<boolean>;
  declare isDeletedBySender: CreationOptional<boolean>;
  declare isDeletedByReceiver: CreationOptional<boolean>;
  declare createdAt: CreationOptional<number>;
  declare editedAt: CreationOptional<number>;

  declare attachment?: Attachment;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    attachmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    isSeen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    isDeletedBySender: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    isDeletedByReceiver: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    createdAt: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: () => Date.now(),
      get() {
        const value = this.getDataValue('createdAt');
        return value === null ? null : Number.parseInt(`${value}`, 10);
      },
    },

    editedAt: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: () => Date.now(),
      get() {
        const value = this.getDataValue('editedAt');
        return value === null ? null : Number.parseInt(`${value}`, 10);
      },
    },
  },
  {
    tableName: 'messages',
    timestamps: false,
    sequelize,
  },
);

export default Message;
