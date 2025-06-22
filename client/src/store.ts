import { configureStore, createSelector } from '@reduxjs/toolkit';
import profilePhotosReducer from '@/features/Settings/slices/profilePhotosSlice';
import accountReducer from '@/features/Settings/slices/accountSlice';
import usersReducer from '@/usersSlice';
import messagesReducer from '@/features/Chat/slices/messagesSlice';
import chatsReducer from '@/features/Chat/slices/chatsSlice';
import messageRequestsReducer from '@/features/Chat/slices/messageRequestsSlice';
import contactsReducer from '@/contactsSlice';
import blockedUsersReducer from '@/blockedUsersSlice';

const store = configureStore({
  reducer: {
    account: accountReducer,

    profilePhotos: profilePhotosReducer,

    messages: messagesReducer,

    chats: chatsReducer,

    messageRequests: messageRequestsReducer,

    users: usersReducer,

    contacts: contactsReducer,

    blockedUsers: blockedUsersReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const createAppSelector = createSelector.withTypes<RootState>();

export default store;
