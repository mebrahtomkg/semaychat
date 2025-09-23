import styled from 'styled-components';

export const Counter = styled.p`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  line-height: 1.7;
  font-weight: 500;
  color: #bdbdbd;
`;

export const MultiLineInputContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 1rem;
`;

export const MultiLineInput = styled.textarea`
  width: 100%;
  padding: 1.2rem 0 0.5rem 0;
  margin-bottom: 0.7rem;
  box-shadow: none;
  outline-style: none;
  border: none;
  border-bottom: 1px solid #43829f;
  border-radius: 0;
  font-size: 1rem;
  font-weight: 500;
  color: #cfd3d4;
  background: transparent;
  &::placeholder {
    color: #6e6f74;
    font-family: system-ui, sans-serif;
    font-size: 1rem;
    font-weight: 500;
    font-weight: 500;
  }
  &:focus {
    border-color: #04c1ff;
  }

  margin-bottom: 0;
  margin-right: 0.5rem;
  overflow: hidden;
  overflow-wrap: break-word;
  line-height: 1.7;
  resize: none;
`;
