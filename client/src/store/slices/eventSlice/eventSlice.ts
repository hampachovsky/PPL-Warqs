import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FiltersConstants } from 'constatns/filtersConstants';
import { eventType, IEvent } from 'models/Event';
import { EventState, LoadingStatus } from 'models/utilsTypes';
import { fetchCreateEvent, fetchDeleteEvent, fetchEvents, fetchEventsBy, fetchUpdateEvent } from './thunk';

export const eventAdapter = createEntityAdapter<IEvent>({
  selectId: (event) => event._id,
});

const initialState = eventAdapter.getInitialState<EventState>({
  status: LoadingStatus.IDLE,
  error: null,
  filters: {
    queryString: '',
    date: '',
    type: '',
  },
});

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    resetEventsState: (state) => {
      eventAdapter.removeAll(state);
      state.filters = { queryString: '', date: '', type: '' };
      state.error = null;
      state.status = LoadingStatus.IDLE;
    },
    changeEventFilterType: (state, action: PayloadAction<eventType>) => {
      state.filters.type = action.payload;
    },
    changeEventFilterDate: (state, action: PayloadAction<string>) => {
      state.filters.date = action.payload;
    },
    changeEventFilterQueryString: (state, action: PayloadAction<string>) => {
      state.filters.queryString = action.payload;
    },

    parseEventsSearchParams: (state, action: PayloadAction<[string, string][]>) => {
      for (let pair of action.payload) {
        switch (pair[0]) {
          case FiltersConstants.DATE: {
            state.filters.date = pair[1];
            break;
          }
          case FiltersConstants.QUERY_STRING: {
            state.filters.queryString = pair[1];
            break;
          }
          case FiltersConstants.TYPE: {
            state.filters.type = pair[1];
            break;
          }
        }
      }
    },

    clearEventsFilters: (state) => {
      state.filters.date = '';
      state.filters.queryString = '';
      state.filters.type = '';
    },
    setEvents: (state, action: PayloadAction<IEvent[]>) => {
      eventAdapter.setAll(state, action.payload);
    },
    setSuccessStatus: (state) => {
      state.error = null;
      state.status = LoadingStatus.SUCCESS;
    },
    setLoadingStatus: (state) => {
      state.error = null;
      state.status = LoadingStatus.LOADING;
    },
    setErrorStatus: (state, error: unknown) => {
      state.status = LoadingStatus.ERORR;
      if (typeof error === 'string') {
        state.error = error;
      } else {
        state.error = 'unknown error';
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchEvents.fulfilled, (state, payload) => {
      eventAdapter.setAll(state, payload);
      eventSlice.caseReducers.setSuccessStatus(state);
    });
    builder.addCase(fetchEvents.pending, (state) => {
      eventSlice.caseReducers.setLoadingStatus(state);
    });
    builder.addCase(fetchEvents.rejected, (state, { payload }) => {
      eventSlice.caseReducers.setErrorStatus(state, payload);
    });

    builder.addCase(fetchEventsBy.fulfilled, (state, payload) => {
      eventAdapter.setAll(state, payload);
      eventSlice.caseReducers.setSuccessStatus(state);
    });
    builder.addCase(fetchEventsBy.pending, (state) => {
      eventSlice.caseReducers.setLoadingStatus(state);
    });
    builder.addCase(fetchEventsBy.rejected, (state, { payload }) => {
      eventSlice.caseReducers.setErrorStatus(state, payload);
    });

    builder.addCase(fetchCreateEvent.fulfilled, (state, { payload }) => {
      eventAdapter.addOne(state, payload);
      eventSlice.caseReducers.setSuccessStatus(state);
    });
    builder.addCase(fetchCreateEvent.pending, (state) => {
      eventSlice.caseReducers.setLoadingStatus(state);
    });
    builder.addCase(fetchCreateEvent.rejected, (state, { payload }) => {
      eventSlice.caseReducers.setErrorStatus(state, payload);
    });

    builder.addCase(fetchUpdateEvent.fulfilled, (state, { payload }) => {
      eventAdapter.setOne(state, payload);
      eventSlice.caseReducers.setSuccessStatus(state);
    });
    builder.addCase(fetchUpdateEvent.pending, (state) => {
      eventSlice.caseReducers.setLoadingStatus(state);
    });
    builder.addCase(fetchUpdateEvent.rejected, (state, { payload }) => {
      eventSlice.caseReducers.setErrorStatus(state, payload);
    });

    builder.addCase(fetchDeleteEvent.fulfilled, (state, { payload }) => {
      eventAdapter.removeOne(state, payload);
      eventSlice.caseReducers.setSuccessStatus(state);
    });
    builder.addCase(fetchDeleteEvent.pending, (state) => {
      eventSlice.caseReducers.setLoadingStatus(state);
    });
  },
});

export default eventSlice.reducer;

export const {
  clearEventsFilters,
  changeEventFilterType,
  changeEventFilterDate,
  changeEventFilterQueryString,
  setEvents,
  resetEventsState,
  parseEventsSearchParams,
} = eventSlice.actions;
