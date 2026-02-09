import styled, { css, keyframes } from 'styled-components';

export const SpinnerOverlay = styled.div`
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
  width: 10rem;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--bg-primary);
  border-radius: 20px;
  border: 1px solid;
  border-color: var(--fg-border);
`;

export const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  background-color: var(--bg-action-hover);
  border-radius: 50%;
  transform: scale(0.4);
  opacity: 0.3;
  animation-iteration-count: infinite;
  animation-duration: 1400ms;
  animation-delay: ${(props) => props.$delay}ms;
  animation-timing-function: cubic-bezier(0.45, 0.05, 0.55, 0.95);
  animation-name: ${pulse};
`;
