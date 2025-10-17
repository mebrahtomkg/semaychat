import { create } from 'zustand';
import { combine } from 'zustand/middleware';

const initialState = {
  isContactsModalVisible: false,
  isSettingsModalVisible: false,
  isProfileModalVisible: false,
};

const useAppStateStore = create(
  combine(initialState, (set) => ({
    openContactsModal: () => {
      set(() => ({ isContactsModalVisible: true }));
    },

    closeContactsModal: () => {
      set(() => ({ isContactsModalVisible: false }));
    },

    openSettingsModal: () => {
      set(() => ({ isSettingsModalVisible: true }));
    },

    closeSettingsModal: () => {
      set(() => ({ isSettingsModalVisible: false }));
    },
    openProfileModal: () => {
      set(() => ({ isProfileModalVisible: true }));
    },

    closeProfileModal: () => {
      set(() => ({ isProfileModalVisible: false }));
    },
  })),
);

export default useAppStateStore;
