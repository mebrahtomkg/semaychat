import { SearchIcon } from '@/components/icons';
import styled from 'styled-components';

const SearchButtonStyled = styled.button`
  width: 2.7rem;
  height: 2.7rem;
  padding: 0.8rem;
  color: var(--fg-icon);
`;

const SearchButton = () => {
  return (
    <SearchButtonStyled>
      <SearchIcon />
    </SearchButtonStyled>
  );
};

export default SearchButton;
