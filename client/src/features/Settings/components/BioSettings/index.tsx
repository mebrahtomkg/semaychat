import { useAccountInfo } from '@/hooks';
import { WithAnimation } from '@/Animation';
import { useState } from 'react';
import { ANIMATION_EDITOR_MODAL } from '../../constants';
import SettingsItem from '../SettingsItem';
import BioEditor from './BioEditor';

const BioSettings = () => {
  const { bio } = useAccountInfo();

  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const openEditor = () => setIsEditorVisible(true);
  const closeEditor = () => setIsEditorVisible(false);

  const title = bio ? bio : 'Bio';
  const description = bio ? 'Bio' : 'Add a few words about yourself';

  return (
    <>
      <SettingsItem
        title={title}
        description={description}
        onClick={openEditor}
      />

      <WithAnimation
        isVisible={isEditorVisible}
        options={ANIMATION_EDITOR_MODAL}
        render={(style) => (
          <BioEditor onClose={closeEditor} animationStyle={style} />
        )}
      />
    </>
  );
};

export default BioSettings;
