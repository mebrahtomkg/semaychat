import { useCallback, useRef, useState } from 'react';
import { fileListToArray } from '../utils';

const useFilesSelector = (onFilesSelect?: (files: File[]) => void) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileSelection = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.click();
  }, []);

  const handleFileChange = useCallback(() => {
    const fileInput = fileInputRef.current;
    if (!fileInput) return;
    const files = fileInput.files;
    if (!files) return;
    const filesArray = fileListToArray(files);
    setSelectedFiles(filesArray);
    if (onFilesSelect) onFilesSelect(filesArray);
    fileInput.value = '';
  }, [onFilesSelect]);

  return {
    fileInputRef,
    handleFileChange,
    triggerFileSelection,
    selectedFiles,
  };
};

export default useFilesSelector;
