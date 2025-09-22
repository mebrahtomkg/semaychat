import { Route, Routes } from 'react-router';
import { Header, LogInForm, SignUpForm } from './components';
import { CenteredPage } from './styles';

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
