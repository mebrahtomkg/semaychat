import { SearchIcon } from '@/components/icons';
import {
  SearchIconContainer,
  SearchInputContainer,
  SearchInputStyled,
} from './styles';
import { FC } from 'react';

interface SearchInputProps {
  placeholder: string;
}

const SearchInput: FC<SearchInputProps> = ({ placeholder }) => {
  return (
    <SearchInputContainer>
      <SearchIconContainer>
        <SearchIcon />
      </SearchIconContainer>

      <SearchInputStyled placeholder={placeholder} />
    </SearchInputContainer>
  );
};

export default SearchInput;
