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
  background-color: #0f172a;
  background-image: linear-gradient(to bottom right, #0f172a, #1e1b4b);
  background-attachment: fixed;
`;
