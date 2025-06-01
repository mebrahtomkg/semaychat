import { createContext } from 'react';
import useChat from './hooks/useChat';

const ChatContext = createContext<ReturnType<typeof useChat> | null>(null);

export default ChatContext;
