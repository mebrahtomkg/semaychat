import styled from 'styled-components';

const MenuButtonStyled = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  height: 1.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Dash = styled.span`
  display: block;
  width: 2rem;
  height: 3px;
  background: #aaaaaa;
`;

const MenuButton = ({ onClick }) => {
  return (
    <MenuButtonStyled onClick={onClick}>
      <Dash />
      <Dash />
      <Dash />
    </MenuButtonStyled>
  );
};

export default MenuButton;
