import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from 'api/authApi';
import { RequestErrorType, SignInPayload, SignUpPayload } from 'models/utilsTypes';
import { fetchEvents } from '../eventSlice/thunk';

export const fetchSignIn = createAsyncThunk('user/fetchSignIn', async (payload: SignInPayload, thunkAPI) => {
  try {
    const response = await authAPI.login(payload);
    window.localStorage.setItem('token', response.token);
    thunkAPI.dispatch(fetchEvents());
    return response.user;
  } catch (error) {
    const err = error as RequestErrorType;
    return thunkAPI.rejectWithValue(err.response?.data.error);
  }
});

export const fetchSignUp = createAsyncThunk('user/fetchSignUp', async (payload: SignUpPayload, thunkAPI) => {
  try {
    const response = await authAPI.register(payload);
    return response;
  } catch (error) {
    const err = error as RequestErrorType;
    return thunkAPI.rejectWithValue(err.response?.data.error);
  }
});

export const fetchUserData = createAsyncThunk('user/fetchUserData', async (_, thunkAPI) => {
  const response = await authAPI.authMe();
  thunkAPI.dispatch(fetchEvents());
  return response;
});
