import { Theme } from '@/types';
import { create } from 'zustand';

const useThemeStore = create<Theme>(() => 'light');

export const toggleTheme = () => {
  useThemeStore.setState(
    (prevValue) => (prevValue === 'light' ? 'dark' : 'light'),
    true,
  );
};

export default useThemeStore;
