import { createAsyncThunk } from '@reduxjs/toolkit';
import { eventAPI } from 'api/eventApi';
import { IEvent } from 'models/Event';
import { EventPayloadType, RequestErrorType } from 'models/utilsTypes';

export const fetchEvents = createAsyncThunk('event/fetchEvents', async (_, thunkAPI) => {
  try {
    const response = await eventAPI.getAll();
    return response;
  } catch (error) {
    const err = error as RequestErrorType;
    return thunkAPI.rejectWithValue(err.response?.data.error);
  }
});

export const fetchCreateEvent = createAsyncThunk(
  'event/fetchCreateEvent',
  async (payload: EventPayloadType, thunkAPI) => {
    try {
      const response = await eventAPI.create(payload);
      return response;
    } catch (error) {
      const err = error as RequestErrorType;
      return thunkAPI.rejectWithValue(err.response?.data.error);
    }
  },
);
