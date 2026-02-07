import styled, { css, keyframes } from 'styled-components';

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
          color: #fff;
        `
      : css`
          position: relative;
          width: var(--big-modal-width);
          height: var(--big-modal-width);
          color: #fff;
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

export const FetchingProgress = styled.div`
  position: absolute;
  z-index: 1;
  top: calc(50% - 1.5rem);
  left: calc(50% - 1.5rem);
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0000007a;
`;

const animate = keyframes`${css`
  0% {
    transform: scale(0.7);
  }

  50% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.7);
  }
`}
`;

export const ProgressSpinner = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-color: #fff;
  border-radius: 50%;
  animation-iteration-count: infinite;
  animation-duration: 1.5s;
  animation-delay: 0s;
  animation-timing-function: ease-in-out;
  animation-name: ${animate};
`;
