import { Link } from 'react-router';
import styled from 'styled-components';

export const ChatItemStyled = styled(Link)`
  margin: 0 0.2rem;
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: var(--bg-hover);
  }
`;

export const ProfilePhotoContainer = styled.div`
  --profile-photo-width: 3.8rem;
  width: var(--profile-photo-width);
  min-width: var(--profile-photo-width);
  height: var(--profile-photo-width);
  margin-right: 0.7rem;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PhotoImg = styled.img`
  width: 100%;
`;

export const ChatItemInfoContainer = styled.div`
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
  overflow: hidden;
  display: flex;
  justify-content: space-between;
`;

export const MessagePreview = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
  font-weight: 500;
  color: var(--fg-muted);
`;

export const UnseenMessagesCount = styled.div`
  padding: 0.2rem;
  --new-msg-count-width: 1.4rem;
  width: var(--new-msg-count-width);
  height: var(--new-msg-count-width);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: var(--bg-action);
  border-radius: 50%;
`;
