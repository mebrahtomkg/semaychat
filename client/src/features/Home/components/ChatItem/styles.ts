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
  width: 3.8rem;
  height: 3.8rem;
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
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
`;

export const NameContainer = styled.div`
  max-width: 8rem;
`;

export const Name = styled.h3`
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
  font-weight: 500;
`;

export const MessagePreview = styled.p`
  margin-right: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
  font-weight: 500;
  color: var(--fg-description);
`;

export const ChatItemStatusContainer = styled.div``;

export const ChatItemDateTime = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--fg-description);
`;

export const ChatItemStatus = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--fg-description);
`;
