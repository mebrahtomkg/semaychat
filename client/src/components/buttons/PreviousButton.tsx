import styled from 'styled-components';
import { PreviousIcon } from '../icons';
import { PhotoNavButton } from '../../styles';
import { FC, MouseEventHandler } from 'react';

const PreviousButtonStyled = styled(PhotoNavButton)`
  left: 0;
`;

interface PreviousButtonProps {
  onClick: MouseEventHandler;
}

const PreviousButton: FC<PreviousButtonProps> = ({
  onClick,
  ...otherProps
}) => {
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
