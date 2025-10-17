import styled from 'styled-components';

export const HomeStyled = styled.div`
  position: relative;
  height: 100vh;
  width: var(--big-modal-width);
  overflow: hidden;
  background-color: var(--bg-main);
`;

export const HeaderContainer = styled.div`
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-secondary);
  border-bottom: 1px solid;
  border-color: var(--fg-border);
`;

export const ChatListContainer = styled.div`
  height: 100vh;
  padding-top: 1rem;
  padding-bottom: 6rem;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 4px;
    background-color: var(--bg-main);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--bg-bright);
  }
`;

export const MenuButton = styled.button`
  margin-right: 0.5rem;
  width: 2.2rem;
  height: 2.2rem;
  padding: 0.4rem;
`;
