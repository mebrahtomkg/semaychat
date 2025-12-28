import styled, { css, keyframes } from 'styled-components';

export const ProfilePhotoSettingsStyled = styled.div<{
  $isFullScreenMode: boolean;
}>`
  ${(props) =>
    props.$isFullScreenMode
      ? css`
          position: fixed;
          inset: 0;
          display: flex;
          overflow: hidden;
          background-color: rgb(0 0 0 / 90%);
          color: #fff;
        `
      : css`
          --profile-photo-modal-width: calc(var(--big-modal-width) - 2rem);
          position: relative;
          width: var(--profile-photo-modal-width);
          height: var(--profile-photo-modal-width);
          border-radius: 10px;
          background-color: var(--bg-secondary);
          color: #fff;
        `}
`;

export const NameInitialContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: inherit;
  background: var(--bg-avatar-0);
`;

export const NameInitial = styled.span`
  line-height: 1;
  font-size: 9rem;
  font-weight: 500;
  color: #fff;
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
