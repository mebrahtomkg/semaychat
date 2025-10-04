import { useCallback, useState } from 'react';

const useConfirmDialog = () => {
  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);

  const openConfirmDialog = useCallback(
    () => setIsConfirmDialogVisible(true),
    [],
  );

  const closeConfirmDialog = useCallback(
    () => setIsConfirmDialogVisible(false),
    [],
  );

  return {
    isConfirmDialogVisible,
    openConfirmDialog,
    closeConfirmDialog,
  };
};

export default useConfirmDialog;
