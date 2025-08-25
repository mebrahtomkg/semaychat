import randomString from './randomString';

const randomFileName = async () => `${Date.now()}-${await randomString(20)}`;

export default randomFileName;
