import { FC } from 'react';
import styled from 'styled-components';

const ActionButtonStyled = styled.button`
  margin-left: 1rem;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.6rem 0.8rem;
  background-color: var(--bg-secondary);
  border-radius: 7px;
`;

interface ActionButtonProps {
  text: string;
  onClick: () => void;
}

const ActionButton: FC<ActionButtonProps> = ({ text, onClick }) => {
  return (
    <ActionButtonStyled type="button" onClick={onClick}>
      {text}
    </ActionButtonStyled>
  );
};

export default ActionButton;
