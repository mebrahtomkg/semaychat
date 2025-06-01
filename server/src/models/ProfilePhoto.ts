import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize';
import sequelize from '../config/db';

class ProfilePhoto extends Model<
  InferAttributes<ProfilePhoto>,
  InferCreationAttributes<ProfilePhoto>
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare createdAt: CreationOptional<number>;
}

ProfilePhoto.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    userId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },

    createdAt: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: () => Date.now()
    }
  },
  {
    tableName: 'profilephotos',
    timestamps: false,
    sequelize
  }
);

export default ProfilePhoto;
