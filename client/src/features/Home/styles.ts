import styled, { css } from 'styled-components';

export const HomePage = styled.div<{ $isLargeScreen: boolean }>`
  position: relative;
  height: 100vh;
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
  height: 2.5rem;
  padding-left: 1rem;
  display: flex;
  justify-content: space-between;
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

export const UsersContainer = styled.div`
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
  position: fixed;
  top: 0.6rem;
  left: 1rem;
  height: 2.2rem;
  width: 2.2rem;
  padding: 0.4rem;
`;
