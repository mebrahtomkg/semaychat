import styled, { css } from 'styled-components';

export const SettingsItemStyled = styled.div<{ $isLast?: boolean }>`
  min-height: 4rem;
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;

  ${(props) =>
    !props.$isLast &&
    css`
      border-bottom: 1px solid;
      border-color: var(--fg-border);
    `}
`;

export const ItemDetailsContainer = styled.div`
  flex-grow: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SettingLabel = styled.h3`
  user-select: none;
  font-size: 1rem;
  color: var(--fg-main);
`;

export const SettingValue = styled.h3`
  flex-grow: 2;
  text-align: right;
  user-select: none;
  color: var(--fg-main);
  font-size: 1rem;
`;

export const EditButton = styled.button`
  margin-left: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.7rem;
  border-radius: 7px;
  user-select: none;
  color: var(--fg-main);
  background-color: var(--bg-very-bright);
`;
