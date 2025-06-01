import React from 'react';
import { useParams } from 'react-router';
import { ProfileStyled } from './styles';
import { useUserFetcher } from '../../hooks';
import UserInfo from './UserInfo';
import UserProfilePhoto from './UserProfilePhoto';

const Profile = () => {
  const params = useParams();
  const userId = parseInt(
    typeof params?.userId === 'string' ? params.userId : '',
    10
  );

  const user = useUserFetcher(userId);

  return (
    <ProfileStyled>
      <UserProfilePhoto user={user} />
      <UserInfo user={user} />
    </ProfileStyled>
  );
};

export default Profile;
