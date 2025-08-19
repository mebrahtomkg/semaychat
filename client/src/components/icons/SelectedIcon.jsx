

import React from 'react';
import styled from 'styled-components';
import FlexibleIcon from './FlexibleIcon';

const SelectedIconPath = styled.path`
  d: path('M3 11, L9 18, L22 5');
  fill: transparent;
  stroke: #e3e3e3;
  stroke-width: 4px;
  stroke-linecap: round;
`;

const SelectedIcon = () => {
  return (
    <FlexibleIcon>
      <SelectedIconPath d="" />
    </FlexibleIcon>
  );
};

export default SelectedIcon;
