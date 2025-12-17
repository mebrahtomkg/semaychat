import React, { FC } from 'react';
import styled from 'styled-components';
import { MoreIcon } from '@/components/icons';

const SmallMoreButtonStyled = styled.button`
  --small-more-btn-size: 2.4rem;
  align-self: flex-start;
  width: var(--small-more-btn-size);
  min-width: var(--small-more-btn-size);
  height: var(--small-more-btn-size);
  padding: 0.55rem;
  color: var(--fg-primary);
  border-radius: inherit;
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
