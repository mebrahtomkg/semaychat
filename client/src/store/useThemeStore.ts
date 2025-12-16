import { DEFAULT_THEME } from '@/constants';
import { Theme } from '@/types';
import { create } from 'zustand';

const useThemeStore = create<Theme>(() => DEFAULT_THEME);

// Note: the theme transition class is declared in GlobalStyle.tsx file
const THEME_TRANSITION_CLASS = 'theme-transition';

// Note: the transition duration should match with the transition duration
// used in GlobalStyle.tsx file
const TRANSITION_DURATION_MS = 700;

export const toggleTheme = () => {
  // Activate smooth transition for all elements. by adding the transition class
  // to the root html(i.e html) element
  document.documentElement.classList.add(THEME_TRANSITION_CLASS);

  useThemeStore.setState(
    (prevValue) => (prevValue === 'light' ? 'dark' : 'light'),
    true,
  );

  // Cleanup the smooth transition to avoid unwanted side effects in normal app operation.
  // Add 200ms to the timeout to make sure the transition fully completed. i.e robustness
  setTimeout(() => {
    document.documentElement.classList.remove(THEME_TRANSITION_CLASS);
  }, TRANSITION_DURATION_MS + 200);
};

export default useThemeStore;
