import styled, { css } from 'styled-components';

export const TextInputStyled = styled.div`
  --text-input-padding: 1rem;
  --text-input-font-size: 1rem;
  --text-input-border-color: var(--bg-action);
  margin-bottom: 1.6rem;
  background-color: inherit;
`;

export const TextInputViewPort = styled.div<{ $isFocused: boolean }>`
  position: relative;
  margin-bottom: 0.5rem;
  padding: var(--text-input-padding);
  background-color: inherit;
  height: 3.4rem;
  outline-style: solid;
  outline-width: 1px;
  border-radius: 7px;
  cursor: text;

  ${(props) =>
    props.$isFocused &&
    css`
      outline-width: 2px;
      --text-input-border-color: var(--bg-action-hover);
    `}

  &:hover {
    --text-input-border-color: var(--bg-action-hover);
  }

  outline-color: var(--text-input-border-color);
`;

export const InputStyled = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  padding: var(--text-input-padding);
  font-size: var(--text-input-font-size);
  box-shadow: none;
  outline-style: none;
  border: none;
  border-radius: inherit;
  background-color: transparent;
`;

export const LabelStyled = styled.label<{
  $isAsLabel: boolean;
}>`
  ${css`
    display: block;
    width: fit-content;
    padding: 0 0.4rem;
    margin-left: -0.4rem;
    background-color: inherit;
    transition:
      transform 200ms ease,
      font-size 200ms ease,
      font-weight 200ms ease,
      color 200ms ease;
  `}

  ${(props) =>
    props.$isAsLabel
      ? css`
          font-size: 0.8rem;
          font-weight: 400;
          color: var(--text-input-border-color);
          transform: translateY(-1.7rem);
        `
      : css`
          color: var(--fg-muted);
          font-size: var(--text-input-font-size);
          font-weight: 500;
          transform: translateY(0rem);
        `}
`;

export const InfoContainer = styled.div`
  width: 100%;
  height: 2rem;
  margin-left: 0.2rem;
`;

export const Info = styled.p`
  color: var(--fg-muted);
  font-size: 0.8rem;
  font-weight: 500;
`;
