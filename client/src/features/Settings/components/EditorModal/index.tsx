import type { CSSProperties, FC, ReactNode } from 'react';
import {
  CancelButton,
  DoneButton,
  EditorModalOverlay,
  EditorModalStyled,
  FooterSection,
  HeaderSection,
  MainSection,
  Title,
} from './styles';
import { CloseButton } from '../../../../components/buttons';
import { useAnimation, useAppContext } from '@/hooks';

interface EditorModalProps {
  title: string;
  animationStyle: CSSProperties;
  children: ReactNode;
  onDone: () => void;
  onClose: () => void;
  leftButtonConfig?: {
    label?: string;
    action?: () => void;
  };
  rightButtonConfig?: {
    label?: string;
    action?: () => void;
  };
}

const EditorModal: FC<EditorModalProps> = ({
  title,
  animationStyle,
  children,
  onDone,
  onClose,
  leftButtonConfig = { label: 'Cancel', action: undefined },
  rightButtonConfig = { label: 'Done', action: undefined },
}) => {
  const { windowWidth } = useAppContext();

  const handleOverlayClick = (event) => {
    // Stop any onclick event from this component bubling up to parent node.
    event.stopPropagation();

    // Make sure the event didn't come from children of the overlay.
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <EditorModalOverlay
      style={{ ...animationStyle, transform: undefined }}
      onClick={handleOverlayClick}
    >
      <EditorModalStyled style={animationStyle} $windowWidth={windowWidth}>
        <HeaderSection>
          <Title>{title}</Title>
          <CloseButton onClick={onClose} />
        </HeaderSection>
        <MainSection>{children}</MainSection>
        <FooterSection>
          <CancelButton
            type="button"
            onClick={leftButtonConfig.action || onClose}
          >
            {leftButtonConfig.label}
          </CancelButton>
          <DoneButton
            type="button"
            onClick={rightButtonConfig.action || onDone}
          >
            {rightButtonConfig.label}
          </DoneButton>
        </FooterSection>
      </EditorModalStyled>
    </EditorModalOverlay>
  );
};

export default EditorModal;
