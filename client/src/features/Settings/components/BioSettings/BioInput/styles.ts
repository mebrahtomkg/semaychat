import styled, { css, keyframes } from 'styled-components';

export const TextAreaStyled = styled.textarea`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  padding: var(--text-input-padding);
  font-size: var(--text-input-font-size);
  outline-style: none;
  border: none;
  border-radius: inherit;
  color: var(--fg-text-input);
  background-color: transparent;
  box-shadow: none;
  overflow: hidden;
  overflow-wrap: break-word;
  line-height: 1.7;
  resize: none;
`;

const shake = keyframes`${css`
  0% {
    transform: translateX(0px);
  }

  25% {
    transform: translateX(6px);
  }

  50% {
    transform: translateX(0px);
  }

  100% {
    transform: translateX(6px);
  }
`}
`;

export const Counter = styled.p`
  position: absolute;
  top: -0.7rem;
  right: 0.7rem;
  z-index: 6;
  padding: 0 0.4rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--fg-main);
  background-color: var(--bg-main);
  animation-duration: 300ms;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-name: ${shake};
`;
