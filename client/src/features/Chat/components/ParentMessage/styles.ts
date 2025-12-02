import styled from 'styled-components';

export const ParentMessageStyled = styled.div`
  margin: 0.6rem 0.6rem 0 0.6rem;
  padding: 0.3rem;
  overflow: hidden;
  border-left: 4px solid;
  border-color: var(--bg-action);
  border-radius: 5px;
  background-color: #551291;
`;

export const MessageSender = styled.h3`
  margin-bottom: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
  font-weight: 600;
  color: #0fc5f0;
`;

export const MessageContent = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
  font-weight: 500;
  color: var(--fg-primary);
`;
