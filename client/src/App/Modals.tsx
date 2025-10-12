import { ANIMATION_MODAL_SUBSTANTIAL, WithAnimation } from '@/Animation';
import Settings from '@/features/Settings';
import { useAppStateStore } from '@/store';

const Modals = () => {
  const isSettingsModalVisible = useAppStateStore(
    (state) => state.isSettingsModalVisible,
  );

  return (
    <WithAnimation
      isVisible={isSettingsModalVisible}
      options={ANIMATION_MODAL_SUBSTANTIAL}
      render={(style) => <Settings animationStyle={style} />}
    />
  );
};

export default Modals;
