import styled from 'styled-components';
import { InputGroup } from '../styles';
import { FC, MouseEventHandler } from 'react';

const ButtonPrimary = styled.input`
  padding: 0.5rem 1.7rem;
  cursor: pointer;
  box-shadow: none;
  outline-style: none;
  border: 1px solid #2f8396;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  color: #b1b1b1;
  background: transparent;
  &:hover {
    border-color: #06e2ff;
  }
`;

interface SubmitButtonProps {
  value: string;
  onClick: () => void;
}

const SubmitButton: FC<SubmitButtonProps> = ({ value, onClick }) => {
  const onClickImpl: MouseEventHandler = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <InputGroup>
      <ButtonPrimary type="submit" value={value} onClick={onClickImpl} />
    </InputGroup>
  );
};

export default SubmitButton;
