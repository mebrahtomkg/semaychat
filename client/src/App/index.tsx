import Guest from '@/features/Guest';
import { GlobalStyle } from '@/styles';
import { AppStyled } from './styles';
import { useAuth } from '@/hooks';
import useSocket from '@/hooks/useSocket';
import useResponsiveController from './useResponsiveController';
import { Spinner } from '@/components';
import AppThemeProvider from '@/AppThemeProvider';
import AuthenticatedApp from './AuthenticatedApp';

const App = () => {
  useResponsiveController();
  useSocket();

  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) return <Spinner />;

  return (
    <>
      <GlobalStyle />

      <AppThemeProvider>
        <AppStyled>{isLoggedIn ? <AuthenticatedApp /> : <Guest />}</AppStyled>
      </AppThemeProvider>
    </>
  );
};

export default App;
