import { useCallback, useRef, useState } from 'react';
import { useAccount } from '@/hooks';
import { Message } from '@/types';
import { useMessageRequestsStore } from '@/store';

type EditorState =
  | { mode: 'edit'; message: Message }
  | { mode: 'reply'; message: Message }
  | { mode: 'new' };

const useChat = (chatPartnerId: number) => {
  const { id: selfId } = useAccount();

  const addTextMessageSendRequest = useMessageRequestsStore(
    (state) => state.addTextMessageSendRequest,
  );

  const addMessageUpdateRequest = useMessageRequestsStore(
    (state) => state.addMessageUpdateRequest,
  );

  const editingTextRef = useRef<string>('');

  const [editorState, setEditorState] = useState<EditorState>({ mode: 'new' });

  const editMessage = useCallback(
    (message: Message) => {
      if (message.content && message.senderId === selfId) {
        editingTextRef.current = message.content;
        setEditorState({ mode: 'edit', message });
      }
    },
    [selfId],
  );

  const replyMessage = useCallback((message: Message) => {
    if (message?.id) setEditorState({ mode: 'reply', message });
  }, []);

  const onSend = useCallback(
    (value: string) => {
      if (editorState.mode === 'edit') {
        addMessageUpdateRequest({
          messageId: editorState.message.id,
          newContent: value.trim(),
        });
      } else {
        addTextMessageSendRequest({
          receiverId: chatPartnerId,
          content: value.trim(),
        });
      }
      setEditorState({ mode: 'new' });
    },
    [
      editorState,
      addMessageUpdateRequest,
      addTextMessageSendRequest,
      chatPartnerId,
    ],
  );

  return {
    editingTextRef,
    onSend,
    chatPartnerId,

    replyMessage,
    editMessage,
  };
};

export default useChat;
