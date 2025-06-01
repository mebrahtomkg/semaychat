import { CheckBoxIcon, CheckBoxTickIcon } from '@/components/icons';
import { StyleProps } from '@/types';
import styled, { css } from 'styled-components';

export const CheckBoxStyled = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
`;

export const BoxContainer = styled.div`
  position: relative;
  width: 1.4rem;
  height: 1.4rem;
  margin-right: 0.8rem;
  color: white;
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
          fill: blue;
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
  fill: blue;
  transition: transform 0.1s ease-in;
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
  color: ${(props: StyleProps) => props.theme.textColors?.normal};
`;
