import { useCallback, useContext, useRef, useState } from 'react';
import { PersistedMessage } from '../types';
import { MRSContext } from '../MRS';
import { useAppSelector } from '@/hooks';

type EditorState =
  | { mode: 'edit'; message: PersistedMessage }
  | { mode: 'reply'; message: PersistedMessage }
  | { mode: 'new' };

const useChat = (chatPartnerId: number) => {
  const selfId = useAppSelector((state) => state.account?.id);

  const editingTextRef = useRef<string>('');

  const [editorState, setEditorState] = useState<EditorState>({ mode: 'new' });

  const editMessage = useCallback( 
    (message: PersistedMessage) => {
      const canBeEdited =
        message?.id && message.content && message.senderId === selfId;
      if (canBeEdited) {
        editingTextRef.current = message.content;
        setEditorState({ mode: 'edit', message });
      }
    },
    [selfId]
  );

  const replyMessage = useCallback((message: PersistedMessage) => {
    if (message?.id) setEditorState({ mode: 'reply', message });
  }, []);

  const MRS = useContext(MRSContext);
  if (!MRS) throw Error('Invalid MRSContext');
  const { updateMessage, sendTextMessage } = MRS;

  const onSend = useCallback(
    (value: string) => {
      if (editorState.mode === 'edit') {
        updateMessage(editorState.message.id, value.trim());
      } else {
        sendTextMessage(chatPartnerId, value.trim());
      }
      setEditorState({ mode: 'new' });
    },
    [editorState, updateMessage, sendTextMessage, chatPartnerId]
  );

  return {
    editingTextRef,
    onSend,
    chatPartnerId,

    replyMessage,
    editMessage
  };
};

export default useChat;
