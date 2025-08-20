import { useCallback, useMemo, useState } from 'react';
import { useResponsive, useRouteTracker } from '../hooks';
import { DarkTheme, LightTheme } from '../themes';

type ThemeType = 'dark' | 'light';

const useApp = () => {
  const { windowWidth } = useResponsive();

  const [theme, setTheme] = useState<ThemeType>('dark');

  const toggleTheme = useCallback(() => {
    setTheme((prevValue) => (prevValue === 'light' ? 'dark' : 'light'));
  }, []);

  const themeObject = useMemo(
    () => (theme === 'dark' ? DarkTheme : LightTheme),
    [theme],
  );

  const isLargeScreen = windowWidth >= 768; // >= tablet

  const { currentPath, previousPath } = useRouteTracker();

  return {
    windowWidth,
    theme: themeObject,
    toggleTheme,
    isLargeScreen,
    currentRoutePath: currentPath,
    previousRoutePath: previousPath,
  };
};

export default useApp;
