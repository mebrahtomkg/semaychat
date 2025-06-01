import React from 'react';
import styled from 'styled-components';
import { MoreIcon } from '../icons';

const MoreButtonStyled = styled.button`
  width: 2rem;
  padding: 0.3rem;
  color: ${(props) => props.theme.iconColor};
`;

const MoreButton = ({ onClick, ...restProps }) => {
  return (
    <MoreButtonStyled aria-label="More" onClick={onClick} {...restProps}>
      <MoreIcon />
    </MoreButtonStyled>
  );
};

export default MoreButton;
