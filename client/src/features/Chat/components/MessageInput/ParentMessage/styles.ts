import styled from 'styled-components';

export const ParentMessageStyled = styled.div`
  padding: 0.5rem;
  margin-bottom: -3rem;
  padding-bottom: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: var(--bg-primary);
  border-radius: 10px;
`;

export const MessageDetailsContainer = styled.div`
  position: relative;
  flex-grow: 1;
  border-left: 5px solid;
  border-color: var(--bg-action);
  height: 3.5rem;
`;

// Position absolute(instead of just flex box) is used to solve a strong issue.
// The issue is that message content is overflowing the screen if the content is huge.
// Though this could be solved by setting overflow:hidden at the hightes parent, it caused
// other unsolvable issue in that parent
export const MessageDetails = styled.div`
  position: absolute;
  top: 0.3rem;
  left: 0.5rem;
  right: 0;
  display: flex;
  align-items: center;
`;

export const TextualDetails = styled.div`
  overflow: hidden;
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
