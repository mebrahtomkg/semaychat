import {
  type CSSProperties,
  type FC,
  useState,
  InputEventHandler,
} from 'react';
import { useAccount } from '@/hooks';
import useAccountUpdater from '../../hooks/useAccountUpdater';
import TextInput from '../TextInputPro';
import { checkFirstName, checkLastName } from './utils';
import { HeaderSection, MainSection, NameEditorStyled, Title } from './styles';
import { BackButton } from '@/components/buttons';

interface NameEditorProps {
  onClose: () => void;
  animationStyle?: CSSProperties;
}

const NameEditor: FC<NameEditorProps> = ({ onClose, animationStyle }) => {
  const account = useAccount();

  const [state, setState] = useState({
    firstName: account.firstName,
    firstNameError: '',
    lastName: account.lastName || '',
    lastNameError: '',
    activeField: 'firstName',
  });

  const updateInputValue: InputEventHandler<HTMLInputElement> = (event) => {
    const { value, name } = event.currentTarget;
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

  const handleEnterPress: InputEventHandler<HTMLInputElement> = (event) => {
    if (event.currentTarget.name === 'firstName') {
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
    <NameEditorStyled>
      <HeaderSection>
        <BackButton onClick={onClose} />
        <Title>Edit name</Title>
      </HeaderSection>

      <MainSection>
        <TextInput
          name={'firstName'}
          value={state.firstName}
          shouldFocus={state.activeField === 'firstName'}
          onChange={updateInputValue}
          onEnterPress={handleEnterPress}
          errorMessage={state.firstNameError}
          label="First name (required)"
        />
        <TextInput
          name={'lastName'}
          value={state.lastName}
          shouldFocus={state.activeField === 'lastName'}
          onChange={updateInputValue}
          onEnterPress={handleEnterPress}
          label="Last name (optional)"
          errorMessage={state.lastNameError}
        />
      </MainSection>
    </NameEditorStyled>
  );
};

export default NameEditor;
