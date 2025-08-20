import { type CSSProperties, type FC, useState } from 'react';
import Spinner from '../../../../Spinner';
import { useAppSelector } from '../../../../hooks';
import useAccountUpdater from '../../hooks/useAccountUpdater';
import EditorModal from '../EditorModal';
import TextInput from '../TextInput';
import { checkFirstName, checkLastName } from './utils';

interface NameEditorProps {
  animationStyle: CSSProperties;
  onClose: () => void;
}

const NameEditor: FC<NameEditorProps> = ({ onClose, animationStyle }) => {
  const account = useAppSelector((state) => state.account);
  if (!account) throw new Error('Invalid user account!');

  const [state, setState] = useState({
    firstName: account.firstName,
    firstNameError: '',
    lastName: account.lastName || '',
    lastNameError: '',
    activeField: 'firstName',
  });

  const updateInputValue = (event) => {
    const { value, name } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      firstNameError: '',
      lastNameError: '',
      activeField: name,
    }));
  };

  const { updateAccount, isUpdating } = useAccountUpdater();

  const updateName = async () => {
    const firstName = state.firstName.trim();
    const lastName = state.lastName.trim();
    const firstNameError = checkFirstName(firstName);
    const lastNameError = checkLastName(lastName);
    if (firstNameError || lastNameError) {
      const activeField = firstNameError ? 'firstName' : 'lastName';
      setState((prevState) => ({
        ...prevState,
        firstNameError,
        lastNameError,
        activeField,
      }));
    } else {
      if (firstName === account.firstName && lastName === account.lastName) {
        onClose();
      } else {
        const { success, message } = await updateAccount({
          firstName,
          lastName,
        });

        if (success) {
          onClose();
        } else {
          setState((prevState) => ({
            ...prevState,
            firstNameError: message || '',
            lastNameError: '',
          }));
        }
      }
    }
  };

  const handleEnterPress = (event) => {
    if (event.target.name === 'firstName') {
      const firstNameError = checkFirstName(state.firstName.trim());
      if (firstNameError) {
        setState((prevState) => ({ ...prevState, firstNameError }));
      } else {
        setState((prevState) => ({ ...prevState, activeField: 'lastName' }));
      }
    } else {
      updateName();
    }
  };

  return (
    <EditorModal
      title={'Edit name'}
      animationStyle={animationStyle}
      onClose={onClose}
      onDone={updateName}
    >
      <TextInput
        name={'firstName'}
        placeholder={'First name (required)'}
        value={state.firstName}
        shouldFocus={state.activeField === 'firstName'}
        onChange={updateInputValue}
        onEnterPress={handleEnterPress}
        errorMessage={state.firstNameError}
      />
      <TextInput
        name={'lastName'}
        placeholder={'Last name (optional)'}
        value={state.lastName}
        shouldFocus={state.activeField === 'lastName'}
        onChange={updateInputValue}
        onEnterPress={handleEnterPress}
        errorMessage={state.lastNameError}
      />
      {isUpdating && <Spinner />}
    </EditorModal>
  );
};

export default NameEditor;
