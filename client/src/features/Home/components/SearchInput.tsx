import styled from 'styled-components';

const SearchInputStyled = styled.input`
  display: block;
  width: calc(100% - 2.7rem);
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

const SearchInput = () => <SearchInputStyled placeholder="Search people" />;

export default SearchInput;
