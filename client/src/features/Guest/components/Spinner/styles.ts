import { SpinnerIcon } from '@/components/icons';
import styled, { css, keyframes } from 'styled-components';

export const SpinnerStyled = styled.div`
  width: 1.4rem;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const rotate = keyframes`${css`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`}
`;

export const RotatingSpinnerIcon = styled(SpinnerIcon)`
  animation: 1s linear infinite ${rotate};
`;
