import styled from 'styled-components';

export const EditorModalStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  background-color: var(--bg-primary);
`;

export const HeaderSection = styled.div`
  padding: 0.4rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const Title = styled.h2`
  margin-left: 2rem;
  flex-grow: 2;
  font-size: 1.15rem;
`;

export const MainSection = styled.div`
  padding: 0 2rem;
  background-color: inherit;
`;

export const DoneButton = styled.button`
  --done-btn-width: 2.6rem;
  width: var(--done-btn-width);
  height: var(--done-btn-width);
  padding: 0.5rem;
  background-color: var(--bg-action);
  border-radius: 50%;
`;
