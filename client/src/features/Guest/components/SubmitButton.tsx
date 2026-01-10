import styled, { css } from 'styled-components';
import { FC, MouseEventHandler } from 'react';
import Spinner from './Spinner';

const SubmitButtonStyled = styled.button<{ $isDisabled: boolean }>`
  height: 2.5rem;
  padding: 0rem 1.2rem;
  display: flex;
  align-items: center;
  box-shadow: none;
  border-radius: 4px;

  ${(props) =>
    props.$isDisabled
      ? css`
          cursor: not-allowed;
          background-color: var(--bg-action-disabled);
        `
      : css`
          background-color: var(--bg-action);

          &:hover {
            background-color: var(--bg-action-hover);
          }
        `}
`;

export const ButtonText = styled.p`
  margin-right: 0.5rem;
  color: var(--fg-primary);
  font-size: 1rem;
  font-weight: 500;
`;

interface SubmitButtonProps {
  text: string;
  onClick: MouseEventHandler;
  isSubmitting: boolean;
}

const SubmitButton: FC<SubmitButtonProps> = ({
  text,
  onClick,
  isSubmitting,
}) => {
  return (
    <SubmitButtonStyled
      $isDisabled={isSubmitting}
      type="button"
      onClick={onClick}
    >
      <ButtonText>{text}</ButtonText>

      {isSubmitting && <Spinner />}
    </SubmitButtonStyled>
  );
};

export default SubmitButton;
