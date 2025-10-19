import styled from 'styled-components';
import { Link } from 'react-router';
import { BackIcon } from './icons';

const BackLinkStyled = styled(Link)`
  width: 2rem;
  padding: 0.4rem;
  background-color: transparent;
  &:hover {
    background-color: transparent;
  }
`;

const BackLink = ({ to = '/' }) => (
  <BackLinkStyled to={to}>
    <BackIcon />
  </BackLinkStyled>
);

export default BackLink;
