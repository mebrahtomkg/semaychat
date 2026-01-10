import { FC } from 'react';
import { RotatingSpinnerIcon, SpinnerStyled } from './styles';

const Spinner: FC = () => {
  return (
    <SpinnerStyled>
      <RotatingSpinnerIcon />
    </SpinnerStyled>
  );
};

export default Spinner;
