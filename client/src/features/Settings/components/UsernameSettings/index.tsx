import { useAccountInfo } from '@/hooks';
import { WithAnimation } from '@/Animation';
import { useState } from 'react';
import { ANIMATION_EDITOR_MODAL } from '../../constants';
import UsernameEditor from './UsernameEditor';
import SettingsItem from '../SettingsItem';

const UsernameSettings = () => {
  const { username } = useAccountInfo();

  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const openEditor = () => setIsEditorVisible(true);
  const closeEditor = () => setIsEditorVisible(false);

  const title = username ? `@${username}` : 'Username';

  const description = username
    ? `Click to change username`
    : 'Click to add username';

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
          <UsernameEditor onClose={closeEditor} animationStyle={style} />
        )}
      />
    </>
  );
};

export default UsernameSettings;
