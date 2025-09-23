import styled from 'styled-components';

export const NameInitialsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: inherit;
  background-color: ${(props) => props.theme.nameInitials.backgroundColor};
`;

export const NameInitials = styled.span`
  line-height: 1.5;
  font-size: 15rem;
  font-weight: 600;
`;

export const SmallNameInitialsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.nameInitials.backgroundColor};
`;

export const SmallNameInitials = styled.span`
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2;
`;
