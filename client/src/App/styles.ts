import styled from 'styled-components';

export const AppStyled = styled.div`
  position: relative;
  color: var(--fg-primary);
  display: flex;

  --big-modal-width: 100vw;
  --bottom-menu-height: 3.7rem;

  @media (min-width: 768px) {
    --big-modal-width: 22rem;
  }
`;
