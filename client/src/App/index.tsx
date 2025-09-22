import { ThemeProvider } from 'styled-components';
import { Route, Routes } from 'react-router';
import Home from '@/features/Home';
import Chat from '@/features/Chat';
import SideBar from '@/features/SideBar';
import Guest from '@/features/Guest';
import useApp from './useApp';
import { GlobalStyle } from '@/styles';
import { AppContainer, PageContainer } from './styles';
import { useAuth, useResponsive } from '@/hooks';
import Spinner from '@/components/spinner';
import AppContext from './AppContext';
import { MessageRequestsProcessor } from '@/features/Chat/components';
import useSocket from '@/hooks/useSocket';
import useResponsiveController from './useResponsiveController';

const App = () => {
  useResponsiveController();
  useSocket();

  const app = useApp();

  const { theme } = app;

  const { isLargeScreen } = useResponsive();

  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) return <Spinner />;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      {isLoggedIn ? (
        <AppContext.Provider value={app}>
          <MessageRequestsProcessor />

          <AppContainer $isLargeScreen={isLargeScreen}>
            <SideBar />

            {isLargeScreen && <Home />}

            <PageContainer>
              <Routes>
                {!isLargeScreen && <Route index element={<Home />} />}
                <Route path="/chat/:chatPartnerId" element={<Chat />} />
              </Routes>
            </PageContainer>
          </AppContainer>
        </AppContext.Provider>
      ) : (
        <Guest />
      )}
    </ThemeProvider>
  );
};

export default App;
