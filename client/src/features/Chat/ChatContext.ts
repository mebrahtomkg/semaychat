import { createContext } from 'react';
import { useChat } from './hooks';

const ChatContext = createContext<ReturnType<typeof useChat> | null>(null);

export default ChatContext;
