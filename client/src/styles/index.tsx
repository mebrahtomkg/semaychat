import styled, { css } from 'styled-components';
import { StyleProps } from '../types';

/**
 * This export is not used. It is here to allow react-fast-refresh
 * and styled components to reflect latest changes of exported styles in development.
 * Without default export in here: eg ```const BestBtn = styled(GoodBtn)``;``` doens't
 * get latest GoodBtn styles during development if the GoodBtn were exported from here.
 */
export default 'nothing';

export { default as GlobalStyle } from './GlobalStyle';

export const FullScreenOverlay = styled.div<{ $zIndex: number }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  ${({ $zIndex = 5 }) => css`
    z-index: ${$zIndex};
  `}
  display: flex;
  background-color: rgb(0 0 0 / 66%);
`;

export const CenteredModal = styled.div`
  margin: auto;
  padding: 1rem;
  border-radius: 15px;
  border: 1px solid;
  ${(props: StyleProps) => css`
    background-color: ${props.theme.backgroundColors?.main};
    border-color: ${props.theme.backgroundColors?.bright};
  `}
`;

export const NormalButton = styled.button``;

export const BasicButton = styled.button`
  padding: 0.4rem 1.7rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
`;

export const PrimaryButton = styled(BasicButton)`
  ${({ theme }: StyleProps) => css`
    color: #fff;
    background-color: ${theme.backgroundColors?.button};
    &:hover {
      background-color: ${theme.backgroundColors?.buttonHover};
    }
  `}
`;

export const DisabledPrimaryButton = styled(BasicButton)`
  ${({ theme }) => css`
    color: ${theme.disabledPrimaryButton.color};
    background-color: ${theme.disabledPrimaryButton.backgroundColor};
  `}
  cursor: not-allowed;
`;

export const IconButton = styled.button`
  width: 2rem;
  height: 2rem;
  padding: 0.5rem;
  ${({ theme }) => css`
    color: ${theme.iconColor};
  `}
`;

export const ModalTitle = styled.h1`
  margin-left: 1rem;
  font-size: 1.4rem;
`;

export const PhotoHeaderSection = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0;
  right: 0.5rem;
  z-index: 5;
  display: flex;
  justify-content: space-between;
`;

export const PhotoIndexIndicator = styled.span`
  align-self: center;
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
`;

export const PhotoMetaContainer = styled.div`
  position: absolute;
  left: 0.5rem;
  right: 0;
  bottom: 0.5rem;
`;

export const PhotoMetaText = styled.p`
  margin-bottom: 0.4rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: #dddddd;
`;

export const PhotoNavButton = styled.button`
  position: absolute;
  top: calc(50% - 1.5rem);
  width: 3rem;
  height: 3rem;
  padding: 0.4rem;
  color: #ffffff96;
  &:hover {
    color: #ffffffff;
  }
`;

export const CenteredImage = styled.img`
  margin: auto;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
