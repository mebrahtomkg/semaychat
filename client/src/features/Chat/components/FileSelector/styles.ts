import styled from 'styled-components';

export const FileSelectorModal = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 1rem;
  border-radius: 10px;
  background-color: var(--bg-main);
  border: 1px solid;
  border-color: #464651;
  cursor: default;
`;

export const FilesContainer = styled.div`
  height: 55vh;
  overflow-y: auto;
  padding: 2rem 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: var(--bg-page);

  &::-webkit-scrollbar {
    background: inherit;
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #3d455c;
    border-radius: 30px;
  }
`;

export const ModalHeader = styled.div`
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h1`
  font-size: 1.5rem;
`;

export const ModalFooter = styled.div`
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FilesCount = styled.h3`
  font-size: 1.1rem;
`;
