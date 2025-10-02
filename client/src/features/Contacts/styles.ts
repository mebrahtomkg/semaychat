import styled, { css } from 'styled-components';

export const ContactsModal = styled.div<{ $isLargeScreen: boolean }>`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: var(--bg-main);

  ${(props) =>
    props.$isLargeScreen
      ? css`
          max-width: 19rem;
          min-width: 19rem;
        `
      : css`
          width: 100%;
        `}
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

export const SearchContainer = styled.div<{ $isLargeScreen: boolean }>`
  display: flex;
  align-items: center;
  border-radius: 25px;
  background-color: var(--bg-text-input);

  ${(props) =>
    !props.$isLargeScreen &&
    css`
      /*space for the sidebar menu button*/
      margin-left: 4rem;
    `}
`;

export const ContactsContainer = styled.div`
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

export const SearchIconContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.8rem;
  color: var(--fg-icon);
`;
