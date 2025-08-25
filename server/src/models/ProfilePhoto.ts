import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/db';

class ProfilePhoto extends Model<
  InferAttributes<ProfilePhoto>,
  InferCreationAttributes<ProfilePhoto>
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare name: string;
  declare originalname: string;
  declare size: number;
  declare createdAt: CreationOptional<number>;
}

ProfilePhoto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    originalname: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  },
  {
    tableName: 'profilephotos',
    timestamps: false,
    sequelize,
  },
);

export default ProfilePhoto;
