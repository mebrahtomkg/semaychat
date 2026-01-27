import { css } from 'styled-components';

export const lightBackground = css`
  background-color: #ffffff;
  background-image:
    radial-gradient(#c7e4f0 1px, transparent 1px),
    radial-gradient(#f0c1d1 1px, transparent 1px);
  background-size: 20px 20px;
  background-position:
    0 0,
    10px 10px;
  background-attachment: local;
`;

export const darkBackground = css`
  background-color: #000000;
  background-image:
    radial-gradient(#045d85 1px, transparent 1px),
    radial-gradient(#505f01 1px, transparent 1px);
  background-size: 20px 20px;
  background-position:
    0 0,
    10px 10px;
  background-attachment: local;
`;
