import { Route, Routes } from 'react-router';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';
import Header from './Header';
import styled from 'styled-components';

const CenteredPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Guest = () => {
  return (
    <CenteredPage>
      <Header />
      <main>
        <Routes>
          <Route index element={<LogInForm />} />
          <Route path="/*" element={<LogInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </main>
    </CenteredPage>
  );
};

export default Guest;
