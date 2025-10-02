import { create } from 'zustand';
import { combine } from 'zustand/middleware';

const initialState = {
  isContactsModalVisible: false,
  isSidebarVisible: false,
  isSettingsModalVisible: false,
};

const useAppStateStore = create(
  combine(initialState, (set) => ({
    openContactsModal: () => {
      set(() => ({ isContactsModalVisible: true }));
    },

    closeContactsModal: () => {
      set(() => ({ isContactsModalVisible: false }));
    },

    showSidebar: () => {
      set(() => ({ isSidebarVisible: true }));
    },

    hideSidebar: () => {
      set(() => ({ isSidebarVisible: false }));
    },

    toggleSidebar: () => {
      set((state) => ({ isSidebarVisible: !state.isSidebarVisible }));
    },

    openSettingsModal: () => {
      set(() => ({ isSettingsModalVisible: true }));
    },

    closeSettingsModal: () => {
      set(() => ({ isSettingsModalVisible: false }));
    },
  })),
);

export default useAppStateStore;
