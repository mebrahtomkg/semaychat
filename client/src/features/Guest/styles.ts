import { Link } from 'react-router';
import styled from 'styled-components';

export const GuestContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--bg-page);
  background-image:
    radial-gradient(
      circle at center,
      rgba(7, 197, 242, 0.15) 0%,
      rgba(0, 0, 0, 0.4) 60%,
      rgba(0, 0, 0, 0.9) 100%
    ),
    radial-gradient(#763ed9c7 1px, transparent 1px),
    radial-gradient(#0894b6bd 1px, transparent 1px);
  background-size:
    100% 100%,
    20px 20px,
    20px 20px;
  background-position:
    0 0,
    0 0,
    10px 10px;
  background-attachment: fixed;
`;

export const GuestStyled = styled.div`
  min-height: 100vh;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormStyled = styled.div`
  width: 19rem;
  border-radius: 10px;
  background-color: rgb(11 13 20 / 94%);
  backdrop-filter: blur(5px);
  padding: 2rem;

  @media (min-width: 375px) {
    width: 20rem;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  line-height: 1;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #019abe;
  backdrop-filter: blur(1px);
`;

export const LogoContainer = styled.div`
  width: 4.5rem;
  aspect-ratio: 1/1;
  margin-right: 0.5rem;
`;

export const FormTitle = styled.h2`
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: #ffffffc9;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const FormLink = styled(Link)`
  margin-right: 1rem;
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
  display: flex;
  align-items: center;
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
