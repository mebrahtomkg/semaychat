import styled from 'styled-components';

export const BlockedUsersStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  padding: 0 1rem;
  background-color: var(--bg-main);
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
