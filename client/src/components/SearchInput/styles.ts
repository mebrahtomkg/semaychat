import styled from 'styled-components';

export const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 25px;
  background-color: var(--bg-text-input);
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
  color: var(--fg-main);

  &:focus {
    border: none;
    outline: none;
  }

  &::placeholder {
    color: var(--fg-placeholder);
  }
`;
