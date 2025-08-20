import { FC, useState } from 'react';
import {
  CancelButton,
  ConfirmButton,
  ConfirmDialogOverlay,
  ConfirmDialogStyled,
  DialogButtonsContainer,
  DialogMessage,
  DialogTitle,
} from './styles';
import CheckBox from './Checkbox';

interface MessageDeleteConfirmDialogProps {
  isOutgoing: boolean;
  onDelete: (deleteForReceiver: boolean) => void;
  onClose: () => void;
}

const MessageDeleteConfirmDialog: FC<MessageDeleteConfirmDialogProps> = ({
  isOutgoing,
  onDelete,
  onClose,
}) => {
  const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false);
  const toggleCheckBox = () => setIsCheckBoxChecked((prevValue) => !prevValue);

  const handleDelete = () => {
    onClose();
    onDelete(isCheckBoxChecked);
  };

  return (
    <ConfirmDialogOverlay
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.stopPropagation()}
    >
      <ConfirmDialogStyled>
        <DialogTitle>Delete message</DialogTitle>
        <DialogMessage>
          Are you sure you want to delete this message?
        </DialogMessage>
        {isOutgoing && (
          <CheckBox
            label={'Also delete for receiver'}
            isChecked={isCheckBoxChecked}
            onToggle={toggleCheckBox}
          />
        )}
        <DialogButtonsContainer>
          <CancelButton type="button" onClick={onClose}>
            Cancel
          </CancelButton>
          <ConfirmButton type="button" onClick={handleDelete}>
            Yes
          </ConfirmButton>
        </DialogButtonsContainer>
      </ConfirmDialogStyled>
    </ConfirmDialogOverlay>
  );
};

export default MessageDeleteConfirmDialog;
