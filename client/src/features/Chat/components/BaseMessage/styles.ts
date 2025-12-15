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
  border-radius: 20px;
  cursor: pointer;

  ${(props) =>
    props.$isOutgoing
      ? css`
          border-bottom-right-radius: 0px;
          border-color: var(--bg-msg-sent);
          color: var(--fg-msg-sent);
        `
      : css`
          border-bottom-left-radius: 0px;
          border-color: var(--bg-msg-received);
          color: var(--fg-msg-received);
        `}

  background-color: ${(props) =>
    props.$isTransparentBackground
      ? 'transparent'
      : `var(--bg-msg-${props.$isOutgoing ? 'sent' : 'received'})`};
`;

export const MessageIntersectionObserverTarget = styled.div`
  width: 100%;
  height: 1px;
  background-color: transparent;
`;
