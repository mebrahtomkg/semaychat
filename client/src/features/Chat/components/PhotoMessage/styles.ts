import styled, { css } from 'styled-components';

export const PhotoMessageStyled = styled.div`
  position: relative;
  max-width: 13rem;
  border-radius: inherit;
  outline-style: solid;
  outline-width: 2px;
  outline-color: inherit;
`;

export const ImageStyled = styled.img`
  max-width: 100%;
  border-radius: inherit;
`;

export const ImagePlaceholder = styled.div`
  max-width: 100%;
  border-radius: inherit;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
`;

export const LoadingProgress = styled.p`
  text-align: center;
`;

export const LoadingError = styled.p`
  text-align: center;
  color: red;
`;

export const ImageMetaContainer = styled.div<{ $isReceived: boolean }>`
  position: absolute;
  ${(props) =>
    props.$isReceived
      ? css`
          right: 0.4rem;
          bottom: 0.3rem;
          padding: 0.4rem 0.6rem;
        `
      : css`
          right: 0.1rem;
          bottom: 0.1rem;
          padding: 0.2rem 0.6rem;
        `}
  display: flex;
  background-color: rgb(0 0 0 / 40%);
  border-radius: 7px;
`;
