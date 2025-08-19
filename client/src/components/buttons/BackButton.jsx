
import styled from 'styled-components';
import { BackIcon } from '../icons';

const BackButtonStyled = styled.button`
  width: 2rem;
  height: 2rem;
  min-width: 2rem;
  padding: 0.3rem;
  color: ${(props) => props.theme.iconColor};
`;

const BackButton = ({ onClick, ...rest }) => {
  return (
    <BackButtonStyled aria-label="Back" onClick={onClick} {...rest}>
      <BackIcon />
    </BackButtonStyled>
  );
};

export default BackButton;
