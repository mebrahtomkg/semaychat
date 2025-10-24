import {
  FC,
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import useFilesSelector from '../../hooks/useFilesSelector';
import FileSelector from '../FileSelector';
import SendButton from '../SendButton';
import {
  ActionButtonsContainer,
  GrowingTextArea,
  MessageInputStyled,
} from './styles';
import AttachFileButton from '../AttachFileButton';
import useMessageInputStateStore, {
  resetMessageInputState,
} from '@/store/useMessageInputStateStore';
import { useStableValue } from '@/hooks';
import { useMessageRequestsStore } from '@/store';

interface MessageInputProps {
  chatPartnerId: number;
}

const MessageInput: FC<MessageInputProps> = ({ chatPartnerId }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('');
  const messageInputState = useStableValue(useMessageInputStateStore());

  // biome-ignore lint/correctness/useExhaustiveDependencies: <adjust text area height>
  useEffect(() => {
    const textArea = textAreaRef.current;
    if (!textArea) return;
    textArea.style.height = 'auto';
    if (textArea.scrollHeight > textArea.clientHeight) {
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  }, [value]);

  useEffect(() => {
    if (messageInputState.mode === 'edit') {
      const { message } = messageInputState;
      if (!message.content) throw new Error('Message has not content to edit!');
      setValue(message.content);
    } else {
      setValue('');
    }
    textAreaRef.current?.focus();
  }, [messageInputState]);

  const handleInput: FormEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => setValue(e.currentTarget.value),
    [],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <reset message input state>
  useEffect(() => {
    setValue('');
    resetMessageInputState();
  }, [chatPartnerId]);

  const addTextMessageSendRequest = useMessageRequestsStore(
    (state) => state.addTextMessageSendRequest,
  );

  const addMessageUpdateRequest = useMessageRequestsStore(
    (state) => state.addMessageUpdateRequest,
  );

  const onSend = useCallback(
    (value: string) => {
      if (messageInputState.mode === 'edit') {
        const { message } = messageInputState;
        addMessageUpdateRequest({
          messageId: message.id,
          newContent: value.trim(),
        });
      } else {
        addTextMessageSendRequest({
          receiverId: chatPartnerId,
          content: value.trim(),
        });
      }
      resetMessageInputState();
    },
    [
      messageInputState,
      addMessageUpdateRequest,
      addTextMessageSendRequest,
      chatPartnerId,
    ],
  );

  const handleSend = useCallback(() => {
    const savedValue = value;
    setValue('');
    onSend(savedValue);
  }, [onSend, value]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const [isFileSelectorVisible, setIsFileSelectorVisible] = useState(false);
  const openFileSelector = () => setIsFileSelectorVisible(true);
  const closeFileSelector = () => setIsFileSelectorVisible(false);

  const {
    fileInputRef,
    handleFileChange,
    triggerFileSelection,
    selectedFiles,
  } = useFilesSelector(openFileSelector);

  const handleMessageInputClick: MouseEventHandler = useCallback((e) => {
    if (textAreaRef.current && e.target === e.currentTarget) {
      textAreaRef.current.focus();
    }
  }, []);

  return (
    <MessageInputStyled onClick={handleMessageInputClick}>
      <GrowingTextArea
        rows={1}
        placeholder="Message"
        onKeyDown={handleKeyDown}
        value={value}
        onInput={handleInput}
        ref={textAreaRef}
      />

      <ActionButtonsContainer>
        <AttachFileButton onClick={triggerFileSelection} />
        <SendButton isDisabled={!value?.trim()} onClick={handleSend} />
      </ActionButtonsContainer>

      <input
        type="file"
        multiple
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {isFileSelectorVisible && (
        <FileSelector
          files={selectedFiles}
          chatPartnerId={chatPartnerId}
          onClose={closeFileSelector}
        />
      )}
    </MessageInputStyled>
  );
};

export default MessageInput;
