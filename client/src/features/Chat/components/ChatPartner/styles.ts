import styled, { css } from 'styled-components';

export const ProfileLink = styled.div<{ $isLargeScreen: boolean }>`
  ${(props) =>
    props.$isLargeScreen
      ? css`
          margin-left: 1rem;
        `
      : css`
          margin-left: 3rem;
        `}
  flex-grow: 2;
`;

export const UserContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  cursor: pointer;
`;

export const NameContainer = styled.div`
  margin-left: 0.9rem;
`;

export const Name = styled.h3`
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
