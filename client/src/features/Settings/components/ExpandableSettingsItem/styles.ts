import styled, { css } from 'styled-components';

export const SettingsItemContainer = styled.div<{ $isLast?: boolean }>`
  padding: 0.8rem 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${(props) =>
    !props.$isLast &&
    css`
      border-bottom: 1px solid;
      border-color: var(--fg-border);
    `}

  &:hover {
    background-color: var(--bg-very-bright);
  }
`;

export const Title = styled.p`
  padding: 0;
  margin: 0;
  user-select: none;
  font-size: 1rem;
  color: var(--fg-normal);
  transition: color 0.4s ease-in-out;
`;

export const Description = styled.span`
  display: block;
  user-select: none;
  color: var(--fg-description);
  font-size: 0.9rem;
`;

export const ArrowIconContainer = styled.div`
  width: 1rem;
  height: 1rem;
  user-select: none;
  color: var(--fg-normal);
`;
