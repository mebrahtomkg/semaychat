import styled from 'styled-components';
import { FC, MouseEventHandler } from 'react';

const NextButtonStyled = styled.button`
  padding: 0.5rem 1.7rem;
  box-shadow: none;
  border: 1px solid;
  border-color: var(--bg-action);
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  color: var(--fg-primary);
  background-color: transparent;
`;

interface NextButtonProps {
  onClick: MouseEventHandler;
}

const NextButton: FC<NextButtonProps> = ({ onClick }) => {
  return (
    <NextButtonStyled type="button" onClick={onClick}>
      Next
    </NextButtonStyled>
  );
};

export default NextButton;
