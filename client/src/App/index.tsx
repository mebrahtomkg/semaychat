import { ThemeProvider } from 'styled-components';
import { Route, Routes } from 'react-router';
import Home from '@/features/Home';
import Chat from '@/features/Chat';
import SideBar from '@/features/SideBar';
import Guest from '@/features/Guest';
import useApp from './useApp';
import Profile from '@/features/Profile';
import { GlobalStyle } from '@/styles';
import { AppContainer, PageContainer } from './styles';
import useMessageRequestSystem, { MRSContext } from '@/features/Chat/MRS';
import { useAuth, useBlockedUsersFetcher, useContactsFetcher } from '@/hooks';
import Spinner from '@/components/spinner';
import AppContext from './AppContext';

const App = () => {
  const app = useApp();
  const { theme, isLargeScreen } = app;

  const MRS = useMessageRequestSystem();

  const { isLoading, isLoggedIn } = useAuth();

  useContactsFetcher();
  useBlockedUsersFetcher();

  if (isLoading) return <Spinner />;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      {isLoggedIn ? (
        <MRSContext value={MRS}>
          <AppContext value={app}>
            <AppContainer $isLargeScreen={isLargeScreen}>
              <SideBar />

              {isLargeScreen && <Home />}

              <PageContainer>
                <Routes>
                  {!isLargeScreen && <Route index element={<Home />} />}
                  <Route path="/chat/:chatPartnerId" element={<Chat />} />
                  <Route path="/profile/:userId" element={<Profile />} />
                </Routes>
              </PageContainer>
            </AppContainer>
          </AppContext>
        </MRSContext>
      ) : (
        <Guest />
      )}
    </ThemeProvider>
  );
};

export default App;
