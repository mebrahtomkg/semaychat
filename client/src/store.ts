import { configureStore, createSelector } from '@reduxjs/toolkit';
import accountReducer from '@/features/Settings/slices/accountSlice';
import usersReducer from '@/usersSlice';
import messageRequestsReducer from '@/features/Chat/slices/messageRequestsSlice';
import blockedUsersReducer from '@/blockedUsersSlice';

const store = configureStore({
  reducer: {
    account: accountReducer,

    messageRequests: messageRequestsReducer,

    users: usersReducer,

    blockedUsers: blockedUsersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const createAppSelector = createSelector.withTypes<RootState>();

export default store;
