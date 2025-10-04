import styled, { css, keyframes } from 'styled-components';

export const SpinnerModal = styled.div`
  position: fixed;
  z-index: 400;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.35);
`;

export const SpinnerStyled = styled.div`
  width: 160px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #272d43;
  border-radius: 25px;
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

export const SpinnerCanvas = styled.canvas`
  animation: 1s linear infinite ${rotate};
`;
