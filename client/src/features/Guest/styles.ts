import { Link } from 'react-router';
import styled from 'styled-components';

export const GuestContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
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
  padding: 1.8rem;

  @media (min-width: 375px) {
    width: 20rem;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: var(--bg-action);
  backdrop-filter: blur(1px);
`;

export const LogoIconContainer = styled.div`
  width: 4.2rem;
  aspect-ratio: 1/1;
  margin-right: 0.5rem;
`;

export const LogoText = styled.span`
  display: block;
  line-height: 1;
  font-size: 2.4rem;
  font-weight: 700;
`;

export const FormTitle = styled.h2`
  width: 100%;
  margin-bottom: 1.8rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  color: #ffffffd4;
`;

export const FormLinkContainer = styled.div`
  margin-top: 1.7rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormLink = styled(Link)`
  color: var(--fg-action);
  font-size: 1.2rem;
  font-weight: 500;
  text-decoration: underline;
  &:hover {
    text-decoration: underline;
    color: #c4b0ff;
  }
`;

export const LinkInfo = styled.span`
  display: block;
  margin-right: 0.8rem;
  font-size: 0.95rem;
  color: #e6e8eb;
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
