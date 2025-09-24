import { DEFAULT_THEME } from '@/constants';
import { Theme } from '@/types';
import { create } from 'zustand';

const useThemeStore = create<Theme>(() => DEFAULT_THEME);

export const toggleTheme = () => {
  useThemeStore.setState(
    (prevValue) => (prevValue === 'light' ? 'dark' : 'light'),
    true,
  );
};

export default useThemeStore;
