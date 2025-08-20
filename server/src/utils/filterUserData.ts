import { User } from '../models';

const filterUserData = (user: User): Partial<User> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, profilePhotoId, ...restProps } = user;

  return restProps;
};

export default filterUserData;
