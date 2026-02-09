import { Route, Routes } from 'react-router';
import { GuestContainer, GuestStyled } from './styles';
import LogInForm from './components/LogInForm';
import SignUpForm from './components/SignUpForm';
import Logo from '@/components/Logo';

const Guest = () => {
  return (
    <GuestContainer>
      <GuestStyled>
        <Logo />

        <Routes>
          <Route path="/*" element={<LogInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </GuestStyled>
    </GuestContainer>
  );
};

export default Guest;
