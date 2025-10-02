import { useAnimation } from '@/hooks';
import { useAppStateStore } from '@/store';
import Settings from './Settings';

const SettingsModal = () => {
  const isSettingsModalVisible = useAppStateStore(
    (state) => state.isSettingsModalVisible,
  );

  const settingsAnimation = useAnimation(isSettingsModalVisible);

  return (
    settingsAnimation.isMounted && (
      <Settings animationStyle={settingsAnimation.animationStyle} />
    )
  );
};

export default SettingsModal;
