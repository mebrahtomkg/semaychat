import { User } from '@/models';
import { SignUpSchema } from '@/schemas';
import { hashPassword } from '@/utils';
import { Transaction } from 'sequelize';

interface Options extends SignUpSchema {
  transaction?: Transaction;
}

const createNewUser = async (options: Options) => {
  const { firstName, lastName, email, password, transaction } = options;

  const pwdHash = await hashPassword(password);

  const user = await User.create(
    {
      email,
      password: pwdHash,
      firstName,
      lastName,
    },
    { transaction },
  );

  return user;
};

export default createNewUser;
