import styled from 'styled-components';

export const InputLabel = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: #b1b1b1;
`;

export const InputField = styled.input`
  width: 300px;
  padding: 0.4rem 0.6rem;
  outline-style: none;
  box-shadow: none;
  border: 1px solid #2f8396;
  border-radius: 0;
  font-size: 1.1rem;
  font-weight: 400;
  color: #c2c2c2;
  background-color: transparent;
  caret-color: #03ffe7;
  &:focus {
    border-color: #1fb5d6;
  }
`;

export const InputError = styled.p`
  margin-left: 3px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #b93917;
`;
