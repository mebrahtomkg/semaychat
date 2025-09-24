import { Link } from 'react-router';
import styled from 'styled-components';

export const CenteredPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: #26a7c4;
`;

export const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const FormOptionLinker = styled.div`
  color: #fefefe;
  font-size: 1rem;
  font-weight: 500;
`;

export const FormLink = styled(Link)`
  color: #1cb5c3;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: underline;

  &:hover {
    text-decoration: underline;
    color: #16cdde;
  }
`;
