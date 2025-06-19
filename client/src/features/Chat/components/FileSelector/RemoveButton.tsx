import { FC } from 'react';
import styled from 'styled-components';
import { CloseIcon } from '@/components/icons';

const RemoveButtonStyled = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease-in-out;

  background: ${(props) => props.theme.iconButton.backgroundColor};
  color: ${(props) => props.theme.iconButton.color};
  &:hover {
    background: ${(props) => props.theme.iconButton.hover.backgroundColor};
  }
`;

interface RemoveButtonProps {
  onClick: () => void;
  ariaLabel?: string;
}

const RemoveButton: FC<RemoveButtonProps> = ({
  onClick,
  ariaLabel = 'Remove'
}) => (
  <RemoveButtonStyled type="button" aria-label={ariaLabel} onClick={onClick}>
    <CloseIcon />
  </RemoveButtonStyled>
);

export default RemoveButton;
