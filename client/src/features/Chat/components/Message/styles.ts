import { StyleProps } from '@/types';
import styled, { css } from 'styled-components';

export const MessageStyled = styled.div<{
  $isLastInGroup: boolean;
  $isOutgoing: boolean;
}>`
  display: flex;
  ${(props) =>
    props.$isOutgoing
      ? css`
          justify-content: right;
          flex-direction: row-reverse;
        `
      : css`
          justify-content: left;
        `}

  ${(props) =>
    props.$isLastInGroup
      ? css`
          margin-bottom: 0.6rem;
        `
      : css`
          margin-bottom: 0.2rem;
        `}
`;

export const MessageContainer = styled.div<{
  $isLastInGroup: boolean;
  $isOutgoing: boolean;
  $isTransparentBackground: boolean;
}>`
  max-width: 65%;
  border-radius: 15px;
  cursor: pointer;

  color: ${(props: StyleProps) =>
    props.theme.message[`${props.$isOutgoing ? 'sent' : 'received'}`].color};

  background-color: ${(props: StyleProps) =>
    props.$isTransparentBackground
      ? 'transparent'
      : props.theme.message[`${props.$isOutgoing ? 'sent' : 'received'}`]
          .backgroundColor};
`;
