import styled, { css, keyframes } from 'styled-components';

export const ProfilePhotoSettingsStyled = styled.div<{
  $isFullScreenMode: boolean;
  $windowWidth: number;
}>`
  ${(props) =>
    props.$isFullScreenMode &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 350;
      display: flex;
      overflow: hidden;
      background-color: rgb(0 0 0 / 90%);
    `}

  ${(props) =>
    !props.$isFullScreenMode
      ? props.$windowWidth < 500
        ? css`
            position: relative;
            width: 100vw;
            height: 100vw;
            border-radius: 10px;
            background-color: var(--bg-secondary);
          `
        : css`
            position: relative;
            width: 27rem;
            height: 27rem;
            border-radius: 10px;
            background-color: var(--bg-secondary);
          `
      : ''}
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
