

import styled from 'styled-components';
import FlexibleIcon from './FlexibleIcon';

const PlayIconPath = styled.path`
  d: path('M5 2, L5 23, L23 12, L5 2');
  fill: currentColor;
  stroke: aliceblue;
  stroke-width: 0px;
`;

const PlayIcon = () => {
  return (
    <FlexibleIcon>
      <PlayIconPath d="" />
    </FlexibleIcon>
  );
};

export default PlayIcon;
