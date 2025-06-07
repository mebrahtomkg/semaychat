import styled from 'styled-components';
import { StyleProps } from '../../types';

export const ContextMenuOverlay = styled.div`
  position: fixed;
  z-index: 500;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  cursor: default;
`;

export const ContextMenuStyled = styled.ul`
  position: fixed;
  min-width: 200px;
  padding: 0;
  border-radius: 7px;
  background-color: ${(props: StyleProps) =>
    props.theme.backgroundColors?.main};
`;
