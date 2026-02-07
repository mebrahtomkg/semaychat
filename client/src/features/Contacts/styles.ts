import styled from 'styled-components';

export const ContactsModal = styled.div`
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

export const NoContactsInfo = styled.p`
  padding: 2.5rem 0rem 1rem 0rem;
  font-size: 1.3rem;
  text-align: center;
  font-weight: 500;
`;

export const NoContactsAdditionalInfo = styled.p`
  padding: 0rem 1rem;
  font-size: 1rem;
  text-align: center;
  font-weight: 500;
`;
