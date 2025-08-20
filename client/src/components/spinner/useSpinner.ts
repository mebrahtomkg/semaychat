import { useState } from 'react';

const useSpinner = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showSpinner = () => setIsVisible(true);

  const closeSpinner = () => setIsVisible(false);

  return {
    isSpinnerVisible: isVisible,
    showSpinner,
    closeSpinner,
  };
};

export default useSpinner;
