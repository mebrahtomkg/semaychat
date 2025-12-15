import styled from 'styled-components';

export const PhotoMessageStyled = styled.div`
  position: relative;
  max-width: 13rem;
  border: 2px solid;
  border-radius: inherit;
  border-color: inherit;
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

export const ImageMetaContainer = styled.div`
  position: absolute;
  right: 0.1rem;
  bottom: 0.1rem;
  padding: 0.2rem 0.6rem;
  display: flex;
  background: rgb(0 0 0 / 52%);
  border-radius: 7px;
`;
