import { Link } from 'react-router';
import styled from 'styled-components';

export const ChatItemStyled = styled(Link)`
  margin: 0 0.2rem;
  padding: 0rem 0.5rem;
  display: flex;
  align-items: center;
  border-radius: 7px;
  cursor: pointer;
  color: var(--fg-primary);

  &:hover {
    background-color: var(--bg-hover);
  }
`;

export const ChatItemInfoContainer = styled.div`
  position: relative;
  height: 5.1rem;
  margin-left: 0.6rem;
  flex-grow: 3;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid;
  border-color: var(--bg-hover);
`;

export const NameContainer = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
`;

export const Name = styled.h3`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
  font-size: 1rem;
  font-weight: 500;
`;

export const ChatItemDateTime = styled.p`
  white-space: nowrap;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--fg-muted);
`;

export const MessagePreviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UnseenMessagesCount = styled.div`
  --msg-count-min-size: 1.7rem;
  padding: 0.3rem;
  border-radius: 50%;
  min-width: var(--msg-count-min-size);
  min-height: var(--msg-count-min-size);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 500;
  color: #fff;
  background-color: var(--bg-unseen-msg-count);
`;

export const MessageStatusContainer = styled.div``;

export const TickIconContainer = styled.div`
  width: 1.05rem;
  transform: rotate(-45deg);
  color: var(--fg-muted);
`;

export const ClockIconContainer = styled.div`
  width: 0.9rem;
  color: var(--fg-muted);
`;
