import styled from 'styled-components';

export const NameInitialsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: inherit;
  background: var(--bg-avatar-0);
`;

export const NameInitials = styled.span`
  line-height: 1;
  font-size: 10rem;
  font-weight: 500;
  color: #fff;
`;

export const SmallNameInitialsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #005d27;
`;

export const SmallNameInitials = styled.span`
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2;
  color: #e9e9e9;
`;
