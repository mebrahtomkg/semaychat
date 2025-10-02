import type { CSSProperties, FC } from 'react';
import EditorModal from '../EditorModal';
import TextInput from '../TextInput';
import usePasswordUpdate, { PASSWORD_UPDATE_STEPS } from './usePasswordUpdate';
import { Spinner } from '@/components';

interface PasswordEditorProps {
  onClose: () => void;
  animationStyle?: CSSProperties;
}

const PasswordEditor: FC<PasswordEditorProps> = ({
  animationStyle,
  onClose,
}) => {
  const {
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

    isLoading,
  } = usePasswordUpdate(onClose);

  return (
    <EditorModal
      title="Change Password"
      animationStyle={animationStyle}
      onClose={handleBackNav}
      onDone={handleNextNav}
      leftButtonConfig={{
        label:
          currentStep === PASSWORD_UPDATE_STEPS.NEW_PASSWORD
            ? 'Cancel'
            : 'Previous',
      }}
      rightButtonConfig={{
        label:
          currentStep === PASSWORD_UPDATE_STEPS.CURRENT_PASSWORD
            ? 'Done'
            : 'Next',
      }}
    >
      {currentStep === PASSWORD_UPDATE_STEPS.NEW_PASSWORD && (
        <TextInput
          label="New password"
          type="password"
          name="newPassword"
          placeholder="Password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          onEnterPress={handleNextNav}
          helperText="Choose a strong password."
          errorMessage={newPasswordError}
        />
      )}
      {currentStep === PASSWORD_UPDATE_STEPS.CONFIRM_PASSWORD && (
        <TextInput
          label="Confirm password"
          type="password"
          name="confirmPassword"
          placeholder="Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          onEnterPress={handleNextNav}
          helperText="Confirm your new password."
          errorMessage={confirmPasswordError}
        />
      )}
      {currentStep === PASSWORD_UPDATE_STEPS.CURRENT_PASSWORD && (
        <TextInput
          label="Current password"
          type="password"
          name="currentPassword"
          placeholder="Password"
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
          onEnterPress={handleNextNav}
          helperText="Your current password helps us verify your identity."
          errorMessage={currentPasswordError}
        />
      )}
      {isLoading && <Spinner />}
    </EditorModal>
  );
};

export default PasswordEditor;
