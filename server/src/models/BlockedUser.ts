import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/db';
import User from './User';

class BlockedUser extends Model<
  InferAttributes<BlockedUser>,
  InferCreationAttributes<BlockedUser>
> {
  declare id: CreationOptional<number>;
  declare blockerId: number;
  declare blockedId: number;

  declare user?: User; // The blocked user as a User model
}

BlockedUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    blockerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    blockedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'blockedusers',
    timestamps: false,
    sequelize,
  },
);

export default BlockedUser;
