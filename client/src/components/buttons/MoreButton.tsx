import styled from 'styled-components';
import { MoreIcon } from '../icons';
import { FC, MouseEventHandler } from 'react';

const MoreButtonStyled = styled.button`
  width: 2rem;
  padding: 0.3rem;
`;

interface MoreButtonProps {
  onClick: MouseEventHandler;
  ariaLabel?: string;
}

const MoreButton: FC<MoreButtonProps> = ({ onClick, ...restProps }) => {
  return (
    <MoreButtonStyled aria-label="More" onClick={onClick} {...restProps}>
      <MoreIcon />
    </MoreButtonStyled>
  );
};

export default MoreButton;
