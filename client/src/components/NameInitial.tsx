import React from 'react';
import styled from 'styled-components';

const NameInitialsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #005d27;
  border-radius: inherit;
  background-color: ${(props) => props.theme.nameInitials.backgroundColor};
`;

const NameInitials = styled.span`
  line-height: 1.5;
  font-size: 15rem;
  font-weight: 600;
`;

const SmallNameInitialsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.nameInitials.backgroundColor};
`;

const SmallNameInitials = styled.span`
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2;
`;

const NameInitial = ({ nameInitials, isSmall = false }) => {
  return isSmall ? (
    <SmallNameInitialsContainer>
      <SmallNameInitials>{nameInitials}</SmallNameInitials>
    </SmallNameInitialsContainer>
  ) : (
    <NameInitialsContainer>
      <NameInitials>{nameInitials}</NameInitials>
    </NameInitialsContainer>
  );
};

export default NameInitial;
