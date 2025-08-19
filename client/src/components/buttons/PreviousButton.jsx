
import styled from 'styled-components';
import { PreviousIcon } from '../icons';
import { PhotoNavButton } from '../../styles';

const PreviousButtonStyled = styled(PhotoNavButton)`
  left: 0;
`;

const PreviousButton = ({ onClick, ...otherProps }) => {
  return (
    <PreviousButtonStyled
      aria-label="Previous photo"
      data-is-photo-nav-target="true"
      onClick={onClick}
      {...otherProps}
    >
      <PreviousIcon />
    </PreviousButtonStyled>
  );
};

export default PreviousButton;
