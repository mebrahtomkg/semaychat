import { User } from '@/models';
import { SignUpSchema } from '@/schemas';
import { hashPassword } from '@/utils';

const createNewUser = async (userData: SignUpSchema) => {
  const { firstName, lastName, email, password } = userData;

  const pwdHash = await hashPassword(password);

  const user = await User.create({
    email,
    password: pwdHash,
    firstName,
    lastName,
  });

  return user;
};

export default createNewUser;
