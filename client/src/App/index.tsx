import { Route, Routes } from 'react-router';
import Home from '@/features/Home';
import Chat from '@/features/Chat';
import SideBar from '@/features/SideBar';
import Guest from '@/features/Guest';
import { GlobalStyle } from '@/styles';
import { AppStyled, PageContainer } from './styles';
import { useAuth, useResponsive } from '@/hooks';
import { MessageRequestsProcessor } from '@/features/Chat/components';
import useSocket from '@/hooks/useSocket';
import useResponsiveController from './useResponsiveController';
import { Spinner } from '@/components';
import { useThemeStore } from '@/store';
import AppThemeProvider from './AppThemeProvider';
import AccountUpdateProcessor from './AccountUpdateProcessor';
import Modals from './Modals';

const App = () => {
  useResponsiveController();
  useSocket();

  const theme = useThemeStore();

  const { isLargeScreen } = useResponsive();

  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) return <Spinner />;

  return (
    <>
      <GlobalStyle />

      <AppThemeProvider $theme={theme}>
        {isLoggedIn ? (
          <AppStyled $isLargeScreen={isLargeScreen}>
            <AccountUpdateProcessor />

            <MessageRequestsProcessor />

            {/*<SideBar />*/}

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
