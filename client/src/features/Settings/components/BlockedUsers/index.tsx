import {
  BlockedUsersContainer,
  BlockedUsersStyled,
  HeaderSection,
  Title,
} from './styles';
import { useBlockedUsers } from '@/hooks';
import { BackButton, CloseButton } from '@/components/buttons';
import { useState } from 'react';
import { ModalTitle } from '@/styles';
import SettingsItem from '../SettingsItem';
import { WithAnimation } from '@/Animation';
import { ANIMATION_EDITOR_MODAL } from '../../constants';
import BlockedUser from '../BlockedUser';

const BlockedUsers = () => {
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
          <BlockedUsersStyled style={style}>
            <HeaderSection>
              <BackButton onClick={closeEditor} />
              <Title>Blocked Users</Title>
            </HeaderSection>

            <BlockedUsersContainer>
              {blockedUsers.map((user) => (
                <BlockedUser key={`${user.id}`} user={user} />
              ))}
            </BlockedUsersContainer>
          </BlockedUsersStyled>
        )}
      />
    </>
  );
};

export default BlockedUsers;
