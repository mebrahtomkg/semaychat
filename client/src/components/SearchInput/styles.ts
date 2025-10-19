import styled from 'styled-components';

export const SearchInputContainer = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  border-radius: 15px;
  background-color: var(--bg-primary);
`;

export const SearchIconContainer = styled.div`
  width: 2rem;
  height: 2rem;
  padding: 0.5rem;
  color: var(--fg-muted);
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
    color: var(--fg-muted);
  }
`;
