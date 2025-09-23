import { useCallback, useRef, useState } from 'react';

const useFileSelector = (onFileSelect: () => void) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const triggerFileSelection = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.click();
  }, []);

  const handleFileChange = useCallback(() => {
    if (!fileInputRef.current) return;
    const file = fileInputRef.current.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    onFileSelect();
    fileInputRef.current.value = '';
  }, [onFileSelect]);

  return {
    fileInputRef,
    handleFileChange,
    triggerFileSelection,
    selectedFile,
  };
};

export default useFileSelector;
