import { type CSSProperties, type FC, useState, FormEventHandler } from 'react';
import { Spinner } from '@/components';
import { checkUsername } from './utils';
import { useAccount } from '@/hooks';
import TextInput from '../TextInput';
import useAccountUpdater from '../../hooks/useAccountUpdater';
import EditorModal from '../EditorModal';

interface UsernameEditorProps {
  onClose: () => void;
  animationStyle?: CSSProperties;
}

const UsernameEditor: FC<UsernameEditorProps> = ({
  onClose,
  animationStyle,
}) => {
  const account = useAccount();

  const [value, setValue] = useState(account.username);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const { updateAccount, isUpdating } = useAccountUpdater();

  const updateUsername = async () => {
    const newUsername = value.trim();
    if (newUsername === account.username) return onClose();

    const inputError = checkUsername(newUsername);
    if (inputError) return setErrorMessage(inputError);

    const { success, message } = await updateAccount({
      username: newUsername,
    });

    if (success) {
      onClose();
    } else {
      setErrorMessage(message || '');
    }
  };

  const updateInputValue: FormEventHandler<HTMLInputElement> = (event) => {
    setValue(event.currentTarget.value);
    setErrorMessage(undefined);
  };

  return (
    <EditorModal
      title={'Edit Username'}
      animationStyle={animationStyle}
      onDone={updateUsername}
      onClose={onClose}
    >
      <TextInput
        name={'username'}
        placeholder={'Username'}
        value={value}
        onChange={updateInputValue}
        onEnterPress={updateUsername}
        helperText={'Others can find and message you using this usernamexsdd.'}
        errorMessage={errorMessage}
      />
      {isUpdating && <Spinner />}
    </EditorModal>
  );
};

export default UsernameEditor;
