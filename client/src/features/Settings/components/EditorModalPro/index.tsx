import { CSSProperties, FC, ReactNode } from 'react';
import {
  DoneButton,
  EditorModalStyled,
  HeaderSection,
  MainSection,
  Title,
} from './styles';
import { BackButton } from '@/components/buttons';
import { TickIcon } from '@/components/icons';

interface EditorModalProps {
  title: string;
  children: ReactNode;
  onDone: () => void;
  onClose: () => void;
  animationStyle?: CSSProperties;
}

const EditorModal: FC<EditorModalProps> = ({
  title,
  children,
  onDone,
  onClose,
  animationStyle,
}) => {
  return (
    <EditorModalStyled style={animationStyle}>
      <HeaderSection>
        <BackButton onClick={onClose} />

        <Title>{title}</Title>

        <DoneButton type="button" onClick={onDone}>
          <TickIcon />
        </DoneButton>
      </HeaderSection>

      <MainSection>{children}</MainSection>
    </EditorModalStyled>
  );
};

export default EditorModal;
