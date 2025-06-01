import styled, { css } from 'styled-components';
import { StyleProps } from '../../types';

export const SettingsPageOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 300;
  background-color: ${(props: StyleProps) =>
    props.theme.backgroundColors?.overlay};
  display: flex;
  justify-content: center;
`;

export const SettingsPage = styled.div<{ $windowWidth: number }>`
  ${(props) =>
    props.$windowWidth < 500
      ? css`
          width: 100vw;
          padding-top: 0.5rem;
        `
      : css`
          padding: 1rem;
          border-radius: 10px;
          margin-top: 5vh;
          height: 90vh;
        `}

  background-color: ${(props: StyleProps) =>
    props.theme.backgroundColors?.main};
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
  color: ${(props: StyleProps) => props.theme.textColors?.title};
`;

export const NavMenuContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const NavMenu = styled.div<{ $windowWidth: number }>`
  ${(props) =>
    props.$windowWidth < 500
      ? css`
          margin: 0 1rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          padding: 2px;
          border-radius: 12px;
        `
      : css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2px;
          border-radius: 12px;
          background-color: #3c576e;
        `}

  background-color: ${(props: StyleProps) =>
    props.theme.backgroundColors?.bright};
`;

export const MenuItemButton = styled.button<{ $isActive: boolean }>`
  flex-grow: 1;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  padding: 0.45rem 1.3rem;
  border-radius: inherit;
  ${(props) =>
    props.$isActive &&
    css`
      background-color: ${(props: StyleProps) =>
        props.theme.backgroundColors?.veryBright};
    `}
`;

export const MenuDivider = styled.div`
  width: 1px;
  height: 1rem;
  background-color: ${(props: StyleProps) =>
    props.theme.backgroundColors?.veryBright};
`;

export const SettingsCategoryContainer = styled.div``;

export const SettingsItemContainer = styled.div`
  padding: 0.8rem 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  border-radius: 15px;
  &:hover {
    background: ${(props: StyleProps) => props.theme.backgroundColors?.hover};
  }
`;

export const Title = styled.p`
  padding: 0;
  margin: 0;
  font-size: 1rem;
  color: ${(props: StyleProps) => props.theme.textColors?.normal};
  transition: color 0.4s ease-in-out;
`;

export const Description = styled.span`
  display: block;
  color: ${(props: StyleProps) => props.theme.textColors?.description};
  font-size: 0.9rem;
`;

export const ArrowIconContainer = styled.div`
  width: 1rem;
  height: 1rem;
  color: ${(props: StyleProps) => props.theme.textColors?.normal};
`;
