import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '@/config/db';
import User from './User';

class Contact extends Model<
  InferAttributes<Contact>,
  InferCreationAttributes<Contact>
> {
  declare id: CreationOptional<number>;
  declare adderId: number; // Id of the user who added the contact
  declare addedId: number; // Id of a user who is added by ther adder.

  declare user?: User; // The contact as a User model
}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    adderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    addedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'contacts',
    timestamps: false,
    sequelize,
  },
);

export default Contact;
