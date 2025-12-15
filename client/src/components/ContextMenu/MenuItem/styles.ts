import styled from 'styled-components';

export const MenuItemStyled = styled.li`
  display: flex;
  align-items: center;
  padding: 15px 15px;
  cursor: pointer;
  border-radius: 7px;
  background-color: inherit;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: var(--bg-hover);
  }
`;

export const MenuItemIconContainer = styled.div`
  width: 1.25rem;
  margin-right: 0.95rem;
  color: var(--fg-primary);
`;

export const MenuItemLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--fg-primary);
`;
