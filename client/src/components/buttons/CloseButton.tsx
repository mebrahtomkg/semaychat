import { CloseIcon } from '../icons';
import styled from 'styled-components';
import type { StyleProps } from '../../types';

const CloseButtonStyled = styled.button`
  width: 2.7rem;
  min-width: 2.7rem;
  height: 2.7rem;
  padding: 0.85rem;
  border-radius: 50%;
  color: #ffffff;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${(props: StyleProps) =>
      props.theme.backgroundColors?.bright};
  }
`;

const CloseButton = ({ onClick, ariaLabel = 'Close' }) => {
  return (
    <CloseButtonStyled type="button" onClick={onClick} aria-label={ariaLabel}>
      <CloseIcon />
    </CloseButtonStyled>
  );
};

export default CloseButton;
