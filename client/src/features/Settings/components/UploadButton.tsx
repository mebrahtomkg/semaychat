import { FC } from 'react';
import styled from 'styled-components';
import { DisabledPrimaryButton, PrimaryButton } from '../../../styles';

const BUTTON_TEXT = 'Upload';

const UploadButtonEnabled = styled(PrimaryButton)`
  padding: 0.5rem 1rem;
`;

const UploadButtonDisabled = styled(DisabledPrimaryButton)`
  padding: 0.5rem 1rem;
`;

interface UploadButtonProps {
  isDisabled: boolean;
  onClick: () => void; 
}

const UploadButton: FC<UploadButtonProps> = ({ isDisabled, onClick }) => {
  return isDisabled ? (
    <UploadButtonDisabled disabled={true}>{BUTTON_TEXT}</UploadButtonDisabled>
  ) : (
    <UploadButtonEnabled onClick={onClick}>{BUTTON_TEXT}</UploadButtonEnabled>
  );
};

export default UploadButton;
