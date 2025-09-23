import styled from 'styled-components';
import { CenteredModal } from '@/styles';

export const PhotoUploaderModal = styled(CenteredModal)``;

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

export const CropOverlayMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  border: 10px solid;
  border-radius: 50%;
  outline-style: solid;
  outline-width: 10000px;
  outline-color: ${(props) => props.theme.cropOverlayMask.outlineColor};
  border-color: ${(props) => props.theme.cropOverlayMask.outlineColor};
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
