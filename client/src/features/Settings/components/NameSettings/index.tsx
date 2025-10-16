import { useAccountInfo } from '@/hooks';
import { WithAnimation } from '@/Animation';
import NameEditor from './NameEditor';
import { useState } from 'react';
import { ANIMATION_EDITOR_MODAL } from '../../constants';
import SettingsItem from '../SettingsItem';

const NameSettings = () => {
  const { fullName } = useAccountInfo();

  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const openEditor = () => setIsEditorVisible(true);
  const closeEditor = () => setIsEditorVisible(false);

  return (
    <>
      <SettingsItem label="Name" value={fullName} onEdit={openEditor} />

      <WithAnimation
        isVisible={isEditorVisible}
        options={ANIMATION_EDITOR_MODAL}
        render={(style) => (
          <NameEditor onClose={closeEditor} animationStyle={style} />
        )}
      />
    </>
  );
};

export default NameSettings;
