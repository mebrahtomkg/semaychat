import { useState } from 'react';

const useCurrentDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(Date.now());

  return currentDateTime;
};

export default useCurrentDateTime;
