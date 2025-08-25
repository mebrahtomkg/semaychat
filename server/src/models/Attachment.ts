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
