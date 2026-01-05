import { Link } from 'react-router';
import styled from 'styled-components';

export const GuestStyled = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormStyled = styled.div`
  min-width: 20rem;
  background-color: var(--bg-page);
  padding: 2rem;
  border-radius: 10px;
`;

export const Logo = styled.h1`
  font-size: 2.2rem;
  font-weight: 500;
  margin-bottom: 2rem;
  color: var(--fg-action);
`;

export const FormTitle = styled.h2`
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--fg-muted);
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const FormLink = styled(Link)`
  margin-right: 2.5rem;
  color: var(--fg-action);
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: underline;

  &:hover {
    text-decoration: underline;
    color: #16cdde;
  }
`;

export const PrimaryButton = styled.button`
  padding: 0.4rem 1.7rem;
  box-shadow: none;
  border: 1px solid;
  border-color: var(--bg-action);
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  color: var(--fg-primary);
  background-color: var(--bg-action);

  &:hover {
    background-color: var(--bg-action-hover);
  }
`;
