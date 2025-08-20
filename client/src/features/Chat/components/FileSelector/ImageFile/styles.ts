import styled from 'styled-components';

export const ImageFileStyled = styled.div`
  position: relative;
  margin: 0.2rem;
  border: 2px solid #43136d;
  border-radius: 6px;
  min-width: 10rem;
  min-height: 10rem;
`;

export const ImageStyled = styled.img`
  max-width: 18rem;
  max-height: 18rem;
  cursor: pointer;
`;

export const CaptionInput = styled.input`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: block;
  padding: 0.1rem 0.4rem;
  line-height: 1;
  font-size: 1rem;
  background-color: #16244fb0;
  color: #ffffff;
  &::placeholder {
    color: rgb(198, 208, 216);
  }
`;

export const ProgressTextContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background-color: #00000080;
`;

export const ProgressText = styled.p`
  margin: auto;
  font-size: 1rem;
  color: #e4e4e4;
`;
