

import styled from 'styled-components';
import FlexibleIcon from './FlexibleIcon';

const TickIconPath = styled.path`
  d: path('M5 13, l4 4, L19 7');
  fill: transparent;
  stroke: currentColor;
  stroke-width: 2.5px;
  stroke-linecap: round;
`;

const TickIcon = () => {
  return (
    <FlexibleIcon>
      <TickIconPath d="" />
    </FlexibleIcon>
  );
};

export default TickIcon;
