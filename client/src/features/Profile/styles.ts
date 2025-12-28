import styled, { css } from 'styled-components';

export const ProfileModal = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--big-modal-width);
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--bg-primary);
`;

export const ProfilePhotoStyled = styled.div<{
  $isFullScreenMode: boolean;
}>`
  ${(props) =>
    props.$isFullScreenMode
      ? css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          background-color: #000000c2;
        `
      : css`
          position: relative;
          width: var(--big-modal-width);
          height: var(--big-modal-width);
        `}
`;

export const Name = styled.h3`
  position: absolute;
  left: 0.8rem;
  bottom: 0.8rem;
  font-size: 1.8rem;
  font-weight: 400;
  color: #ffffff;
`;
