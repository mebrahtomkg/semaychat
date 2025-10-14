import {
  InputEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FC,
} from 'react';
import EditorModal from '../EditorModal';
import { Spinner } from '@/components';
import TextInput, { TextInputImperativeHandle } from '@/components/TextInput';
import { useUpdateAccount } from '@/hooks';
import {
  checkConfirmPassword,
  checkCurrentPassword,
  checkNewPassword,
} from './utils';

interface PasswordEditorProps {
  onClose: () => void;
  animationStyle?: CSSProperties;
}

const PasswordEditor: FC<PasswordEditorProps> = ({
  animationStyle,
  onClose,
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');

  const newPwdInputRef = useRef<TextInputImperativeHandle | null>(null);
  const confirmPwdInputRef = useRef<TextInputImperativeHandle | null>(null);
  const currentPwdInputRef = useRef<TextInputImperativeHandle | null>(null);

  const { updateAccount, isPending, isSuccess, isError, error } =
    useUpdateAccount();

  const handleNewPasswordChange: InputEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setNewPassword(e.currentTarget.value);
      setNewPasswordError('');
    }, []);

  const handleConfirmPasswordChange: InputEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setConfirmPassword(e.currentTarget.value);
      setConfirmPasswordError('');
    }, []);

  const handleCurrentPasswordChange: InputEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setCurrentPassword(e.currentTarget.value);
      setCurrentPasswordError('');
    }, []);

  const validateNewPassword = useCallback(
    () => checkNewPassword(newPassword.trim()),
    [newPassword],
  );

  const validateConfirmPassword = useCallback(() => {
    const trimmedConfirmPassword = confirmPassword.trim();
    const error = checkConfirmPassword(trimmedConfirmPassword);
    if (error) {
      return error;
    }
    if (trimmedConfirmPassword !== newPassword.trim()) {
      return 'Passwords do not match';
    }
    return '';
  }, [confirmPassword, newPassword]);

  const validateCurrentPassword = useCallback(
    () => checkCurrentPassword(currentPassword.trim()),
    [currentPassword],
  );

  const handleSubmit = useCallback(() => {
    let error = validateNewPassword();
    if (error) {
      setNewPasswordError(error);
      newPwdInputRef.current?.focusInput();
      newPwdInputRef.current?.animateInfo();
      return;
    }

    error = validateConfirmPassword();
    if (error) {
      setConfirmPasswordError(error);
      confirmPwdInputRef.current?.focusInput();
      confirmPwdInputRef.current?.animateInfo();
      return;
    }

    error = validateCurrentPassword();
    if (error) {
      setCurrentPasswordError(error);
      currentPwdInputRef.current?.focusInput();
      currentPwdInputRef.current?.animateInfo();
      return;
    }

    updateAccount({
      newPassword: newPassword.trim(),
      password: currentPassword.trim(),
    });
  }, [
    validateNewPassword,
    validateConfirmPassword,
    validateCurrentPassword,
    updateAccount,
    newPassword,
    currentPassword,
  ]);

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess, onClose]);

  useEffect(() => {
    if (isError) setCurrentPasswordError(error.message);
  }, [isError, error?.message]);

  return (
    <EditorModal
      title="Change Password"
      animationStyle={animationStyle}
      onClose={onClose}
      onDone={handleSubmit}
    >
      <TextInput
        id="id-new-pwd-text-input"
        label="New password"
        type="password"
        name="newPassword"
        value={newPassword}
        ref={newPwdInputRef}
        onChange={handleNewPasswordChange}
        onEnter={handleSubmit}
        helperText="Choose a strong password."
        errorMessage={newPasswordError}
      />

      <TextInput
        id="id-new-confirm-pwd-text-input"
        label="Confirm password"
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        ref={confirmPwdInputRef}
        onChange={handleConfirmPasswordChange}
        onEnter={handleSubmit}
        helperText="Confirm your new password."
        errorMessage={confirmPasswordError}
      />

      <TextInput
        id="id-new-current-pwd-text-input"
        label="Current password"
        type="password"
        name="currentPassword"
        value={currentPassword}
        ref={currentPwdInputRef}
        onChange={handleCurrentPasswordChange}
        onEnter={handleSubmit}
        helperText="Your current password helps us verify your identity."
        errorMessage={currentPasswordError}
      />

      {isPending && <Spinner />}
    </EditorModal>
  );
};

export default PasswordEditor;
