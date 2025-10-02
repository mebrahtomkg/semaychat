import styled from 'styled-components';

const SearchInputStyled = styled.input`
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

const SearchInput = () => {
  return <SearchInputStyled placeholder="Search contact" />;
};

export default SearchInput;
