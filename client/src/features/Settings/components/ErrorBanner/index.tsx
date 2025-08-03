import { FC } from 'react';
import { ErrorBannerModal, ErrorText } from './styles';
import { FullScreenOverlay } from '@/styles';
import { CloseButton } from '@/components/buttons';

interface ErrorBannerProps {
  error: string;
  onClose: () => void;
}

const ErrorBanner: FC<ErrorBannerProps> = ({ error, onClose }) => {
  return (
    <FullScreenOverlay $zIndex={300}>
      <ErrorBannerModal>
        <ErrorText>{error}</ErrorText>
        <CloseButton onClick={onClose} ariaLabel="Close error banner." />
      </ErrorBannerModal>
    </FullScreenOverlay>
  );
};

export default ErrorBanner;
