import styled from 'styled-components';

export const ParentMessageStyled = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 10rem;
  padding: 0.7rem;
  display: flex;
  justify-content: space-between;
  background-color: var(--bg-primary);
`;

export const MessageDetails = styled.div`
  overflow: hidden;
  border-left: 5px solid;
  border-color: var(--bg-action);
  height: 3.5rem;
  padding-left: 0.5rem;
`;

export const MessageSender = styled.h3`
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.1rem;
  font-weight: 600;
  color: #05bce7;
`;

export const MessageContent = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
  font-weight: 500;
  color: var(--fg-primary);
`;
