import React, { FC } from 'react';
import styled from 'styled-components';
import { MoreIcon } from '../../../components/icons';

const MoreButtonStyled = styled.button`
  align-self: flex-start;
  width: 2rem;
  height: 2rem;
  padding: 0.45rem;
  color: #ffffff;
`;

interface SmallMoreButtonProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const SmallMoreButton: FC<SmallMoreButtonProps> = ({ onClick }) => (
  <MoreButtonStyled onClick={onClick}>
    <MoreIcon />
  </MoreButtonStyled>
);

export default SmallMoreButton;
