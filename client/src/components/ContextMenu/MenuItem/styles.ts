import styled from 'styled-components';
import { StyleProps } from '../../../types';

export const MenuItemStyled = styled.li`
  display: flex;
  align-items: center;
  padding: 15px 15px;
  cursor: pointer;
  border-radius: 7px;
  background-color: inherit;
  transition: background-color 0.15s ease;

  color: ${(props: StyleProps) => props.theme.textColors?.normal};

  &:hover {
    background: ${(props: StyleProps) => props.theme.backgroundColors?.veryBright};
  }
`;

export const MenuItemIconContainer = styled.div`
  width: 1.25rem;
  margin-right: 0.95rem;
  color: inherit;
  background: inherit;
`;

export const MenuItemLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: inherit;
`;
