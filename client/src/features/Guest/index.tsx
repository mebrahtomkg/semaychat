import { Route, Routes } from 'react-router';
import {
  GuestContainer,
  GuestStyled,
  Logo,
  LogoIconContainer,
  LogoText,
} from './styles';
import LogInForm from './components/LogInForm';
import SignUpForm from './components/SignUpForm';
import { LogoIcon } from '@/components/icons';

const Guest = () => {
  return (
    <GuestContainer>
      <GuestStyled>
        <Logo>
          <LogoIconContainer>
            <LogoIcon />
          </LogoIconContainer>
          <LogoText>SemayChat</LogoText>
        </Logo>

        <Routes>
          <Route path="/*" element={<LogInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </GuestStyled>
    </GuestContainer>
  );
};

export default Guest;
