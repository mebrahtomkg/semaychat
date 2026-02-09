import Guest from '@/features/Guest';
import { GlobalStyle } from '@/styles';
import { AppStyled } from './styles';
import { useAuth, useTimeout } from '@/hooks';
import useSocket from '@/hooks/useSocket';
import AppThemeProvider from '@/AppThemeProvider';
import AuthenticatedApp from './AuthenticatedApp';
import SplashScreen from '@/components/SplashScreen';

const SPLASH_DURATION_MS = 3000;

const App = () => {
  useSocket();
  const { isTimeoutPending } = useTimeout(SPLASH_DURATION_MS);
  const { isLoading, isLoggedIn } = useAuth();

  const isSplashScreenVisible = isLoading || isTimeoutPending;

  return (
    <>
      <GlobalStyle />

      <AppThemeProvider>
        <AppStyled>
          {isSplashScreenVisible ? (
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
