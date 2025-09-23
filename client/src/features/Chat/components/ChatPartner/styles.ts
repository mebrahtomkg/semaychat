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

export const CircularPhoto = styled.div`
  width: 2.9rem;
  height: 2.9rem;
  overflow: hidden;
  margin-right: 0.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

export const NameContainer = styled.div``;

export const Name = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: var(--fg-title);
`;

export const Status = styled.span`
  display: block;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--fg-description);
`;
