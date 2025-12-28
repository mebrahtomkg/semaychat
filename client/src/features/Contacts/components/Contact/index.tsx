import { FC } from 'react';
import { ContactStyled, Name, NameContainer, Status } from './styles';
import { User } from '@/types';
import Avatar from '@/components/Avatar';
import { useUserInfo } from '@/hooks';

interface ContactProps {
  user: User;
  index: number;
}

const Contact: FC<ContactProps> = ({ user, index }) => {
  const { fullName, nameInitials, photoUrl, isOnline, status } =
    useUserInfo(user);

  return (
    <ContactStyled to={`/chat/${user.id}`}>
      <Avatar initials={nameInitials} imageUrl={photoUrl} itemIndex={index} />

      <NameContainer>
        <Name>{fullName}</Name>
        <Status $isOnline={isOnline}>{status}</Status>
      </NameContainer>
    </ContactStyled>
  );
};

export default Contact;
