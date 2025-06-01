import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize';
import sequelize from '../config/db';
import User from './User';

class Contact extends Model<
  InferAttributes<Contact>,
  InferCreationAttributes<Contact>
> {
  id: CreationOptional<number>;
  adderId: number; // Id of the user who added the contact
  addedId: number; // Id of a user who is added by ther adder.

  user?: User; // The contact as a User model
}

Contact.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    adderId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },

    addedId: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  },
  {
    tableName: 'contacts',
    timestamps: false,
    sequelize
  }
);

export default Contact;
