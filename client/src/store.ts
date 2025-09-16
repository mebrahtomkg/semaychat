import { configureStore, createSelector } from '@reduxjs/toolkit';
import accountReducer from '@/features/Settings/slices/accountSlice';
import messageRequestsReducer from '@/features/Chat/slices/messageRequestsSlice';

const store = configureStore({
  reducer: {
    account: accountReducer,

    messageRequests: messageRequestsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const createAppSelector = createSelector.withTypes<RootState>();

export default store;
