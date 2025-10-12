import styled, { css } from 'styled-components';

export const TextInputStyled = styled.div<{ $isFocused: boolean }>`
  --text-input-padding: 1rem;
  --text-input-font-size: 1rem;
  --text-input-border-color: var(--fg-text-input-border);
  position: relative;
  margin-bottom: 3rem;
  background-color: var(--bg-hover);
  height: 3.4rem;
  border: 1px solid;
  border-radius: 7px;
  cursor: text;

  ${(props) =>
    props.$isFocused &&
    css`
      border: 2px solid;
      --text-input-border-color: var(--fg-text-input-border-focused);
    `}

  &:hover {
    --text-input-border-color: var(--fg-text-input-border-focused);
  }

  border-color: var(--text-input-border-color);
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
  color: var(--fg-text-input);
  background-color: transparent;
`;

export const LabelStyled = styled.label<{
  $isAsLabel: boolean;
}>`
  ${css`
    display: block;
    width: fit-content;
    padding: 0 0.4rem;
    margin-left: calc(var(--text-input-padding) - 0.4rem);
    margin-top: var(--text-input-padding);
    font-size: var(--text-input-font-size);
    font-weight: 500;
    background-color: inherit;
    color: var(--fg-text-input-placehoder);
    transform: translateY(0rem);
    transition:
      transform 200ms ease,
      font-size 200ms ease,
      font-weight 200ms ease,
      color 200ms ease;
  `}

  ${(props) =>
    props.$isAsLabel &&
    css`
      font-size: 0.8rem;
      font-weight: 400;
      color: var(--text-input-border-color);
      transform: translateY(-1.65rem);
    `}
`;

export const HelperText = styled.span`
  display: block;
  color: var(--fg-main);
  font-size: 0.8rem;
  font-weight: 500;
`;
