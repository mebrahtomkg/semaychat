import styled, { css } from 'styled-components';

export const ParentMessageStyled = styled.div<{
  $isParentOfOutgoingMessage: boolean;
}>`
  margin: 0.5rem 0.5rem 0 0.5rem;
  padding: 0.2rem 0.5rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  border-left: 3px solid;
  border-color: var(--bg-action-hover);
  border-radius: 5px;

  ${(props) =>
    props.$isParentOfOutgoingMessage
      ? css`
          background-color: var(--bg-msg-sent-parent);
        `
      : css`
          background-color: var(--bg-msg-received-parent);
        `}
`;

export const MessageSender = styled.h3<{
  $isParentOfOutgoingMessage: boolean;
}>`
  margin-bottom: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.3;

  ${(props) =>
    props.$isParentOfOutgoingMessage
      ? css`
          color: var(--fg-msg-sent-parent-sender);
        `
      : css`
          color: var(--fg-msg-received-parent-sender);
        `}
`;

export const MessageContent = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
  font-size: 1rem;
  font-weight: 500;
  color: inherit;
`;

export const MessageTypeIndicator = styled.p<{
  $isParentOfOutgoingMessage: boolean;
}>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
  font-size: 1rem;
  font-weight: 500;

  ${(props) =>
    props.$isParentOfOutgoingMessage
      ? css`
          color: var(--fg-msg-sent-parent-type);
        `
      : css`
          color: var(--fg-msg-received-parent-type);
        `}
`;
