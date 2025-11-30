import { useState } from 'react';

const useCurrentDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(Date.now());

  //TODO: Update current date time via the heartbeat processor. server return timestamp

  return currentDateTime;
};

export default useCurrentDateTime;
