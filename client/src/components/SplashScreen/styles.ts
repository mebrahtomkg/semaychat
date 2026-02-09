import styled, { css, keyframes } from 'styled-components';

export const SplashScreenStyled = styled.div`
  width: 100vw;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
`;

const pulse = keyframes`${css`
  0% {
    transform: scale(0.4);
    opacity: 0.2;
  }

  50% {
    transform: scale(1);
    opacity: 1;
  }

  100% {
    transform: scale(0.4);
    opacity: 0.2;
  }
`}
`;

export const Dot = styled.div<{ $delay: number }>`
  margin: 0 0.25rem;
  width: 1rem;
  height: 1rem;
  background-color: #fff;
  border-radius: 50%;
  transform: scale(0.4);
  opacity: 0.3;
  animation-iteration-count: infinite;
  animation-duration: 1400ms;
  animation-delay: ${(props) => props.$delay}ms;
  animation-timing-function: cubic-bezier(0.45, 0.05, 0.55, 0.95);
  animation-name: ${pulse};
`;
