import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from 'models/IUser';
import { LoadingStatus } from 'models/utilsTypes';
import { fetchSignIn, fetchSignUp, fetchUserData } from './thunk';

const initialState: UserState = {
  user: null,
  status: LoadingStatus.IDLE,
  error: null,
  isAuth: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.status = LoadingStatus.IDLE;
      state.user = null;
      state.error = null;
      state.isAuth = false;
      window.localStorage.removeItem('token');
    },
    setLoadingStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchSignIn.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isAuth = true;
      state.error = null;
      state.status = LoadingStatus.SUCCESS;
    });
    builder.addCase(fetchSignIn.pending, (state) => {
      state.status = LoadingStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchSignIn.rejected, (state, { payload }) => {
      state.status = LoadingStatus.ERORR;
      if (typeof payload === 'string') {
        state.error = payload;
      } else {
        state.error = 'unknown error';
      }
    });

    builder.addCase(fetchUserData.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isAuth = true;
      state.error = null;
      state.status = LoadingStatus.SUCCESS;
    });
    builder.addCase(fetchUserData.pending, (state) => {
      state.status = LoadingStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchUserData.rejected, (state) => {
      state.status = LoadingStatus.IDLE;
    });

    builder.addCase(fetchSignUp.fulfilled, (state) => {
      state.status = LoadingStatus.SUCCESS;
      state.error = null;
    });
    builder.addCase(fetchSignUp.pending, (state) => {
      state.status = LoadingStatus.LOADING;
      state.error = null;
    });

    builder.addCase(fetchSignUp.rejected, (state, { payload }) => {
      state.status = LoadingStatus.ERORR;
      if (typeof payload === 'string') {
        state.error = payload;
      } else {
        state.error = 'unknown error';
      }
    });
  },
});

export default userSlice.reducer;

export const { logout, setLoadingStatus } = userSlice.actions;
