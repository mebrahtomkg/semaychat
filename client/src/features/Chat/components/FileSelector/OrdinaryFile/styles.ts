import styled from 'styled-components';

export const OrdinaryFileStyled = styled.div`
  position: relative;
  width: 12rem;
  height: 12rem;
  margin-left: 0.5rem;
  border: 2px solid #43136d;
  border-radius: 5px;
  background: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const IconWrapper = styled.div`
  cursor: pointer;
  width: 3rem;
  height: 3rem;
`;

export const FileName = styled.p`
  padding: 0 1rem;
  text-align: center;
  font-size: 1rem;
  word-break: break-all;
`;
