import { LoadingStatus } from 'models/utilsTypes';
import { RootState } from 'store/store';

export const selectEventsStatus = (state: RootState) => state.eventReducer.status;

export const selectEventsIsLoading = (state: RootState) => state.eventReducer.status === LoadingStatus.LOADING;
