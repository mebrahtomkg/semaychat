import { useCallback } from 'react';

const useDownload = () => {
  const download = useCallback((url: string, name = '', extension = '') => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${name || url}.${extension}`);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return download;
};

export default useDownload;
