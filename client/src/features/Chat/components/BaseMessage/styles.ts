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
  $shouldFlexGrow: boolean;
  $isLastInGroup: boolean;
  $isOutgoing: boolean;
  $isTransparentBackground: boolean;
}>`
  max-width: 65%;
  ${(props) =>
    props.$shouldFlexGrow &&
    css`
      flex-grow: 1;
    `}
  border-radius: 15px;
  cursor: pointer;
  color: #fff;

  background-color: ${(props) =>
    props.$isTransparentBackground
      ? 'transparent'
      : `var(--bg-msg-${props.$isOutgoing ? 'sent' : 'received'})`};
`;
