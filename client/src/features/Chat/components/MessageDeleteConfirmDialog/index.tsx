import { CSSProperties, FC, useState } from 'react';
import ConfirmDialog from '@/components/ConfirmDialog';
import CheckBox from '@/components/Checkbox';

interface MessageDeleteConfirmDialogProps {
  isOutgoing: boolean;
  onDelete: (deleteForReceiver: boolean) => void;
  onClose: () => void;
  animationStyle?: CSSProperties;
}

const MessageDeleteConfirmDialog: FC<MessageDeleteConfirmDialogProps> = ({
  isOutgoing,
  onDelete,
  onClose,
  animationStyle,
}) => {
  const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false);
  const toggleCheckBox = () => setIsCheckBoxChecked((prevValue) => !prevValue);

  const handleDelete = () => {
    onClose();
    onDelete(isCheckBoxChecked);
  };

  return (
    <ConfirmDialog
      title="Delete message"
      message="Are you sure you want to delete this message?"
      onConfirm={handleDelete}
      onClose={onClose}
      animationStyle={animationStyle}
    >
      {isOutgoing && (
        <CheckBox
          label="Also delete for receiver"
          isChecked={isCheckBoxChecked}
          onToggle={toggleCheckBox}
        />
      )}
    </ConfirmDialog>
  );
};

export default MessageDeleteConfirmDialog;
