import styled from 'styled-components';

export const HamburgerContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: var(--bottom-menu-height);
  padding: 0.6rem;
  overflow: hidden;
  background-color: var(--bg-main);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.5);
`;

export const HamburgerStyled = styled.div`
  padding: 0.4rem 0.8rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 15px;
  background-color: var(--bg-hover);

  &:hover {
    background-color: var(--bg-hover);
  }
`;

export const ProfilePhotoContainer = styled.div`
  --photo-width: 2.7rem;
  width: var(--photo-width);
  height: var(--photo-width);
  margin-right: 0.6rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25%;
  background-color: #0b580b;
`;

export const ProfilePhoto = styled.img`
  width: 100%;
`;

export const NameInitial = styled.p`
  line-height: 1;
  font-size: 1.4rem;
  font-weight: 600;
  color: inherit;
`;

export const Name = styled.h2`
  overflow: hidden;
  font-size: 1.2rem;
  font-weight: 500;
  color: inherit;
`;

export const MenuItemButton = styled.button`
  padding: 1rem 1.4rem;
  border-radius: 10px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: var(--bg-hover);
  }
`;

export const IconContainer = styled.div`
  width: 1.2rem;
  height: 1.2rem;
`;

export const MenuItemLabel = styled.p`
  flex-grow: 1;
  margin-left: 0.7rem;
  overflow: hidden;
  text-align: left;
  font-size: 1rem;
  color: inherit;
`;
