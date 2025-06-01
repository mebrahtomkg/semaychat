import styled, { css } from 'styled-components';
import { StyleProps } from '@/types';

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
  transition: transform 0.2s ease-in-out;

  background-color: ${(props: StyleProps) =>
    props.theme.backgroundColors?.main};

  ${(props) =>
    props.$isVisible
      ? css`
          transform: translateX(0rem);
          box-shadow: 22px 17px 20px #1a1e2c;
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
  padding: 3rem 0 0.5rem 1rem;
  overflow: hidden;
  background-color: ${(props: StyleProps) =>
    props.theme.backgroundColors?.bright};
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

export const SidebarToggleButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.8rem;
  width: 2rem;
  height: 2rem;
  padding: 0.5rem;
  color: white;
`;

export const NameStyled = styled.h2`
  width: 100%;
  margin-left: 0.9rem;
  margin-top: 0.7rem;
  color: #fff;
`;

export const MenuItemsContainer = styled.div<{
  $isVisible: boolean;
  $isLargeScreen: boolean;
}>`
  padding: 0.5rem 0 0.5rem 0rem;
  border-bottom: 1px solid #272d3f;
  border-color: ${(props: StyleProps) => props.theme.backgroundColors?.bright};

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

export const MenuItemButton = styled.button`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  border-radius: 6px;

  &:hover {
    background-color: ${(props: StyleProps) =>
      props.theme.backgroundColors?.hover};
  }
`;

export const ImageIcon = styled.img`
  display: block;
  width: 20px;
  height: 20px;
  opacity: 0.6;
`;

export const IconContainer = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  color: #fff;
`;

export const MenuItemLabel = styled.p`
  margin-left: 0.7rem;
  flex-grow: 1;
  min-width: 5rem;
  overflow: hidden;
  text-align: left;
  color: #fff;
  font-size: 1rem;
`;
