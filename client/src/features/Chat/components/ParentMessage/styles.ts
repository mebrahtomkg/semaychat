import styled from 'styled-components';

export const ParentMessageStyled = styled.div`
  margin: 0.5rem;
  padding: 0.3rem 0.5rem;
  overflow: hidden;
  border-left: 4px solid;
  border-color: var(--bg-action);
  border-radius: 10px;
  background-color: var(--bg-msg-parent);
`;

export const MessageSender = styled.h3`
  margin-bottom: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
  font-weight: 600;
  color: var(--fg-msg-parent-sender);
`;

export const MessageContent = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
  font-weight: 500;
  color: inherit;
`;
