import Guest from '@/features/Guest';
import { GlobalStyle } from '@/styles';
import { AppStyled } from './styles';
import { useAuth } from '@/hooks';
import useSocket from '@/hooks/useSocket';
import AppThemeProvider from '@/AppThemeProvider';
import AuthenticatedApp from './AuthenticatedApp';
import SplashScreen from '@/components/SplashScreen';

const App = () => {
  useSocket();

  const { isLoading, isLoggedIn } = useAuth();

  return (
    <>
      <GlobalStyle />

      <AppThemeProvider>
        <AppStyled>
          {isLoading ? (
            <SplashScreen />
          ) : isLoggedIn ? (
            <AuthenticatedApp />
          ) : (
            <Guest />
          )}
        </AppStyled>
      </AppThemeProvider>
    </>
  );
};

export default App;
