import { LoadingStatus } from 'models/utilsTypes';
import { RootState } from 'store/store';
import { taskAdapter } from './taskSlice';

export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
  selectIds: selectTasksIds,
} = taskAdapter.getSelectors<RootState>((state) => state.taskReducer);

export const selectTasksIsLoading = (state: RootState) => state.taskReducer.status === LoadingStatus.LOADING;
export const selectTasksIsSuccess = (state: RootState) => state.taskReducer.status === LoadingStatus.SUCCESS;
export const selectTasksIsError = (state: RootState) => state.taskReducer.status === LoadingStatus.ERORR;
