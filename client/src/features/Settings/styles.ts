import styled from 'styled-components';

export const SettingsPageOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 300;
  background-color: var(--bg-overlay);
  display: flex;
  justify-content: center;
`;

export const SettingsPage = styled.div`
  position: relative;
  width: 100vw;
  padding-top: 0.5rem;
  background-color: var(--bg-main);

  @media (min-width: 500px) {
    width: 29rem;
    padding: 1rem;
    border-radius: 10px;
    margin-top: 5vh;
    height: 90vh;
  }
`;

export const SettingsPageHeader = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MainTitle = styled.h1`
  font-size: 1.5rem;
  line-height: 1;
  font-weight: 500;
  color: var(--fg-title);
`;

export const NavMenuContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const NavMenu = styled.div`
  margin-left: 1rem;
  flex-grow: 2;
  display: flex;
  padding: 2px;
  border-radius: 12px;
  background-color: var(--bg-very-bright);
`;

export const SettingsCategoryContainer = styled.div`
  background-color: inherit;
`;
