import { LogoIcon } from '../icons';
import { LogoIconContainer, LogoStyled, LogoText } from './styles';

const Logo = () => {
  return (
    <LogoStyled>
      <LogoIconContainer>
        <LogoIcon />
      </LogoIconContainer>
      <LogoText>SemayChat</LogoText>
    </LogoStyled>
  );
};

export default Logo;
