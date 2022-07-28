import { createAsyncThunk } from '@reduxjs/toolkit';
import { eventAPI } from 'api/eventApi';
import { RequestErrorType } from 'models/utilsTypes';

export const fetchEvents = createAsyncThunk('user/fetchEvents', async (_, thunkAPI) => {
  try {
    const response = await eventAPI.getAll();
    return response;
  } catch (error) {
    const err = error as RequestErrorType;
    return thunkAPI.rejectWithValue(err.response?.data.error);
  }
});
