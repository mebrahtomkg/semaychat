
import styled from 'styled-components';

const HeaderSection = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  font-weight: 400;
  border-bottom: 5px solid #b734e6;
  border-radius: 40px;
  padding: 0px 0px 5px 0px;
  margin-bottom: 10px;
  border-bottom-left-radius: 0px;
`;

const LogoPartOne = styled.span`
  color: #58c70c;
`;

const LogoPartTwo = styled.span`
  color: #b734e6;
`;

const Description = styled.h2`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
  font-style: italic;
  color: #afb917;
`;

export default function Header() {
  return (
    <HeaderSection>
      <Logo>
        <LogoPartOne>Spark</LogoPartOne>
        <LogoPartTwo>chat</LogoPartTwo>
      </Logo>
      <Description>Fast And Secure Real Time Messaging Platform</Description>
    </HeaderSection>
  );
}
