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

export const fetchUpdateEvent = createAsyncThunk('event/fetchUpdateEvent', async (payload: IEvent, thunkAPI) => {
  try {
    const response = await eventAPI.update(payload);
    return response;
  } catch (error) {
    const err = error as RequestErrorType;
    return thunkAPI.rejectWithValue(err.response?.data.error);
  }
});

export const fetchDeleteEvent = createAsyncThunk('event/fetchDeleteEvent', async (payload: string, thunkAPI) => {
  await eventAPI.delete(payload);
  return payload;
});
