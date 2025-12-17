import { MessageType } from '@/types';
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
  $messageType: MessageType;
}>`
  max-width: 65%;
  border-radius: 20px;
  ${({ $messageType }) =>
    ($messageType === 'audio' || $messageType === 'file') &&
    css`
      flex-grow: 1;
    `}

  ${({ $messageType }) =>
    $messageType !== 'audio' &&
    $messageType !== 'file' &&
    css`
      cursor: pointer;
    `}

  ${(props) =>
    props.$isOutgoing
      ? css`
          border-bottom-right-radius: 0px;
          outline-color: var(--bg-msg-sent);
          color: var(--fg-msg-sent);
        `
      : css`
          border-bottom-left-radius: 0px;
          outline-color: var(--bg-msg-received);
          color: var(--fg-msg-received);
        `}

  ${({ $messageType, $isOutgoing }) =>
    $messageType === 'photo' || $messageType === 'video'
      ? css`
          background-color: transparent;
        `
      : $isOutgoing
        ? css`
            background-color: var(--bg-msg-sent);
          `
        : css`
            background-color: var(--bg-msg-received);
          `}
`;

export const MessageIntersectionObserverTarget = styled.div`
  width: 100%;
  height: 1px;
  background-color: transparent;
`;
