import styled from 'styled-components';

export const PrivacyEditorOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: transparent;
`;

export const PrivacyEditorViewPort = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

export const PrivacyEditorStyled = styled.div`
  margin: 1rem;
  padding: 1.5rem;
  padding-bottom: 0.3rem;
  border-radius: 20px;
  border: 1px solid;
  background-color: var(--bg-primary);
  border-color: var(--fg-border);
  box-shadow: 10px 10px 30px #000000;
`;

export const MainSection = styled.div``;

export const Title = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
`;
