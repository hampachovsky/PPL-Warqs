import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskAPI } from 'api/taskApi';
import { RequestErrorType } from 'models/utilsTypes';

export const fetchTasks = createAsyncThunk('event/fetchTasks', async (eventId: string, thunkAPI) => {
  try {
    const response = await taskAPI.getByEvent(eventId);
    return response;
  } catch (error) {
    const err = error as RequestErrorType;
    return thunkAPI.rejectWithValue(err.response?.data.error);
  }
});
