import { ANIMATION_MODAL_SUBSTANTIAL, WithAnimation } from '@/Animation';
import Settings from '@/features/Settings';
import Profile from '@/features/Settings/Profile';
import { useAppStateStore } from '@/store';

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
        options={ANIMATION_MODAL_SUBSTANTIAL}
        render={(style) => <Settings animationStyle={style} />}
      />

      <WithAnimation
        isVisible={isProfileModalVisible}
        options={ANIMATION_MODAL_SUBSTANTIAL}
        render={(style) => <Profile animationStyle={style} />}
      />
    </>
  );
};

export default Modals;
