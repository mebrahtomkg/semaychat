import {
  Description,
  HeaderSection,
  Logo,
  LogoPartOne,
  LogoPartTwo,
} from './styles';

const Header = () => {
  return (
    <HeaderSection>
      <Logo>
        <LogoPartOne>Semay</LogoPartOne>
        <LogoPartTwo>chat</LogoPartTwo>
      </Logo>
      <Description>Fast And Secure Real Time Messaging Platform</Description>
    </HeaderSection>
  );
};

export default Header;
