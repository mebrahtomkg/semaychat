import { ThemeProvider } from 'styled-components';
import { Route, Routes } from 'react-router';
import Home from '@/features/Home';
import Chat from '@/features/Chat';
import SideBar from '@/features/SideBar';
import Guest from '@/features/Guest';
import useApp from './useApp';
import { GlobalStyle } from '@/styles';
import { AppContainer, PageContainer } from './styles';
import { useAuth, useBlockedUsersFetcher, useContactsFetcher } from '@/hooks';
import Spinner from '@/components/spinner';
import AppContext from './AppContext';
import { MessageRequestsProcessor } from '@/features/Chat/components';
import useSocket from '@/hooks/useSocket';

const App = () => {
  const app = useApp();
  const { theme, isLargeScreen } = app;

  const { isLoading, isLoggedIn } = useAuth();

  useSocket();

  useContactsFetcher();
  useBlockedUsersFetcher();

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
