import { FC, useCallback, useEffect, useRef, useState } from 'react';
import useFilesSelector from '../../hooks/useFilesSelector';
import FileSelector from '../FileSelector';
import SendButton from '../SendButton';
import AttachFileButton from './AttachFileButton';
import {
  ActionButtonsContainer,
  GrowingTextArea,
  MessageInputStyled
} from './styles';
import { useChatContext } from '../../hooks';

const MessageInput: FC = () => {
  // Uplifting state variable of this component to useChat made the message input
  // unresponsive. especially for chat that has a lot of messages. since a single
  // character input rerended the whole message components.
  const { chatPartnerId, editingTextRef, onSend } = useChatContext();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (!textArea) return;
    textArea.style.height = 'auto';
    if (textArea.scrollHeight > textArea.clientHeight) {
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  });

  const focusTextArea = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (textAreaRef.current && e.target === e.currentTarget) {
      textAreaRef.current.focus();
    }
  }, []);

  const [value, setValue] = useState<string>('');

  const handleInput = useCallback(
    (e: React.FormEvent<HTMLTextAreaElement>) =>
      setValue(e.currentTarget.value),
    []
  );

  useEffect(() => {
    if (editingTextRef.current) {
      const editingText = editingTextRef.current;
      editingTextRef.current = '';
      setValue(editingText);
      textAreaRef.current?.focus();
    }
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <>
  useEffect(() => {
    setValue('');
  }, [chatPartnerId]);

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
    [handleSend]
  );

  const [isFileSelectorVisible, setIsFileSelectorVisible] = useState(false);
  const openFileSelector = () => setIsFileSelectorVisible(true);
  const closeFileSelector = () => setIsFileSelectorVisible(false);

  const {
    fileInputRef,
    handleFileChange,
    triggerFileSelection,
    selectedFiles
  } = useFilesSelector(openFileSelector);

  return (
    <MessageInputStyled onClick={focusTextArea}>
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
