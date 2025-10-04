import { FC, MouseEventHandler, useCallback } from 'react';
import {
  CancelButton,
  ConfirmButton,
  ConfirmDialogOverlay,
  ConfirmDialogStyled,
  DialogButtonsContainer,
  DialogMessage,
  DialogTitle,
} from './styles';

interface ConfirmDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  onCancel?: () => void;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  title,
  message,
  onConfirm,
  onClose,
  onCancel,
}) => {
  const handleConfirm = useCallback(() => {
    onClose();
    onConfirm();
  }, [onClose, onConfirm]);

  const handleCancel = useCallback(() => {
    onClose();
    if (onCancel) onCancel();
  }, [onClose, onCancel]);

  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.stopPropagation();
      if (e.target === e.currentTarget) handleCancel();
    },
    [handleCancel],
  );

  return (
    <ConfirmDialogOverlay
      onClick={handleOverlayClick}
      onContextMenu={(e) => e.stopPropagation()}
    >
      <ConfirmDialogStyled>
        <DialogTitle>{title}</DialogTitle>

        <DialogMessage>{message}</DialogMessage>

        <DialogButtonsContainer>
          <CancelButton type="button" onClick={handleCancel}>
            Cancel
          </CancelButton>

          <ConfirmButton type="button" onClick={handleConfirm}>
            Yes
          </ConfirmButton>
        </DialogButtonsContainer>
      </ConfirmDialogStyled>
    </ConfirmDialogOverlay>
  );
};

export default ConfirmDialog;
