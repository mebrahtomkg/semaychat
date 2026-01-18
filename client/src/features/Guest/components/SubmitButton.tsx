import styled, { css } from 'styled-components';
import { FC, MouseEventHandler } from 'react';
import Spinner from './Spinner';

const SubmitButtonStyled = styled.button<{ $isDisabled: boolean }>`
  width: 100%;
  height: 2.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  ${(props) =>
    props.$isDisabled
      ? css`
          cursor: not-allowed;
          background-color: var(--bg-action-disabled);
        `
      : css`
          background-color: var(--bg-action);
          box-shadow: 0 0 5px rgba(8, 148, 182, 0.4);

          &:hover {
            background-color: var(--bg-action-hover);
          }
        `}
`;

export const ButtonText = styled.p`
  margin-right: 0.5rem;
  color: #ffffff;
  font-size: 1.1rem;
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
  const handleClick: MouseEventHandler = (e) => {
    if (!isSubmitting) {
      onClick(e);
    }
  };

  return (
    <SubmitButtonStyled
      $isDisabled={isSubmitting}
      type="button"
      onClick={handleClick}
    >
      <ButtonText>{text}</ButtonText>

      {isSubmitting && <Spinner />}
    </SubmitButtonStyled>
  );
};

export default SubmitButton;
