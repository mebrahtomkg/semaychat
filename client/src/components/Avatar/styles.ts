import styled from 'styled-components';

export const AvatarContainer = styled.div`
  position: relative;
  display: flex;
`;

export const AvatarStyled = styled.div<{
  $isSmall: boolean;
  $variantIndex: number;
}>`
  --avatar-width: ${(props) => (props.$isSmall ? '2.7rem' : '3.4rem')};
  width: var(--avatar-width);
  height: var(--avatar-width);
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  text-transform: uppercase;
  flex-shrink: 0;

  background: var(--bg-avatar-${(props) => props.$variantIndex});
`;

export const AvatarInitials = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: #ffffff;
  text-transform: uppercase;
`;

export const AvatarImage = styled.img`
  width: 100%;
`;

export const OnlineIndicator = styled.div`
  --online-indicator-size: 12px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: var(--online-indicator-size);
  height: var(--online-indicator-size);
  border-radius: 50%;
  outline-style: solid;
  outline-width: 1px;
  outline-color: #646464;
  background-color: #89ff00;
`;
