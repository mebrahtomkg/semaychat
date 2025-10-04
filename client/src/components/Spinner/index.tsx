import { FC, MouseEventHandler, RefCallback } from 'react';
import { SpinnerCanvas, SpinnerModal, SpinnerStyled } from './styles';
import ConfirmDialog, { useConfirmDialog } from '../ConfirmDialog';

export { default as useSpinner } from './useSpinner';

interface SpinnerProps {
  onCancelOperation?: () => void;
}

const Spinner: FC<SpinnerProps> = ({ onCancelOperation }) => {
  const handleCanvasMount: RefCallback<HTMLCanvasElement> = (element) => {
    if (!element) return;

    const ctx = element.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, 120, 120);
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#6c868f';
    ctx.beginPath();
    ctx.arc(60, 60, 35, 0, 1.7 * Math.PI);
    ctx.stroke();
  };

  const { isConfirmDialogVisible, openConfirmDialog, closeConfirmDialog } =
    useConfirmDialog();

  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (onCancelOperation && e.target === e.currentTarget) {
      openConfirmDialog();
    }
  };

  return (
    <SpinnerModal onClick={handleOverlayClick}>
      <SpinnerStyled>
        <SpinnerCanvas ref={handleCanvasMount} width="120" height="120" />
      </SpinnerStyled>

      {onCancelOperation && isConfirmDialogVisible && (
        <ConfirmDialog
          title="Cancel Operation"
          message="Do you want to cancel the operation?"
          onConfirm={onCancelOperation}
          onClose={closeConfirmDialog}
        />
      )}
    </SpinnerModal>
  );
};

export default Spinner;
