import { Route, Routes } from 'react-router';
import Home from '@/features/Home';
import Chat from '@/features/Chat';
import SideBar from '@/features/SideBar';
import Guest from '@/features/Guest';
import { GlobalStyle } from '@/styles';
import { AppContainer, PageContainer } from './styles';
import { useAuth, useResponsive } from '@/hooks';
import { MessageRequestsProcessor } from '@/features/Chat/components';
import useSocket from '@/hooks/useSocket';
import useResponsiveController from './useResponsiveController';
import useAppTheme from './useAppTheme';
import { Spinner } from '@/components';

const App = () => {
  useResponsiveController();
  useSocket();

  // biome-ignore lint/correctness/noUnusedVariables: <will be used>
  const { theme, toggleTheme } = useAppTheme();

  const { isLargeScreen } = useResponsive();

  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) return <Spinner />;

  return (
    <>
      <GlobalStyle />

      {isLoggedIn ? (
        <>
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
        </>
      ) : (
        <Guest />
      )}
    </>
  );
};

export default App;
