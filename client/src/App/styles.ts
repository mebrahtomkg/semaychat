import styled from 'styled-components';

export const AppStyled = styled.div`
  position: relative;
  color: var(--fg-primary);
  display: flex;

  --big-modal-width: 100vw;
  --bottom-menu-height: 3.7rem;

  @media (min-width: 500px) {
    --big-modal-width: 22rem;
  }
`;

export const PageContainer = styled.div`
  height: 100vh;
  overflow-y: auto;
  flex-grow: 1;
  display: flex;
  justify-content: center;

  &::-webkit-scrollbar {
    background-color: var(--bg-primary);
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--bg-primary);
    border-radius: 30px;
  }
`;
