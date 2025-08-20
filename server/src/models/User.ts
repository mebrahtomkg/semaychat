import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/db';
import {
  EMAIL_VISIBILITY,
  LAST_SEEN_VISIBILITY,
  PROFILE_PHOTOS_VISIBILITY,
  MESSAGE_SENDER,
} from '@/constants';
import { VisibilityOption } from '@/types';
import BlockedUser from './BlockedUser';
import Contact from './Contact';
import ProfilePhoto from './ProfilePhoto';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;
  declare firstName: string;
  declare lastName: string | null; // lastName is optional
  declare username: string | null; // username is optional
  declare bio: string | null; // bio is optional
  declare profilePhotoId: number | null; // Profile photo is optional
  declare emailVisibility: CreationOptional<VisibilityOption>;
  declare lastSeenVisibility: CreationOptional<VisibilityOption>;
  declare profilePhotosVisibility: CreationOptional<VisibilityOption>;
  declare messageSender: CreationOptional<VisibilityOption>;
  declare lastSeenAt: CreationOptional<number>;

  declare profilePhoto?: ProfilePhoto;
  declare blockedUsers?: BlockedUser[];
  declare contacts?: Contact[];
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    profilePhotoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    emailVisibility: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: EMAIL_VISIBILITY.defaultValue,
    },

    lastSeenVisibility: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: LAST_SEEN_VISIBILITY.defaultValue,
    },

    profilePhotosVisibility: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: PROFILE_PHOTOS_VISIBILITY.defaultValue,
    },

    messageSender: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: MESSAGE_SENDER.defaultValue,
    },

    lastSeenAt: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: () => Date.now(),
      get() {
        const value = this.getDataValue('lastSeenAt');
        return value === null ? null : Number.parseInt(`${value}`, 10);
      },
    },
  },
  {
    tableName: 'users',
    timestamps: false,
    sequelize,
  },
);

export default User;
