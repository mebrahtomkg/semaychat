import styled from 'styled-components';

export const PhotoMessageStyled = styled.div`
  position: relative;
  max-width: 13rem;
  border-color: inherit;
`;

export const PhotoImg = styled.img`
  min-height: 7rem;
  max-width: 100%;
  border: 2px solid;
  border-color: inherit;
  border-radius: 13px;
`;

export const PhotoMetaContainer = styled.div`
  position: absolute;
  right: 0.1rem;
  bottom: 0.1rem;
  padding: 0.2rem 0.6rem;
  display: flex;
  background: rgb(0 0 0 / 52%);
  border-radius: 7px;
`;
