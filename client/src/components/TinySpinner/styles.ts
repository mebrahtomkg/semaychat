import styled, { css, keyframes } from 'styled-components';

const rotate = keyframes`${css`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`}
`;

export const StyledSpinner = styled.div`
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
  z-index: 10;
  width: 50px;
  height: 50px;
  background: #000000;
  opacity: 0.7;
  border-radius: 100px;
  display: flex;
  align-items: center;
  padding: 5px;
  animation-name: ${rotate};
  animation-iteration-count: infinite;
  animation-duration: 2s;
  animation-delay: 0s;
  animation-timing-function: linear;
`;

export const Ball = styled.span`
  display: block;
  width: 5px;
  height: 8px;
  background: white;
  border-radius: 5px;
  opacity: 1;
`;
