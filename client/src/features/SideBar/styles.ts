import styled, { css } from 'styled-components';

export const SideBarOverlay = styled.div<{
  $isVisible: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  ${(props) =>
    props.$isVisible &&
    css`
      right: 0;
    `}
  bottom: 0;
  z-index: 150;
  background-color: #00000047;
`;

export const SideBarStyled = styled.div<{
  $isVisible: boolean;
  $isLargeScreen: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 12rem;

  border-right: 1px solid;
  transition: transform 0.2s ease-in-out;

  background-color: var(--bg-main);
  border-color: var(--fg-border);

  ${(props) =>
    props.$isVisible
      ? css`
          transform: translateX(0rem);
          box-shadow: 10px 10px 20px #000000;
        `
      : css`
          transform: translateX(-13rem);
        `}

  ${(props) =>
    !props.$isVisible &&
    props.$isLargeScreen &&
    css`
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      transform: translateX(-8.5rem);
    `}
`;

export const ProfileStyled = styled.div<{ $isVisible: boolean }>`
  padding: 1.5rem 0 0.5rem 1rem;
  overflow: hidden;
  background-color: var(--bg-secondary);

  ${(props) =>
    props.$isVisible
      ? css`
          visibility: visible;
        `
      : css`
          visibility: hidden;
        `}
`;

export const ProfilePhotoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  overflow: hidden;
  border-radius: 50%;
`;

export const ProfilePhotoStyled = styled.img`
  width: 100%;
`;

export const NameStyled = styled.h2`
  width: 100%;
  margin-left: 0.9rem;
  margin-top: 0.7rem;
  color: var(--fg-secondary);
`;

export const MenuItemsContainer = styled.div<{
  $isVisible: boolean;
  $isLargeScreen: boolean;
}>`
  padding: 0.5rem 0 0.5rem 0rem;
  border-bottom: 1px solid #272d3f;
  border-color: var(--fg-border);

  ${(props) =>
    !props.$isVisible &&
    props.$isLargeScreen &&
    css`
      width: calc(12rem - 8.5rem);
      display: flex;
      flex-direction: column;
      align-items: center;
    `}
`;

export const SingleMenuItemContainer = styled(MenuItemsContainer)`
  display: flex;
  justify-content: flex-end;
  padding: 0;
  background-color: var(--bg-secondary);
  border-bottom: none;
`;

export const MenuItemButton = styled.button`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  border-radius: 6px;
  color: var(--fg-icon);

  &:hover {
    background-color: var(--bg-hover);
  }
`;

export const SingleMenuItemButton = styled(MenuItemButton)`
  width: unset;
  color: var(--fg-secondary);
  &:hover {
    background-color: transparent;
  }
`;

export const IconContainer = styled.div`
  width: 1.2rem;
  height: 1.2rem;
`;

export const MenuItemLabel = styled.p`
  margin-left: 0.7rem;
  flex-grow: 1;
  min-width: 5rem;
  overflow: hidden;
  text-align: left;
  font-size: 1rem;
  color: var(--fg-main);
`;

export const MenuButton = styled.button`
  position: fixed;
  top: 0.6rem;
  left: 1rem;
  height: 2.2rem;
  width: 2.2rem;
  padding: 0.4rem;
`;
