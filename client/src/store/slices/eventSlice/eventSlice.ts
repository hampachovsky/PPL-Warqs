import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventState } from 'models/Event';
import { LoadingStatus } from 'models/utilsTypes';
import { fetchCreateEvent, fetchEvents } from './thunk';

const initialState: EventState = {
  events: null,
  status: LoadingStatus.IDLE,
  error: null,
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setLoadingStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchEvents.fulfilled, (state, { payload }) => {
      state.events = payload;
      state.error = null;
      state.status = LoadingStatus.SUCCESS;
    });
    builder.addCase(fetchEvents.pending, (state) => {
      state.status = LoadingStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchEvents.rejected, (state, { payload }) => {
      state.status = LoadingStatus.ERORR;
      if (typeof payload === 'string') {
        state.error = payload;
      } else {
        state.error = 'unknown error';
      }
    });

    builder.addCase(fetchCreateEvent.fulfilled, (state, { payload }) => {
      state.events?.push(payload);
      state.error = null;
      state.status = LoadingStatus.SUCCESS;
    });
    builder.addCase(fetchCreateEvent.pending, (state) => {
      state.status = LoadingStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchCreateEvent.rejected, (state, { payload }) => {
      state.status = LoadingStatus.ERORR;
      if (typeof payload === 'string') {
        state.error = payload;
      } else {
        state.error = 'unknown error';
      }
    });
  },
});

export default eventSlice.reducer;

export const { setLoadingStatus } = eventSlice.actions;
