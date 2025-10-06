import styled from 'styled-components';

export const BlockedUserStyled = styled.div`
  margin: 0 0.2rem;
  padding: 0.6rem 1rem;
  display: flex;
  justify-content: space-between;
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

export const Photo = styled.img`
  width: 100%;
`;

export const NameContainer = styled.div`
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3rem;
`;

export const Name = styled.h3`
  margin-right: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
  font-weight: 500;
`;

export const MoreButtonStyled = styled.button`
  --more-btn-width: 2.5rem;
  width: var(--more-btn-width);
  min-width: var(--more-btn-width);
  height: var(--more-btn-width);
  padding: 0.6rem;
  border-radius: 50%;

  &:hover {
    background-color: var(--bg-very-bright);
  }
`;
