import styled, { css } from 'styled-components';
import { StyleProps } from '../../../../types';

export const EditorModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 300;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props: StyleProps) => props.theme.backgroundColors?.overlay};
`;

export const EditorModalStyled = styled.div<{ $windowWidth: number }>`
  ${(props) =>
    props.$windowWidth < 500
      ? css`
          width: 100vw;
          padding: 1rem;
          border-radius: 10px;
          border: 1px solid;
        `
      : css`
          width: 27rem;
          padding: 1rem;
          border-radius: 10px;
          border: 1px solid;
          background-color: #314352;
          border-color: #405d76;
        `}

  background-color: ${(props: StyleProps) =>
    props.theme.backgroundColors?.main};

  border-color: ${(props: StyleProps) => props.theme.borderColor};
`;

export const HeaderSection = styled.div`
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid;
  border-color: ${(props: StyleProps) => props.theme.dividerColor};
`;

export const Title = styled.h2`
  margin-right: 1.3rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${(props: StyleProps) => props.theme.textColors?.title};
`;

export const MainSection = styled.div`
  margin-bottom: 1rem;
`;

export const FooterSection = styled.div`
  display: flex;
  justify-content: right;
  border-top: 1px solid;
  border-color: ${(props: StyleProps) => props.theme.dividerColor};
  padding-top: 1rem;
`;

const ActionButton = styled.button`
  display: block;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  border-radius: 5px;
  font-size: 0.94rem;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out;
`;

export const CancelButton = styled(ActionButton)`
  margin-right: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  color: ${(props: StyleProps) => props.theme.backgroundColors?.buttonHover};
  &:hover {
    background-color: ${(props: StyleProps) =>
      props.theme.backgroundColors?.bright};
  }
`;

export const DoneButton = styled(ActionButton)`
  padding-left: 1.7rem;
  padding-right: 1.7rem;
  border-radius: 5px;
  color: #ffffff;

  background-color: ${(props: StyleProps) =>
    props.theme.backgroundColors?.button};

  &:hover {
    background-color: ${(props: StyleProps) =>
      props.theme.backgroundColors?.buttonHover};
  }
`;
