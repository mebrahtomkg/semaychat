import { Message } from '@/types';
import { useCallback, useState } from 'react';
import { useMessageActions } from '../../hooks';

const useDeleteMessage = (message: Message) => {
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [isDeleteForReceiver, setIsDeleteForReceiver] = useState(false);
  const { deleteMessage } = useMessageActions(message);

  const openDeleteConfirm = useCallback(() => {
    // Reset the 'also delete for receiver' option when opening message delete confirm dialog
    setIsDeleteForReceiver(false);
    setIsDeleteConfirmVisible(true);
  }, []);

  const closeDeleteConfirm = useCallback(
    () => setIsDeleteConfirmVisible(false),
    [],
  );

  const toggleIsDeleteForReceiver = useCallback(
    () => setIsDeleteForReceiver((prevValue) => !prevValue),
    [],
  );

  const handleMessageDelete = useCallback(() => {
    closeDeleteConfirm();
    deleteMessage(isDeleteForReceiver);
  }, [closeDeleteConfirm, deleteMessage, isDeleteForReceiver]);

  return {
    openDeleteConfirm,
    isDeleteConfirmVisible,
    isDeleteForReceiver,
    toggleIsDeleteForReceiver,
    handleMessageDelete,
    closeDeleteConfirm,
  };
};

export default useDeleteMessage;
