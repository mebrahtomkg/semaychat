import { createContext } from 'react';
import useMessageRequestSystem from './useMessageRequestSystem';

const MRSContext = createContext<ReturnType<
  typeof useMessageRequestSystem
> | null>(null);

export default MRSContext;
