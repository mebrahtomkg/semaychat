import { FC } from 'react';
import styled, { css } from 'styled-components';

const TabButtonStyled = styled.button<{ $isActive: boolean }>`
  flex-grow: 1;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  padding: 0.45rem 1.3rem;
  border-radius: inherit;
  ${(props) =>
    props.$isActive &&
    css`
      background-color: var(--bg-active-tab);
    `}
`;

interface TabButtonProps {
  text: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: FC<TabButtonProps> = ({ text, isActive, onClick }) => {
  return (
    <TabButtonStyled type="button" $isActive={isActive} onClick={onClick}>
      {text}
    </TabButtonStyled>
  );
};

export default TabButton;
