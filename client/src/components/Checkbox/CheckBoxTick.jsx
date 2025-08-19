

import styled from 'styled-components';

const CheckBoxTickSvg = styled.svg`
  width: 100%;
  height: auto;
  border-radius: 1px;
  background: #0372ae;
`;

const TickPath = styled.path`
  stroke: #ffffff;
  stroke-width: 2.6px;
  stroke-linecap: round;
`;

export default function CheckBoxTick() {
  return (
    <CheckBoxTickSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <TickPath d="M5 13l4 4L19 7" fill="none" stroke="green" strokeWidth="2" />
    </CheckBoxTickSvg>
  );
}
