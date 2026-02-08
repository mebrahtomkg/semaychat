import { css } from 'styled-components';

export const lightBackground = css`
  background-color: #f8fafc;
  /* Subtle gradient from white top-left to very light slate bottom-right */
  background-image: linear-gradient(to bottom right, #ffffff, #f1f5f9);
  background-attachment: fixed;
`;

export const darkBackground = css`
  background-color: #0f172a;
  background-image: linear-gradient(to bottom right, #0f172a, #1e1b4b);
  background-attachment: fixed;
`;
