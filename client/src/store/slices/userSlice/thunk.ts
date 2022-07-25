import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from 'api/authApi';
import { RequestErrorType, SignInPayload } from 'models/utilsTypes';

export const fetchSignIn = createAsyncThunk('user/fetchSignIn', async (payload: SignInPayload, thunkAPI) => {
  try {
    const response = await authAPI.login(payload);
    window.localStorage.setItem('token', response.token);
    return response.user;
  } catch (error) {
    const err = error as RequestErrorType;
    return thunkAPI.rejectWithValue(err.response?.data.error);
  }
});
