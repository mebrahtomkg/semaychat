import { Message } from '@/types';
import { create } from 'zustand';

interface MessageInputStateBase {
  mode: 'edit' | 'reply' | 'new';
}

interface MessageInputStateNewMode extends MessageInputStateBase {
  mode: 'new';
}

interface MessageInputStateEditMode extends MessageInputStateBase {
  mode: 'edit';
  message: Message;
}

interface MessageInputStateReplyMode extends MessageInputStateBase {
  mode: 'reply';
  message: Message;
}

type MessageInputState =
  | MessageInputStateNewMode
  | MessageInputStateEditMode
  | MessageInputStateReplyMode;

const useMessageInputStateStore = create<MessageInputState>(() => ({
  mode: 'new',
}));

export default useMessageInputStateStore;

export const setMessageInputState = (state: MessageInputState) => {
  useMessageInputStateStore.setState(() => state, true);
};

export const resetMessageInputState = () => {
  setMessageInputState({ mode: 'new' });
};
