import { createContext } from 'react';
import type useApp from './useApp';

const AppContext = createContext<ReturnType<typeof useApp> | null>(null);

export default AppContext;
