import { StyleProps } from '@/types';
import { Link } from 'react-router';
import styled from 'styled-components';

export const UserStyled = styled(Link)`
  margin: 0 0.2rem;
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${(props: StyleProps) =>
      props.theme.backgroundColors.hover};
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

export const Photo = styled.img`
  width: 100%;
`;

export const DefaultProfilePhotoContainer = styled(ProfilePhotoContainer)`
  background: #005d27;
`;

export const TextPhoto = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
  color: #fff;
`;

export const ChatDetailsContainer = styled.div`
  flex-grow: 1;
`;

export const NameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3rem;
`;

export const Name = styled.h3`
  margin-right: 1rem;
  flex-grow: 1;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
`;

export const MessageDateTime = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  color: #ababab;
`;

export const MessagePreview = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #bebebe;
`;
