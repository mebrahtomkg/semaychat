import { useContext } from 'react';
import ChatContext from '../ChatContext';

const useChatContext = () => {
  const chatContext = useContext(ChatContext);

  if (!chatContext) throw new Error('Invalid chat context!');

  return chatContext;
};

export default useChatContext;
