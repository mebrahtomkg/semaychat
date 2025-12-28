import { Link } from 'react-router';
import styled, { css } from 'styled-components';

export const ContactStyled = styled(Link)`
  margin: 0 0.2rem;
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: var(--bg-hover);
  }
`;

export const NameContainer = styled.div`
  flex-grow: 1;
  margin-left: 0.6rem;
  overflow: hidden;
`;

export const Name = styled.h3`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
  font-size: 1rem;
  font-weight: 500;
`;

export const Status = styled.span<{ $isOnline: boolean }>`
  display: block;
  font-size: 0.85rem;
  font-weight: 500;

  ${(props) =>
    props.$isOnline
      ? css`
          color: var(--fg-user-status);
        `
      : css`
          color: var(--fg-muted);
        `}
`;
