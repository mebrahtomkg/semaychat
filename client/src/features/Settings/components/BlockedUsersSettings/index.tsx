import { useBlockedUsers } from '@/hooks';
import { WithAnimation } from '@/Animation';
import { useState } from 'react';
import { ANIMATION_EDITOR_MODAL } from '../../constants';
import SettingsItem from '../SettingsItem';
import BlockedUsers from '@/features/BlockedUsers';

const BlockedUsersSettings = () => {
  const blockedUsers = useBlockedUsers();

  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const openEditor = () => setIsEditorVisible(true);
  const closeEditor = () => setIsEditorVisible(false);

  const description = `You blocked ${blockedUsers.length} users`;

  return (
    <>
      <SettingsItem
        title="Blocked Users"
        description={description}
        onClick={openEditor}
      />

      <WithAnimation
        isVisible={isEditorVisible}
        options={ANIMATION_EDITOR_MODAL}
        render={(style) => (
          <BlockedUsers animationStyle={style} onClose={closeEditor} />
        )}
      />
    </>
  );
};

export default BlockedUsersSettings;
