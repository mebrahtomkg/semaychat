import { CenteredModal } from '@/styles';
import styled from 'styled-components';

export const ErrorBannerModal = styled(CenteredModal)`
  display: flex;
  min-height: 5rem;
  align-items: center;
`;

export const ErrorText = styled.p`
  margin: auto;
  margin-right: 1rem;
  word-break: break-word;
  font-size: 1.04rem;
  font-weight: 500;
  color: var(--fg-error);
`;
