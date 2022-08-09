import { RootState } from 'store/store';
import { taskAdapter } from './taskSlice';

export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
  selectIds: selectTasksIds,
} = taskAdapter.getSelectors<RootState>((state) => state.taskReducer);
