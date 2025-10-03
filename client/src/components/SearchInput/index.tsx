import { SearchIcon } from '@/components/icons';
import {
  SearchIconContainer,
  SearchInputContainer,
  SearchInputStyled,
} from './styles';
import { FC, InputEventHandler } from 'react';

interface SearchInputProps {
  placeholder: string;
  onChange: InputEventHandler<HTMLInputElement>;
}

const SearchInput: FC<SearchInputProps> = ({ placeholder, onChange }) => {
  return (
    <SearchInputContainer>
      <SearchIconContainer>
        <SearchIcon />
      </SearchIconContainer>

      <SearchInputStyled placeholder={placeholder} onInput={onChange} />
    </SearchInputContainer>
  );
};

export default SearchInput;
