import { TextInputImperativeHandle } from '@/components/TextInput';
import { InputEventHandler, useCallback, useRef, useState } from 'react';

const useTextInput = () => {
  const inputRef = useRef<TextInputImperativeHandle | null>(null);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange: InputEventHandler<HTMLInputElement> = useCallback((e) => {
    setValue(e.currentTarget.value);
    setError('');
  }, []);

  const focusInput = useCallback(() => {
    inputRef.current?.focusInput();
  }, []);

  const setErrorAndAnimateInfo = useCallback((err: string) => {
    setError(err);
    inputRef.current?.animateInfo();
  }, []);

  return {
    inputRef,
    value,
    error,
    handleChange,
    setError: setErrorAndAnimateInfo,
    focusInput,
  };
};

export default useTextInput;
