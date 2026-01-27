import styled, { css } from 'styled-components';

export const ProfileLink = styled.div`
  flex-grow: 2;
  margin-left: 3rem;

  @media (min-width: 768px) {
    margin-left: 1rem;
  }
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
