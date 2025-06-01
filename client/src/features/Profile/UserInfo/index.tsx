import React, { FC } from 'react';
import { InfoItem, InfoItemDesc, InfoItemTitle, InfoStyled } from './styles';
import { User } from '../../../types';

interface UserInfoProps {
  user?: User;
}

const UserInfo: FC<UserInfoProps> = ({ user }) => {
  return (
    <InfoStyled>
      {user?.email && (
        <InfoItem>
          <InfoItemTitle>{user.email}</InfoItemTitle>
          <InfoItemDesc>Email</InfoItemDesc>
        </InfoItem>
      )}

      {user?.bio && (
        <InfoItem>
          <InfoItemTitle>{user.bio}</InfoItemTitle>
          <InfoItemDesc>Bio</InfoItemDesc>
        </InfoItem>
      )}

      {user?.username && (
        <InfoItem>
          <InfoItemTitle>@{user.username}</InfoItemTitle>
          <InfoItemDesc>Username</InfoItemDesc>
        </InfoItem>
      )}
    </InfoStyled>
  );
};

export default UserInfo;
