import styled from 'styled-components';
import FlexibleIcon from './FlexibleIcon';

const PauseIconPath = styled.path`
  d: path('M7 4, L7 20, M17 4, L17 20');
  fill: transparent;
  stroke: currentColor;
  stroke-width: 4.5px;
`;

const PauseIcon = () => {
  return (
    <FlexibleIcon>
      <PauseIconPath d="" />
    </FlexibleIcon>
  );
};

export default PauseIcon;
