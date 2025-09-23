import { useCallback, useState } from 'react';

type ThemeType = 'dark' | 'light';

// Should be called only in the App component.
const useAppTheme = () => {
  const [theme, setTheme] = useState<ThemeType>('dark');

  const toggleTheme = useCallback(() => {
    setTheme((prevValue) => (prevValue === 'light' ? 'dark' : 'light'));
  }, []);

  return {
    theme,
    toggleTheme,
  };
};

export default useAppTheme;
