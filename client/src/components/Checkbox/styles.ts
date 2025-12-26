import { CheckBoxIcon, CheckBoxTickIcon } from '@/components/icons';
import styled, { css } from 'styled-components';

export const CheckBoxStyled = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
`;

export const BoxContainer = styled.div`
  --checkbox-width: 1.2rem;
  position: relative;
  width: var(--checkbox-width);
  height: var(--checkbox-width);
  margin-right: 0.7rem;
  color: var(--fg-primary);
  flex-shrink: 0;
`;

export const CheckBoxIconStyled = styled(CheckBoxIcon)<{
  $isChecked: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  cursor: pointer;
  stroke-width: 0;
  transition: fill 0.1s ease-in-out;
  ${(props) =>
    props.$isChecked
      ? css`
          fill: var(--bg-action);
        `
      : css`
          fill: currentColor;
        `}
`;

export const CheckBoxTickIconStyled = styled(CheckBoxTickIcon)<{
  $isChecked: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  stroke-width: 0;
  fill: var(--bg-action);
  transition: transform 0.1s ease-in;
  color: #fff;
  ${(props) =>
    props.$isChecked
      ? css`
          transform: scale(1);
        `
      : css`
          transform: scale(0);
        `}
`;

export const CheckBoxLabel = styled.label`
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
`;
