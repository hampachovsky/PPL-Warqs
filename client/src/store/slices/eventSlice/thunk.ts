import { createAsyncThunk } from '@reduxjs/toolkit';
import { eventAPI } from 'api/eventApi';
import { IEvent } from 'models/Event';
import { EventPayloadType, FiltersType, RequestErrorType } from 'models/utilsTypes';
import { ActionType } from './types';

export const fetchEvents = createAsyncThunk(ActionType.FETCH_EVENTS, async (_, thunkAPI) => {
  try {
    const response = await eventAPI.getAll();
    return response;
  } catch (error) {
    const err = error as RequestErrorType;
    return thunkAPI.rejectWithValue(err.response?.data.error);
  }
});

export const fetchEventsBy = createAsyncThunk(ActionType.FETCH_EVENTS_BY, async (payload: FiltersType, thunkAPI) => {
  try {
    const response = await eventAPI.getBy(payload);
    return response;
  } catch (error) {
    const err = error as RequestErrorType;
    return thunkAPI.rejectWithValue(err.response?.data.error);
  }
});

export const fetchCreateEvent = createAsyncThunk(
  ActionType.FETCH_CREATE_EVENTS,
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

export const fetchUpdateEvent = createAsyncThunk(ActionType.FETCH_UPDATE_EVENT, async (payload: IEvent, thunkAPI) => {
  try {
    const response = await eventAPI.update(payload);
    return response;
  } catch (error) {
    const err = error as RequestErrorType;
    return thunkAPI.rejectWithValue(err.response?.data.error);
  }
});

export const fetchDeleteEvent = createAsyncThunk(ActionType.FETCH_DELETE_EVENT, async (payload: string, thunkAPI) => {
  await eventAPI.delete(payload);
  return payload;
});
