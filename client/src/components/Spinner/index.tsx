import { FC, MouseEventHandler } from 'react';
import { Dot, DotsContainer, SpinnerOverlay, SpinnerStyled } from './styles';
import ConfirmDialog, { useConfirmDialog } from '../ConfirmDialog';
import { ANIMATION_DIALOG_FAST, WithAnimation } from '@/Animation';

export { default as useSpinner } from './useSpinner';

interface SpinnerProps {
  onCancelOperation: () => void;
}

const Spinner: FC<SpinnerProps> = ({ onCancelOperation }) => {
  const delays = [0, 150, 300];

  const { isConfirmDialogVisible, openConfirmDialog, closeConfirmDialog } =
    useConfirmDialog();

  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      openConfirmDialog();
    }
  };

  return (
    <SpinnerOverlay onClick={handleOverlayClick}>
      <SpinnerStyled>
        <DotsContainer>
          {delays.map((delay) => (
            <Dot key={delay} $delay={delay} />
          ))}
        </DotsContainer>
      </SpinnerStyled>

      <WithAnimation
        isVisible={isConfirmDialogVisible}
        options={ANIMATION_DIALOG_FAST}
        render={(style) => (
          <ConfirmDialog
            title="Cancel Operation"
            message="Do you want to cancel the operation?"
            onConfirm={onCancelOperation}
            onClose={closeConfirmDialog}
            animationStyle={style}
          />
        )}
      />
    </SpinnerOverlay>
  );
};

export default Spinner;
