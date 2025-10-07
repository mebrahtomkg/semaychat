import styled, { css } from 'styled-components';

export const ProfileModalOverlay = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--bg-overlay);
  display: flex;
  justify-content: center;
`;

export const ProfileModal = styled.div`
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--bg-main);
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
          background-color: var(--bg-overlay);
        `
      : css`
          --profile-photo-width: 100vw;
          @media (min-width: 425px) {
            --profile-photo-width: 23rem;
          }

          position: relative;
          width: var(--profile-photo-width);
          height: var(--profile-photo-width);
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
