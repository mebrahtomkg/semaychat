import {
  type CSSProperties,
  type FC,
  useState,
  InputEventHandler,
  useCallback,
  KeyboardEventHandler,
  useRef,
} from 'react';
import { useAccount } from '@/hooks';
import TextInput, { TextInputImperativeHandle } from '../TextInputPro';
import { checkFirstName, checkLastName } from './utils';
import {
  DoneButton,
  HeaderSection,
  MainSection,
  NameEditorStyled,
  Title,
} from './styles';
import { BackButton } from '@/components/buttons';
import { TickIcon } from '@/components/icons';
import { addAccountUpdateRequest } from '@/store/useAccountUpdateRequestStore';

interface NameEditorProps {
  onClose: () => void;
  animationStyle?: CSSProperties;
}

const NameEditor: FC<NameEditorProps> = ({ onClose, animationStyle }) => {
  const { firstName: initialFirstName, lastName: initialLastName } =
    useAccount();

  const firstNameInputRef = useRef<TextInputImperativeHandle | null>(null);
  const lastNameInputRef = useRef<TextInputImperativeHandle | null>(null);

  const [firstName, setFirstName] = useState(initialFirstName || '');
  const [lastName, setLastName] = useState(initialLastName || '');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  const handleFirstNameChange: InputEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setFirstName(e.currentTarget.value);
      setFirstNameError('');
    }, []);

  const handleLastNameChange: InputEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setLastName(e.currentTarget.value);
      setLastNameError('');
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    let error = checkFirstName(trimmedFirstName);
    if (error) {
      setFirstNameError(error);
      firstNameInputRef.current?.focusInput();
      firstNameInputRef.current?.animateInfo();
      return;
    }

    error = checkLastName(trimmedLastName);
    if (error) {
      setLastNameError(error);
      lastNameInputRef.current?.focusInput();
      lastNameInputRef.current?.animateInfo();
      return;
    }

    if (
      trimmedFirstName === initialFirstName &&
      trimmedLastName === initialLastName
    ) {
      onClose();
      return;
    }

    addAccountUpdateRequest({
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
    });

    onClose();
  }, [firstName, initialFirstName, initialLastName, lastName, onClose]);

  const handleEnterPress = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      switch (e.currentTarget.name) {
        case 'firstName': {
          const error = checkFirstName(firstName.trim());
          if (error) {
            setFirstNameError(error);
            firstNameInputRef.current?.animateInfo();
          } else {
            lastNameInputRef.current?.focusInput();
          }
          break;
        }

        case 'lastName': {
          const error = checkLastName(lastName.trim());
          if (error) {
            setLastNameError(error);
            lastNameInputRef.current?.animateInfo();
          } else {
            handleSubmit();
          }
          break;
        }
      }
    },
    [firstName, lastName, handleSubmit],
  );

  return (
    <NameEditorStyled style={animationStyle}>
      <HeaderSection>
        <BackButton onClick={onClose} />

        <Title>Edit name</Title>

        <DoneButton type="button" onClick={handleSubmit}>
          <TickIcon />
        </DoneButton>
      </HeaderSection>

      <MainSection>
        <TextInput
          id="id-first-name-text-input"
          label="First name (required)"
          type="text"
          name="firstName"
          value={firstName}
          ref={firstNameInputRef}
          onChange={handleFirstNameChange}
          onEnter={handleEnterPress}
          errorMessage={firstNameError}
        />

        <TextInput
          id="id-last-name-text-input"
          label="Last name (optional)"
          type="text"
          name="lastName"
          value={lastName}
          ref={lastNameInputRef}
          onChange={handleLastNameChange}
          onEnter={handleEnterPress}
          errorMessage={lastNameError}
        />
      </MainSection>
    </NameEditorStyled>
  );
};

export default NameEditor;
