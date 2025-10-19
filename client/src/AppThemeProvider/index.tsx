import styled from 'styled-components';
import { Theme } from '@/types';
import darkThemeVars from './darkThemeVars';
import lightThemeVars from './lightThemeVars';
import { useThemeStore } from '@/store';
import { FC, ReactNode } from 'react';

const AppThemeProviderStyled = styled.div<{ $theme: Theme }>`
  ${(props) => (props.$theme === 'dark' ? darkThemeVars : lightThemeVars)}
`;

interface AppThemeProviderProps {
  children: ReactNode;
}

const AppThemeProvider: FC<AppThemeProviderProps> = ({ children }) => {
  const theme = useThemeStore();

  return (
    <AppThemeProviderStyled $theme={theme}>{children}</AppThemeProviderStyled>
  );
};

export default AppThemeProvider;
