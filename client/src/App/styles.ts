import styled, { css } from 'styled-components';

export const AppContainer = styled.div<{ $isLargeScreen: boolean }>`
  display: flex;
  ${(props) =>
    props.$isLargeScreen &&
    css`
      margin-left: 4rem;
    `}
`;

export const PageContainer = styled.div`
  height: 100vh;
  overflow-y: auto;
  flex-grow: 1;
  display: flex;
  justify-content: center;

  &::-webkit-scrollbar {
    background: inherit;
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #3d455c;
    border-radius: 30px;
  }
`;
