import React, { FC } from 'react';
import styled from 'styled-components';
import { MoreIcon } from '@/components/icons';

const SmallMoreButtonStyled = styled.button`
  align-self: flex-start;
  width: 2.2rem;
  min-width: 2.2rem;
  height: 2.2rem;
  padding: 0.55rem;
  color: #ffffff;
`;

interface SmallMoreButtonProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const SmallMoreButton: FC<SmallMoreButtonProps> = ({ onClick }) => (
  <SmallMoreButtonStyled onClick={onClick}>
    <MoreIcon />
  </SmallMoreButtonStyled>
);

export default SmallMoreButton;
