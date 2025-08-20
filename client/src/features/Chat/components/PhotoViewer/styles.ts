import styled from 'styled-components';

export const PhotoViewerModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 150;
  display: flex;
  overflow: hidden;
  background: rgb(0 0 0 / 86%);
`;

export const ProgressContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0000007a;
`;

export const ProgressText = styled.p`
  color: #ffffff;
  font-size: 1.2rem;
`;
