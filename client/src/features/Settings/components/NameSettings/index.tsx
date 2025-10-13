import { NextIcon } from '@/components/icons';
import {
  ArrowIconContainer,
  Description,
  SettingsItemContainer,
  Title,
} from '../../styles';
import { useAccountInfo } from '@/hooks';
import { AnimationOptions, WithAnimation } from '@/Animation';
import NameEditor from '../NameEditor';
import { useState } from 'react';

const ANIMATION_SETTING_EDITOR: AnimationOptions = {
  initialStyles: { opacity: 0, transform: 'translateX(15px)' },
  finalStyles: { opacity: 1, transform: 'translateX(0)' },
  transition: {
    property: ['transform', 'opacity'],
    duration: [150, 150],
    timingFunction: ['ease-out', 'ease-out'],
  },
};

const NameSettings = () => {
  const { fullName } = useAccountInfo();
  const [isNameEditorVisible, setIsNameEditorVisible] = useState(false);
  const openNameEditor = () => setIsNameEditorVisible(true);
  const closeNameEditor = () => setIsNameEditorVisible(false);

  return (
    <>
      <SettingsItemContainer onClick={openNameEditor}>
        <div>
          <Title>{fullName}</Title>
          <Description>Name</Description>
        </div>

        <ArrowIconContainer>
          <NextIcon />
        </ArrowIconContainer>
      </SettingsItemContainer>

      <WithAnimation
        isVisible={isNameEditorVisible}
        options={ANIMATION_SETTING_EDITOR}
        render={(style) => (
          <NameEditor onClose={closeNameEditor} animationStyle={style} />
        )}
      />
    </>
  );
};

export default NameSettings;
