import styled, { css } from 'styled-components';
import { RadioButtonBallIcon, RadioButtonIcon } from '@/components/icons';

export const RadioButtonContainer = styled.div`
  margin: 1.4rem 0;
`;

export const HiddenRadioButtonInput = styled.input`
  height: 1px;
  width: 1px;
  overflow: hidden;
  padding: 0;
  margin: 0;
  border: none;
  white-space: nowrap;
`;

export const RadioButtonLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-size: 1rem;
  font-weight: 400;
  color: var(--fg-normal);
`;

export const RadioButtonIconContainer = styled.div`
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  color: var(--fg-radio-button);
  margin-right: 1rem;
`;

export const RadioButtonIconStyled = styled(RadioButtonIcon)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
