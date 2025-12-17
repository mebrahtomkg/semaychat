import styled from 'styled-components';

export const ParentMessageStyled = styled.div`
  margin: 0.5rem 0.5rem 0 0.5rem;
  padding: 0.2rem 0.5rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  border-left: 3px solid;
  border-color: var(--bg-action);
  border-radius: 5px;
  background-color: var(--bg-msg-parent);
`;

export const MessageSender = styled.h3`
  margin-bottom: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--fg-msg-parent-sender);
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

export const MessageTypeIndicator = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
  font-size: 1rem;
  font-weight: 500;
  color: var(--fg-msg-parent-sender);
`;
