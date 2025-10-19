import styled from 'styled-components';

export const BottomMenuStyled = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: var(--bottom-menu-height);
  padding: 0.6rem;
  overflow: hidden;
  background-color: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.5);
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
