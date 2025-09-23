import { FC } from 'react';
import styled, { css } from 'styled-components';
import { SendIcon } from '@/components/icons';

const SendButtonStyled = styled.button<{ $isDisabled?: boolean }>`
  width: 2.6rem;
  height: 2.6rem;
  padding: 0.75rem;
  border-radius: 50%;
  ${(props) =>
    props.$isDisabled
      ? css`
          background-color: var(--bg-very-bright);
          color: var(--fg-button-disabled);
          cursor: not-allowed;
        `
      : css`
          background-color: var(--bg-button);
          color: #fff;
          &:hover {
            background-color: var(--bg-button-hover);
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
