import { Route, Routes } from 'react-router';
import { GuestStyled, Logo } from './styles';
import LogInForm from './components/LogInForm';
import SignUpForm from './components/SignUpForm';

const Guest = () => {
  return (
    <GuestStyled>
      <Logo>Semaychat</Logo>

      <Routes>
        <Route index element={<LogInForm />} />
        <Route path="/*" element={<LogInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </GuestStyled>
  );
};

export default Guest;
