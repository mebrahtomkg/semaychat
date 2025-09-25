import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/db';

class Attachment extends Model<
  InferAttributes<Attachment>,
  InferCreationAttributes<Attachment>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare originalname: string;
  declare size: number;
  declare width: number | null;
  declare height: number | null;
  declare caption: string | null;
}

Attachment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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

    width: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    caption: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'attachments',
    timestamps: false,
    sequelize,
  },
);

export default Attachment;
