import { Route, Routes } from 'react-router';
import { GuestContainer, GuestStyled, Logo } from './styles';
import LogInForm from './components/LogInForm';
import SignUpForm from './components/SignUpForm';

const Guest = () => {
  return (
    <GuestContainer>
      <GuestStyled>
        <Logo>SemayChat</Logo>

        <Routes>
          <Route path="/*" element={<LogInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </GuestStyled>
    </GuestContainer>
  );
};

export default Guest;
