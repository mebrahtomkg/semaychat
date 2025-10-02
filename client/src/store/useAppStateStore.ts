import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export interface AppState {
  isContactsModalVisible: boolean;
}

const initialState: AppState = {
  isContactsModalVisible: false,
};

const useAppStateStore = create(
  combine(initialState, (set) => ({
    openContactsModal: () => {
      set(() => ({ isContactsModalVisible: true }));
    },

    closeContactsModal: () => {
      set(() => ({ isContactsModalVisible: false }));
    },
  })),
);

export default useAppStateStore;
