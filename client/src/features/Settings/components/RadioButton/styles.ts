import styled, { css } from 'styled-components';
import { StyleProps } from '@/types';
import { RadioButtonBallIcon, RadioButtonIcon } from '@/components/icons';

export const RadioButtonContainer = styled.div`
  margin: 1.4rem 0;
  display: flex;
  align-items: center;
`;

export const RadioButtonIconContainer = styled.div`
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  color: ${(props: StyleProps) => props.theme.colors.radioButton};
`;

export const RadioButtonIconStyled = styled(RadioButtonIcon)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  cursor: pointer;
`;

export const RadioButtonBallIconStyled = styled(RadioButtonBallIcon)<{
  $isVisible: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: scale(0);
  transition: transform 0.17s ease-in-out;
  ${(props) =>
    props.$isVisible &&
    css`
      transform: scale(1);
    `}
`;

export const RadioButtonLabel = styled.label`
  padding-left: 1rem;
  align-self: center;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 400;
  color: ${(props: StyleProps) => props.theme.textColors?.normal};
`;
