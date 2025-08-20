import { type CSSProperties, type FC, useState } from 'react';
import Spinner from '../../../../Spinner';
import { checkUsername } from './utils';
import EditorModal from '../EditorModal';
import { useAppSelector } from '../../../../hooks';
import TextInput from '../TextInput';
import useAccountUpdater from '../../hooks/useAccountUpdater';

interface UsernameEditorProps {
  animationStyle: CSSProperties;
  onClose: () => void;
}

const UsernameEditor: FC<UsernameEditorProps> = ({
  onClose,
  animationStyle,
}) => {
  const account = useAppSelector((state) => state.account);
  if (!account) throw new Error('Invalid account!');

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

  const updateInputValue = (event) => {
    setValue(event.target.value);
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
