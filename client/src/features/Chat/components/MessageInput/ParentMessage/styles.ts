import styled from 'styled-components';

export const ParentMessageStyled = styled.div`
  padding: 0.5rem;
  margin-bottom: -3rem;
  padding-bottom: 3.5rem;
  display: flex;
  justify-content: space-between;
  background-color: var(--bg-primary);
  border-radius: 10px;
`;

export const MessageDetails = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  border-left: 5px solid;
  border-color: var(--bg-action);
  height: 3.5rem;
  padding-left: 0.5rem;
`;

export const MessageSender = styled.h3`
  margin-bottom: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--fg-action);
`;

export const MessageContent = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
  font-weight: 500;
  color: var(--fg-primary);
`;

export const MessageTypeIndicator = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
  font-weight: 500;
  color: var(--fg-muted);
`;
