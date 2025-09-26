import styled, { css, keyframes } from 'styled-components';
import { ImageSpinnerIcon } from './icons';

const rotate = keyframes`${css`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`}
`;

const ImageLoadingSpinner = styled(ImageSpinnerIcon)`
  width: 3.5rem;
  height: 3.5rem;
  animation-iteration-count: infinite;
  animation-duration: 2s;
  animation-delay: 0s;
  animation-timing-function: linear;
  animation-name: ${rotate};
`;

export default ImageLoadingSpinner;
