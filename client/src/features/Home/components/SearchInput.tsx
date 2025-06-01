import styled from 'styled-components';

const SearchInputStyled = styled.input`
  display: block;
  width: calc(100% - 2.7rem);
  font-size: 1rem;
  background-color: inherit;
  color: white;

  &:focus {
    border: none;
    outline: none;
  }

  &::placeholder {
    color: #929292;
  }
`;

const SearchInput = () => <SearchInputStyled placeholder="Search people" />;

export default SearchInput;
