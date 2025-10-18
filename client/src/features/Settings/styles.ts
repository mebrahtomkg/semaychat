import styled from 'styled-components';

export const SettingsModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: transparent;
`;

export const SettingsModal = styled.div`
  position: absolute;
  inset: 0;
  padding: 1rem;
  width: var(--big-modal-width);
  background-color: var(--bg-main);
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
  margin-bottom: 1.5rem;
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
  @media (min-width: 500px) {
    position: relative;
  }
`;

export const SettingsCategoryContainerBox = styled.div`
  @media (min-width: 500px) {
    position: relative;
  }
`;
