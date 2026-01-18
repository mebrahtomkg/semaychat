import styled from 'styled-components';
import { FC, MouseEventHandler } from 'react';
import { BackIcon } from '@/components/icons';

const BackButtonStyled = styled.button`
  margin-right: 1rem;
  height: 2.9rem;
  padding: 0rem 1rem;
  display: flex;
  align-items: center;
  box-shadow: none;
  border-radius: 7px;
  color: #04b1ff;
  background-color: transparent;

  &:hover {
    background-color: #141a29;
  }
`;

const BackIconWrapper = styled.div`
  width: 0.95rem;
  aspect-ratio: 1/1;
  margin-right: 0.4rem;
  margin-top: 0.3rem;
`;

const ButtonText = styled.span`
  display: block;
  line-height: 1;
  font-size: 1.1rem;
  font-weight: 500;
`;

interface BackButtonProps {
  onClick: MouseEventHandler;
}

const BackButton: FC<BackButtonProps> = ({ onClick }) => {
  return (
    <BackButtonStyled type="button" onClick={onClick}>
      <BackIconWrapper>
        <BackIcon />
      </BackIconWrapper>

      <ButtonText>Back</ButtonText>
    </BackButtonStyled>
  );
};

export default BackButton;
