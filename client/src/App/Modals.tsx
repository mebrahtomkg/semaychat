import { AnimationOptions, WithAnimation } from '@/Animation';
import Settings from '@/features/Settings';
import Profile from '@/features/Settings/Profile';
import { useAppStateStore } from '@/store';

const ANIMATION_SLIDE_IN: AnimationOptions = {
  initialStyles: { opacity: 0, transform: 'translateX(-10px)' },
  finalStyles: { opacity: 1, transform: 'translateX(0)' },
  transition: {
    property: ['transform', 'opacity'],
    duration: [250, 250],
    timingFunction: ['ease-out', 'ease-out'],
  },
};

const Modals = () => {
  const isSettingsModalVisible = useAppStateStore(
    (state) => state.isSettingsModalVisible,
  );

  const isProfileModalVisible = useAppStateStore(
    (state) => state.isProfileModalVisible,
  );

  return (
    <>
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

export default Modals;
