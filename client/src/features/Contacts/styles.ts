import styled from 'styled-components';

export const ContactsModal = styled.div<{ $isLargeScreen: boolean }>`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: var(--big-modal-width);
  overflow: hidden;
  background-color: var(--bg-primary);
`;

export const HeaderContainer = styled.div`
  height: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-secondary);
  border-bottom: 1px solid;
  border-color: var(--fg-border);
`;

export const SearchContainer = styled.div`
  flex-grow: 1;
  padding: 0 0.7rem;
`;

export const ContactsContainer = styled.div`
  height: 100vh;
  padding-top: 1rem;
  padding-bottom: 6rem;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 4px;
    background-color: var(--bg-primary);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--bg-hover);
  }
`;
