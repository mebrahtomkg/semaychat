import { FC } from 'react';
import styled, { css } from 'styled-components';
import { AddIcon } from '@/components/icons';

const AddButtonStyled = styled.button<{ $isDisabled?: boolean }>`
  margin-right: 1rem;
  width: 2.7rem;
  height: 2.7rem;
  padding: 0.7rem;
  border-radius: 50%;
  transition: background-color 0.3s ease-in-out;
  ${(props) =>
    props.$isDisabled
      ? css`
          color: ${(props) => props.theme.disabledIconButton.color};
          cursor: not-allowed;
        `
      : css`
          color: #ffffff;
          &:hover {
            background: #28314c;
          }
        `}
`;

interface AddButtonProps {
  onClick: () => void;
  isDisabled?: boolean;
  ariaLabel?: string;
}

const AddButton: FC<AddButtonProps> = ({
  onClick,
  isDisabled = false,
  ariaLabel = 'Add'
}) => (
  <AddButtonStyled
    type="button"
    disabled={isDisabled}
    $isDisabled={isDisabled}
    aria-label={ariaLabel}
    onClick={onClick}
  >
    <AddIcon />
  </AddButtonStyled>
);

export default AddButton;
