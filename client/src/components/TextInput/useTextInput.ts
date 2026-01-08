import { useCallback, useRef } from 'react';
import { TextInputImperativeHandle } from './types';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

const useTextInput = <TFieldValues extends FieldValues>(
  inputName: Path<TFieldValues>,
  useFormReturnProps: UseFormReturn<TFieldValues>,
) => {
  const imperativeRef = useRef<TextInputImperativeHandle | null>(null);

  const {
    register,
    formState: { errors },
    getValues,
  } = useFormReturnProps;

  const { ref, onChange, name, onBlur } = register(inputName);

  const focusInput = useCallback(() => {
    imperativeRef.current?.focus();
  }, []);

  const shakeError = useCallback(() => {
    imperativeRef.current?.shakeError();
  }, []);

  const defaultValue = getValues(inputName) || '';

  return {
    props: {
      name,
      defaultValue,
      inputRef: ref,
      imperativeRef,
      onChange,
      onBlur,
      error: errors[inputName]?.message,
    },
    focusInput,
    shakeError,
  };
};

export default useTextInput;
