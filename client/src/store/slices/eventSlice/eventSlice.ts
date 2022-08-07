import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEvent } from 'models/Event';
import { LoadingStatus, State } from 'models/utilsTypes';
import { fetchCreateEvent, fetchDeleteEvent, fetchEvents, fetchUpdateEvent } from './thunk';

export const eventAdapter = createEntityAdapter<IEvent>({
  selectId: (event) => event._id,
});

const initialState = eventAdapter.getInitialState<State>({
  // events: [],
  status: LoadingStatus.IDLE,
  error: null,
});

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
      eventAdapter.setAll(state, payload);
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
      eventAdapter.addOne(state, payload);
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

    builder.addCase(fetchUpdateEvent.fulfilled, (state, { payload }) => {
      eventAdapter.setOne(state, payload);
      state.error = null;
      state.status = LoadingStatus.SUCCESS;
    });
    builder.addCase(fetchUpdateEvent.pending, (state) => {
      state.status = LoadingStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchUpdateEvent.rejected, (state, { payload }) => {
      state.status = LoadingStatus.ERORR;
      if (typeof payload === 'string') {
        state.error = payload;
      } else {
        state.error = 'unknown error';
      }
    });

    builder.addCase(fetchDeleteEvent.fulfilled, (state, { payload }) => {
      eventAdapter.removeOne(state, payload);
      state.error = null;
      state.status = LoadingStatus.SUCCESS;
    });
    builder.addCase(fetchDeleteEvent.pending, (state) => {
      state.status = LoadingStatus.LOADING;
      state.error = null;
    });
  },
});

export default eventSlice.reducer;

export const { setLoadingStatus } = eventSlice.actions;
