import styled from 'styled-components';

export const RadioGroupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 300;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

export const RadioGroupStyled = styled.div`
  padding: 1.5rem;
  border-radius: 20px;
  border: 1px solid;
  background-color: var(--bg-main);
  border-color: var(--fg-border);
  box-shadow: 10px 10px 30px #000000;
`;

export const Title = styled.h2`
  margin-right: 1.3rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--fg-title);
`;

export const MainSection = styled.div`
  margin-bottom: 1rem;
`;
