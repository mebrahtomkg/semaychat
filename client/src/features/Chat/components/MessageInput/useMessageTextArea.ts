import {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const useMessageTextArea = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('');

  // biome-ignore lint/correctness/useExhaustiveDependencies: <adjust text area height>
  useEffect(() => {
    const textArea = textAreaRef.current;
    if (!textArea) return;
    textArea.style.height = 'auto';
    if (textArea.scrollHeight > textArea.clientHeight) {
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  }, [value]);

  const handleInput: FormEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => setValue(e.currentTarget.value),
    [],
  );

  const focusTextArea = useCallback(() => {
    textAreaRef.current?.focus();
  }, []);

  return {
    textAreaRef,
    value,
    setValue,
    handleInput,
    focusTextArea,
  };
};

export default useMessageTextArea;
