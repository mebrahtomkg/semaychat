import {
  CSSProperties,
  FC,
  MouseEventHandler,
  ReactNode,
  useCallback,
} from 'react';
import {
  CancelButton,
  ConfirmButton,
  ConfirmDialogOverlay,
  ConfirmDialogStyled,
  DialogButtonsContainer,
  DialogMessage,
  DialogTitle,
} from './styles';

export { default as useConfirmDialog } from './useConfirmDialog';

interface ConfirmDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  onCancel?: () => void;
  animationStyle?: CSSProperties;
  children?: ReactNode;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  title,
  message,
  onConfirm,
  onClose,
  onCancel,
  children,
  animationStyle,
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
      <ConfirmDialogStyled style={animationStyle}>
        <DialogTitle>{title}</DialogTitle>

        <DialogMessage>{message}</DialogMessage>

        {children}

        <DialogButtonsContainer>
          <CancelButton type="button" onClick={onClose}>
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
