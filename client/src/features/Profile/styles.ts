import styled, { css } from 'styled-components';

export const ProfileModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 300;
  background-color: #0000008f;
  display: flex;
  justify-content: center;
`;

export const ProfileModal = styled.div`
  padding: 1rem;
  border-radius: 10px;
  margin-top: 5vh;
  height: 90vh;
  background-color: #232328;
`;

export const ProfilePhotoStyled = styled.div<{
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
      background: rgb(0 0 0 / 86%);
    `}

  ${(props) =>
    !props.$isFullScreenMode
      ? props.$windowWidth < 500
        ? css`
            position: relative;
            width: 100vw;
            height: 100vw;
            border-radius: 10px;
          `
        : css`
            position: relative;
            width: 27rem;
            height: 27rem;
            border-radius: 10px;
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
