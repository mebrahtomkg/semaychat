import styled from 'styled-components';

export const PhotoUploaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000082;
`;

export const PhotoUploaderStyled = styled.div`
  padding: 1rem;
  border-radius: 15px;
  border: 1px solid;
  background-color: var(--bg-primary);
  border-color: var(--fg-border);
`;

export const ModalHeader = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
`;

export const CroppingViewport = styled.div`
  position: relative;
  margin: 1rem;
  width: calc(100vw - 6rem);
  max-width: 400px;
  height: calc(100vw - 6rem);
  max-height: 400px;
  overflow: hidden;
  border-radius: 5px;
  border: 1px solid;
  background-color: inherit;
  border-color: inherit;
`;

export const CropOverlayMaskContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  background-color: transparent;
  color: rgb(255 255 255 / 20%);
  user-select: none;
`;

export const CropOverlayMaskHole = styled.div`
  position: absolute;
  inset: 0.5rem;
  z-index: 15;
  border-radius: 50%;
  background-color: transparent;
  user-select: none;
  cursor: move;
`;

export const PositionableImage = styled.img`
  position: absolute;
  width: 100%;
  user-select: none;
  pointer-events: none;
`;

export const LoadingTextContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  display: flex;
  background-color: inherit;
`;

export const LoadingText = styled.p`
  margin: auto;
`;

export const ModalFooter = styled.div`
  padding: 0 2rem;
  display: flex;
`;
