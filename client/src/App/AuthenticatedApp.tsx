import Home from '@/features/Home';
import {
  AccountUpdateProcessor,
  AttachmentUploadProcessor,
  HeartbeatProcessor,
  MessageRequestsProcessor,
} from '@/processors';
import { PageContainer } from './styles';
import { Route, Routes } from 'react-router';
import Chat from '@/features/Chat';
import { useResponsive } from '@/hooks';
import { ANIMATION_SLIDE_IN, WithAnimation } from '@/Animation';
import { useAppStateStore } from '@/store';
import Settings from '@/features/Settings';
import Profile from '@/features/Settings/Profile';

const AuthenticatedApp = () => {
  const { isLargeScreen } = useResponsive();

  const isSettingsModalVisible = useAppStateStore(
    (state) => state.isSettingsModalVisible,
  );

  const isProfileModalVisible = useAppStateStore(
    (state) => state.isProfileModalVisible,
  );

  return (
    <>
      <HeartbeatProcessor />
      <AccountUpdateProcessor />
      <MessageRequestsProcessor />
      <AttachmentUploadProcessor />

      {isLargeScreen && <Home />}

      <PageContainer>
        <Routes>
          <Route index element={!isLargeScreen ? <Home /> : null} />
          <Route path="/chat/:chatPartnerId" element={<Chat />} />
        </Routes>
      </PageContainer>

      <WithAnimation
        isVisible={isSettingsModalVisible}
        options={ANIMATION_SLIDE_IN}
        render={(style) => <Settings animationStyle={style} />}
      />

      <WithAnimation
        isVisible={isProfileModalVisible}
        options={ANIMATION_SLIDE_IN}
        render={(style) => <Profile animationStyle={style} />}
      />
    </>
  );
};

export default AuthenticatedApp;
