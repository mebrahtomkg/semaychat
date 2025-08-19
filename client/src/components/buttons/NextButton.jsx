
import styled from 'styled-components';
import { NextIcon } from '../icons';
import { PhotoNavButton } from '../../styles';

const NextButtonStyled = styled(PhotoNavButton)`
  right: 0;
`;

const NextButton = ({ onClick, ...otherProps }) => {
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
