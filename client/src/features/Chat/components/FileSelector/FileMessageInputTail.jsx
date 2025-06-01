'use strict';

import React from 'react';
import styled from 'styled-components';

const FileMessageInputTailStyled = styled.div`
  position: absolute;
  right: -10px;
  bottom: 0;
  width: 10px;
  display: flex;
`;

const TailSvg = styled.svg`
  width: 100%;
  height: auto;
  align-self: flex-end;
`;

const TailShape = styled.path`
  d: path('M0 0 C0 0 0 14 14 20 L14 24 L0 24 L0 0');
  fill: #1c2030;
  stroke-width: 0px;
`;

export default function FileMessageInputTail() {
  return (
    <FileMessageInputTailStyled>
      <TailSvg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <TailShape
          d="M5 13l4 4L19 7"
          fill="none"
          stroke="green"
          strokeWidth="2"
        />
      </TailSvg>
    </FileMessageInputTailStyled>
  );
}
