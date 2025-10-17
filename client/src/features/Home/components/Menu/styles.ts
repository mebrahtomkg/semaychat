import styled from 'styled-components';

export const MenuOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: transparent;
`;

export const MenuStyled = styled.div`
  position: fixed;
  left: 0.7rem;
  bottom: 5rem;
  width: 13rem;
  overflow: hidden;
  border-radius: 15px;
  background-color: #383839;
`;

export const MenuItemButton = styled.button`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #474747;
  }
`;

export const IconContainer = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 0.7rem;
`;

export const MenuItemLabel = styled.p`
  flex-grow: 1;
  overflow: hidden;
  text-align: left;
  font-size: 1rem;
  color: inherit;
`;
