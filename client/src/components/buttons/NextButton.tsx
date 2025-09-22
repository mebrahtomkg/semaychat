import styled from 'styled-components';
import { NextIcon } from '../icons';
import { PhotoNavButton } from '../../styles';
import { FC, MouseEventHandler } from 'react';

const NextButtonStyled = styled(PhotoNavButton)`
  right: 0;
`;

interface NextButtonProps {
  onClick: MouseEventHandler;
}

const NextButton: FC<NextButtonProps> = ({ onClick, ...otherProps }) => {
  return (
    <NextButtonStyled
      aria-label="Next photo"
      data-is-photo-nav-target="true"
      onClick={onClick}
      {...otherProps}
    >
      <NextIcon />
    </NextButtonStyled>
  );
};

export default NextButton;
