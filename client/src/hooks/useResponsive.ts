import { useWindowWidthStore } from '@/store';

const useResponsive = () => {
  const windowWidth = useWindowWidthStore();

  const isLargeScreen = windowWidth >= 768; // >= tablet

  return {
    windowWidth,
    isLargeScreen,
  };
};

export default useResponsive;
