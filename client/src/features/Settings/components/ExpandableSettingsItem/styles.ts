import styled from 'styled-components';

export const SettingsItemContainer = styled.div`
  margin-bottom: 1rem;
  padding: 1rem 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  background-color: #41414a;

  &:hover {
    background-color: #545459;
  }
`;

export const Title = styled.p`
  padding: 0;
  margin: 0;
  user-select: none;
  font-size: 1rem;
  transition: color 0.4s ease-in-out;
`;

export const Description = styled.span`
  display: block;
  user-select: none;
  color: var(--fg-muted);
  font-size: 0.9rem;
`;

export const ArrowIconContainer = styled.div`
  width: 1rem;
  height: 1rem;
  user-select: none;
`;
