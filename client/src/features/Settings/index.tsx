import { useAppStateStore } from '@/store';
import Settings from './Settings';
import { useMemo } from 'react';
import { useAnimation } from '@/Animation';

const SettingsModal = () => {
  const isSettingsModalVisible = useAppStateStore(
    (state) => state.isSettingsModalVisible,
  );

  const animationOptions = useMemo(
    () => ({
      initialStyles: {
        opacity: 0.5,
        transform: 'scale(0.8)',
      },
      finalStyles: {
        opacity: 1,
        transform: 'scale(1.0)',
      },
      transition: {
        property: ['transform', 'opacity'],
        duration: [200, 200],
        timingFunction: ['ease-in-out', 'ease-in-out'],
      },
    }),
    [],
  );

  const settingsAnimation = useAnimation(
    isSettingsModalVisible,
    animationOptions,
  );

  return (
    settingsAnimation.isMounted && (
      <Settings animationStyle={settingsAnimation.animationStyle} />
    )
  );
};

export default SettingsModal;
