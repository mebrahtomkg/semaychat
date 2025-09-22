import { useCallback, useMemo, useState } from 'react';
import { DarkTheme, LightTheme } from '../themes';

type ThemeType = 'dark' | 'light';

// Should be called only in the App component.
const useAppTheme = () => {
  const [theme, setTheme] = useState<ThemeType>('dark');

  const toggleTheme = useCallback(() => {
    setTheme((prevValue) => (prevValue === 'light' ? 'dark' : 'light'));
  }, []);

  const themeObject = useMemo(
    () => (theme === 'dark' ? DarkTheme : LightTheme),
    [theme],
  );

  return {
    theme: themeObject,
    toggleTheme,
  };
};

export default useAppTheme;
