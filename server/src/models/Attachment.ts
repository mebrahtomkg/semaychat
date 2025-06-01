import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize';
import sequelize from '../config/db';

class Attachment extends Model<
  InferAttributes<Attachment>,
  InferCreationAttributes<Attachment>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare extension: string;
  declare size: number;
  declare caption: string | null;
}

Attachment.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    extension: {
      type: DataTypes.STRING,
      allowNull: false
    },

    size: {
      type: DataTypes.BIGINT,
      allowNull: false
    },

    caption: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: 'attachments',
    timestamps: false,
    sequelize
  }
);

export default Attachment;
