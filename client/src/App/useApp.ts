import { useCallback, useMemo, useState } from 'react';
import { useRouteTracker } from '../hooks';
import { DarkTheme, LightTheme } from '../themes';

type ThemeType = 'dark' | 'light';

const useApp = () => {
  const [theme, setTheme] = useState<ThemeType>('dark');

  const toggleTheme = useCallback(() => {
    setTheme((prevValue) => (prevValue === 'light' ? 'dark' : 'light'));
  }, []);

  const themeObject = useMemo(
    () => (theme === 'dark' ? DarkTheme : LightTheme),
    [theme],
  );

  const { currentPath, previousPath } = useRouteTracker();

  return {
    theme: themeObject,
    toggleTheme,
    currentRoutePath: currentPath,
    previousRoutePath: previousPath,
  };
};

export default useApp;
