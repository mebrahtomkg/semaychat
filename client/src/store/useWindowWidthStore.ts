import { create } from 'zustand';

const useWindowWidthStore = create<number>(() => 0);

export const setWindowWidth = (width: number) => {
  useWindowWidthStore.setState(width, true);
};

export default useWindowWidthStore;
