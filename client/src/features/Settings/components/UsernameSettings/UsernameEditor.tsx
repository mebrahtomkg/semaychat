import {
  type CSSProperties,
  type FC,
  useState,
  FormEventHandler,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import { Spinner } from '@/components';
import { checkUsername } from './utils';
import { useAccount, useUpdateAccount } from '@/hooks';
import EditorModal from '../EditorModal';
import TextInput, {
  TextInputImperativeHandle,
} from '@/components/TextInputLegacy';

interface UsernameEditorProps {
  onClose: () => void;
  animationStyle?: CSSProperties;
}

const UsernameEditor: FC<UsernameEditorProps> = ({
  onClose,
  animationStyle,
}) => {
  const { username: initialUsername } = useAccount();
  const [username, setUsername] = useState(initialUsername || '');
  const [usernameError, setUsernameError] = useState<string>('');
  const textInputRef = useRef<TextInputImperativeHandle | null>(null);

  const { updateAccount, isPending, isSuccess, isError, error, abort } =
    useUpdateAccount();

  const updateUsername = () => {
    const trimmedUsername = username.trim();
    if (trimmedUsername === initialUsername) {
      onClose();
      return;
    }

    const err = checkUsername(trimmedUsername);
    if (err) {
      setUsernameError(err);
      textInputRef.current?.animateInfo();
      return;
    }

    updateAccount({ username: trimmedUsername });
  };

  const handleUsernameChange = useCallback<FormEventHandler<HTMLInputElement>>(
    (e) => {
      setUsername(e.currentTarget.value);
      setUsernameError('');
    },
    [],
  );

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess, onClose]);

  useEffect(() => {
    if (isError) setUsernameError(error.message);
  }, [isError, error?.message]);

  const cancelOperation = () => {
    abort();
    onClose();
  };

  return (
    <EditorModal
      title="Edit Username"
      animationStyle={animationStyle}
      onDone={updateUsername}
      onClose={onClose}
    >
      <TextInput
        id="id-username-text-input"
        label="Username"
        type="text"
        name={'username'}
        value={username}
        ref={textInputRef}
        onChange={handleUsernameChange}
        onEnter={updateUsername}
        helperText={'Others can find and message you using this username.'}
        errorMessage={usernameError}
      />

      {isPending && <Spinner onCancelOperation={cancelOperation} />}
    </EditorModal>
  );
};

export default UsernameEditor;
