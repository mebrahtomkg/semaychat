import { FC } from 'react';
import {
  NameInitials,
  NameInitialsContainer,
  SmallNameInitials,
  SmallNameInitialsContainer,
} from './styles';

interface NameInitialProps {
  nameInitials: string;
  isSmall?: boolean;
}

const NameInitial: FC<NameInitialProps> = ({
  nameInitials,
  isSmall = false,
}) => {
  return isSmall ? (
    <SmallNameInitialsContainer>
      <SmallNameInitials>{nameInitials}</SmallNameInitials>
    </SmallNameInitialsContainer>
  ) : (
    <NameInitialsContainer>
      <NameInitials>{nameInitials}</NameInitials>
    </NameInitialsContainer>
  );
};

export default NameInitial;
