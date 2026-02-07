import styled from 'styled-components';

export const BlockedUsersStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 1rem;
  height: 100vh;
  width: var(--big-modal-width);
  min-width: var(--big-modal-width);
  overflow: hidden;
  background-color: var(--bg-primary);
`;

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.h2`
  margin-left: 1.5rem;
  flex-grow: 2;
  font-size: 1.15rem;
`;

export const BlockedUsersContainer = styled.div`
  padding-top: 1rem;
  padding-bottom: 6rem;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const NoBlockedUsersInfo = styled.p`
  padding: 5rem 4rem;
  font-size: 1.2rem;
  text-align: center;
  font-weight: 500;
`;
