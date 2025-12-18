import { Link } from 'react-router';
import styled from 'styled-components';

export const ChatItemStyled = styled(Link)`
  margin: 0 0.2rem;
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  color: var(--fg-primary);

  &:hover {
    background-color: var(--bg-hover);
  }
`;

export const ChatItemInfoContainer = styled.div`
  position: relative;
  margin-left: 0.6rem;
  flex-grow: 3;
  overflow: hidden;
`;

export const NameContainer = styled.div`
  margin-bottom: 0.3rem;
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
  --msg-count-min-size: 1.7rem;
  display: flex;
`;

export const UnseenMessagesCount = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 0.4rem;
  aspect-ratio: 1/1;
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

// we just wanna the width placeholder. since UnseenMessagesCount is positioned absolute
export const HiddenUnseenMessagesCount = styled.div`
  visibility: hidden;
  min-width: var(--msg-count-min-size);
  background-color: aqua;
`;
