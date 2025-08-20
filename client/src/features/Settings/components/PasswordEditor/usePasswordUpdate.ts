import { useState } from 'react';
import {
  checkConfirmPassword,
  checkCurrentPassword,
  checkNewPassword,
} from './utils';
import useAccountUpdater from '../../hooks/useAccountUpdater';

export const PASSWORD_UPDATE_STEPS = {
  NEW_PASSWORD: 'new_password',
  CONFIRM_PASSWORD: 'confirm_password',
  CURRENT_PASSWORD: 'current_password',
};

const usePasswordUpdate = (onClose) => {
  const [currentStep, setCurrentStep] = useState(
    PASSWORD_UPDATE_STEPS.NEW_PASSWORD,
  );

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');

  const handleBackNav = () => {
    switch (currentStep) {
      case PASSWORD_UPDATE_STEPS.NEW_PASSWORD:
        onClose();
        break;

      case PASSWORD_UPDATE_STEPS.CONFIRM_PASSWORD:
        setCurrentStep(PASSWORD_UPDATE_STEPS.NEW_PASSWORD);
        break;

      case PASSWORD_UPDATE_STEPS.CURRENT_PASSWORD:
        setCurrentStep(PASSWORD_UPDATE_STEPS.CONFIRM_PASSWORD);
        break;
    }
  };

  const { updateAccount, isUpdating } = useAccountUpdater();

  const updatePassword = async () => {
    const { success, message } = await updateAccount({
      newPassword: newPassword.trim(),
      password: currentPassword.trim(),
    });
    if (success) {
      onClose();
    } else {
      setCurrentPasswordError(message || '');
    }
  };

  const validateNewPassword = () => {
    return checkNewPassword(newPassword.trim());
  };

  const validateConfirmPassword = () => {
    const trimmedConfirmPassword = confirmPassword.trim();
    const error = checkConfirmPassword(trimmedConfirmPassword);
    if (error) {
      return error;
    }
    if (trimmedConfirmPassword !== newPassword.trim()) {
      return 'Passwords do not match';
    }
    return '';
  };

  const validateCurrentPassword = () => {
    return checkCurrentPassword(currentPassword.trim());
  };

  const handleNextNav = () => {
    switch (currentStep) {
      case PASSWORD_UPDATE_STEPS.NEW_PASSWORD: {
        const error = validateNewPassword();
        if (error) {
          setNewPasswordError(error);
        } else {
          setCurrentStep(PASSWORD_UPDATE_STEPS.CONFIRM_PASSWORD);
        }
        break;
      }

      case PASSWORD_UPDATE_STEPS.CONFIRM_PASSWORD: {
        const error = validateConfirmPassword();
        if (error) {
          setConfirmPasswordError(error);
        } else {
          setCurrentStep(PASSWORD_UPDATE_STEPS.CURRENT_PASSWORD);
        }
        break;
      }

      case PASSWORD_UPDATE_STEPS.CURRENT_PASSWORD: {
        const error = validateCurrentPassword();
        if (error) {
          setCurrentPasswordError(error);
        } else {
          updatePassword();
        }
        break;
      }
    }
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    setNewPasswordError('');
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError('');
  };

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
    setCurrentPasswordError('');
  };

  return {
    currentStep,

    newPassword,
    confirmPassword,
    currentPassword,

    newPasswordError,
    confirmPasswordError,
    currentPasswordError,

    handleNewPasswordChange,
    handleConfirmPasswordChange,
    handleCurrentPasswordChange,

    handleBackNav,
    handleNextNav,

    isLoading: isUpdating,
  };
};

export default usePasswordUpdate;
