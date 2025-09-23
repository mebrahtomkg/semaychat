import { AddPhotoIcon } from '@/components/icons';
import styled from 'styled-components';

const AddPhotoButtonStyled = styled.button`
  position: absolute;
  right: 2rem;
  bottom: -1.7rem;
  width: 3.13rem;
  height: 3.13rem;
  padding: 0.8rem;
  border-radius: 50%;
  color: white;
  box-shadow: 3px 3px 14px #000000c4;
  transition: background-color 0.2s ease-in-out;
  background-color: var(--bg-button);
  &:hover {
    background-color: var(--bg-button-hover);
  }
`;

const AddPhotoButton = ({ onClick, ...restProps }) => {
  return (
    <AddPhotoButtonStyled type="button" onClick={onClick} {...restProps}>
      <AddPhotoIcon />
    </AddPhotoButtonStyled>
  );
};

export default AddPhotoButton;
