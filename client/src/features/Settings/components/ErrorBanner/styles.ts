import styled from 'styled-components';
import { CenteredModal } from '../../../../styles';

export const ErrorBannerModal = styled(CenteredModal)`
  display: flex;
  min-height: 5rem;
  align-items: center;
`;

export const ErrorText = styled.p`
  margin: auto;
  margin-right: 1rem;
  font-size: 1.04rem;
  font-weight: 500;
  color: ${(props) => props.theme.errorBanner.color};
`;
