import styled from 'styled-components';

export const HamburgerContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 5rem;
  padding: 0.6rem;
  overflow: hidden;
  background-color: var(--bg-main);
`;

export const HamburgerStyled = styled.div`
  padding: 0.4rem 0.8rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 15px;
  background-color: var(--bg-hover);

  &:hover {
    background-color: var(--bg-hover);
  }
`;

export const ProfilePhotoContainer = styled.div`
  --photo-width: 2.7rem;
  width: var(--photo-width);
  height: var(--photo-width);
  margin-right: 0.6rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25%;
  background-color: #0b580b;
`;

export const ProfilePhoto = styled.img`
  width: 100%;
`;

export const NameInitial = styled.p`
  line-height: 1;
  font-size: 1.4rem;
  font-weight: 600;
  color: inherit;
`;

export const Name = styled.h2`
  overflow: hidden;
  font-size: 1.2rem;
  font-weight: 500;
  color: inherit;
`;
