import { Route, Routes } from 'react-router';
import Home from '@/features/Home';
import Chat from '@/features/Chat';
import Guest from '@/features/Guest';
import { GlobalStyle } from '@/styles';
import { AppStyled, PageContainer } from './styles';
import { useAuth, useResponsive } from '@/hooks';
import useSocket from '@/hooks/useSocket';
import useResponsiveController from './useResponsiveController';
import { Spinner } from '@/components';
import Modals from './Modals';
import AppThemeProvider from '@/AppThemeProvider';
import { AccountUpdateProcessor, MessageRequestsProcessor } from '@/processors';

const App = () => {
  useResponsiveController();
  useSocket();

  const { isLargeScreen } = useResponsive();

  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) return <Spinner />;

  return (
    <>
      <GlobalStyle />

      <AppThemeProvider>
        {isLoggedIn ? (
          <AppStyled>
            <AccountUpdateProcessor />
            <MessageRequestsProcessor />

            {isLargeScreen && <Home />}

            <PageContainer>
              <Routes>
                {<Route index element={!isLargeScreen ? <Home /> : null} />}
                <Route path="/chat/:chatPartnerId" element={<Chat />} />
              </Routes>
            </PageContainer>

            <Modals />
          </AppStyled>
        ) : (
          <Guest />
        )}
      </AppThemeProvider>
    </>
  );
};

export default App;
