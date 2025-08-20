import { FC } from 'react';
import styled, { css } from 'styled-components';
import { SendIcon } from '@/components/icons';
import { StyleProps } from '@/types';

const SendButtonStyled = styled.button<{ $isDisabled?: boolean }>`
  width: 2.6rem;
  height: 2.6rem;
  padding: 0.75rem;
  border-radius: 50%;
  ${(props: StyleProps) =>
    props.$isDisabled
      ? css`
          background: ${props.theme.backgroundColors.veryBright};
          color: ${props.theme.disabledIconButton.color};
          cursor: not-allowed;
        `
      : css`
          background-color: ${props.theme.backgroundColors.button};
          color: ${props.theme.iconButton.color};
          &:hover {
            background: ${props.theme.backgroundColors.buttonHover};
          }
        `}
`;

interface SendButtonProps {
  onClick: () => void;
  isDisabled?: boolean;
}

const SendButton: FC<SendButtonProps> = ({ onClick, isDisabled = false }) => (
  <SendButtonStyled
    type="button"
    aria-label="Send"
    disabled={isDisabled}
    $isDisabled={isDisabled}
    onClick={onClick}
  >
    <SendIcon />
  </SendButtonStyled>
);

export default SendButton;
