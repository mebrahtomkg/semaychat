import styled from 'styled-components';

export const BlockedUsersOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-overlay);
`;

export const BlockedUsersModal = styled.div`
  padding: 1rem 0.5rem;
  border-radius: 10px;
  background-color: var(--bg-main);
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BlockedUsersContainer = styled.div`
  width: calc(100vw - 2rem);
  height: 78vh;
  padding-top: 1rem;
  padding-bottom: 6rem;
  overflow-y: auto;
  overflow-x: hidden;

  @media (min-width: 375px) {
    width: 20rem;
  }

  @media (min-width: 768px) {
    width: 22rem;
  }
`;
