import styled from 'styled-components';

export const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 25px;
  background-color: #29343e;
`;

export const SearchIconContainer = styled.div`
  width: 2rem;
  height: 2rem;
  padding: 0.5rem;
  color: var(--fg-placeholder);
`;

export const SearchInputStyled = styled.input`
  display: block;
  flex-grow: 3;
  font-size: 1rem;
  background-color: inherit;

  &:focus {
    border: none;
    outline: none;
  }

  &::placeholder {
    color: var(--fg-placeholder);
  }
`;
