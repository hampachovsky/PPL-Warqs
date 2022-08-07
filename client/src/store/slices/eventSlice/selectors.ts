import { LoadingStatus } from 'models/utilsTypes';
import { RootState } from 'store/store';
import { eventAdapter } from './eventSlice';

export const {
  selectAll: selectAllEvents,
  selectById: selectEventById,
  selectIds: selectEventIds,
} = eventAdapter.getSelectors<RootState>((state) => state.eventReducer);

export const selectEventsStatus = (state: RootState) => state.eventReducer.status;

export const selectEventsIsLoading = (state: RootState) => state.eventReducer.status === LoadingStatus.LOADING;
