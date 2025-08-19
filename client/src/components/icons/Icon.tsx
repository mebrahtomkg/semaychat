import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const IconStyled = styled.svg`
  color: inherit;
  background: transparent;
  fill: transparent;
`;

const Square24Path = styled.path`
  d: path(
    'M0 0, L24 0, M0 1, L24 1, M0 2, L24 2, M0 3, L24 3, M0 4, L24 4, M0 5, L24 5, M0 6, L24 6, M0 7, L24 7, M0 8, L24 8, M0 9, L24 9, M0 10, L24 10, M0 11, L24 11, M0 12, L24 12, M0 13, L24 13, M0 14, L24 14, M0 15, L24 15, M0 16, L24 16, M0 17, L24 17, M0 18, L24 18, M0 19, L24 19, M0 20, L24 20, M0 21, L24 21, M0 22, L24 22, M0 23, L24 23, M0 24, L24 24, M0 0, L0 24, M1 0, L1 24, M2 0, L2 24, M3 0, L3 24, M4 0, L4 24, M5 0, L5 24, M6 0, L6 24, M7 0, L7 24, M8 0, L8 24, M9 0, L9 24, M10 0, L10 24, M11 0, L11 24, M12 0, L12 24, M13 0, L13 24, M14 0, L14 24, M15 0, L15 24, M16 0, L16 24, M17 0, L17 24, M18 0, L18 24, M19 0, L19 24, M20 0, L20 24, M21 0, L21 24, M22 0, L22 24, M23 0, L23 24, M24 0, L24 24'
  );
  fill: transparent;
  stroke: #c02b0e;
  stroke-width: 0.2px;
  display: none;

  /* To show this element if svg design mode is toggled in dev tools */
  .svg-design-mode & {
    display: block;
  }
`;

interface IconProps {
  children: ReactNode;
  isDesigning?: boolean;
  className?: string;
  viewBox?: string;
  width?: number;
  height?: number;
}

// To open svg designe mode: set isDesigning prop to true.
// To see live changes: check/uncheck the .svg-design-mode class from class list of the
// svg element in browser dev tools.
const Icon: FC<IconProps> = ({
  children,
  isDesigning = false,
  className = '',
  viewBox = '0 0 24 24',
  width = 24,
  height = 24
}) => {
  return (
    <IconStyled
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={height}
      className={isDesigning ? `${className} svg-design-mode` : className}
    >
      {isDesigning && <Square24Path />}
      {children}
    </IconStyled>
  );
};

export default Icon;
