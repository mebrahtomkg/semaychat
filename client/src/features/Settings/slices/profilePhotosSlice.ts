import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ProfilePhoto } from '../../../types';

const initialState: ProfilePhoto[] = [];

export const profilePhotosSlice = createSlice({
  name: 'profilePhotos',

  initialState,

  reducers: {
    profilePhotosFetched(state, action: PayloadAction<ProfilePhoto[]>) {
      return action.payload;
    },

    profilePhotoAdded(state, action: PayloadAction<ProfilePhoto>) {
      return [action.payload, ...state];
    },

    profilePhotoDeleted(state, action: PayloadAction<number>) {
      return state.filter((profilePhoto) => profilePhoto.id !== action.payload);
    }
  }
});

export const { profilePhotosFetched, profilePhotoAdded, profilePhotoDeleted } =
  profilePhotosSlice.actions;

export default profilePhotosSlice.reducer;
