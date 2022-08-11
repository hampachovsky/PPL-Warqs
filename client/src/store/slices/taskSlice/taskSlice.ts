import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ITask } from 'models/ITask';
import { LoadingStatus, State } from 'models/utilsTypes';
import { fetchCreateTask, fetchDeleteTask, fetchTasks, fetchUpdateTask } from './thunk';

export const taskAdapter = createEntityAdapter<ITask>({
  selectId: (task) => task._id,
});

const initialState = taskAdapter.getInitialState<State>({
  status: LoadingStatus.IDLE,
  error: null,
});

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    resetTasksState: (state) => {
      taskAdapter.removeAll(state);
      state.status = LoadingStatus.IDLE;
      state.error = null;
    },
    setSuccessStatus: (state) => {
      state.status = LoadingStatus.SUCCESS;
      state.error = null;
    },
    setLoadingStatus: (state) => {
      state.status = LoadingStatus.LOADING;
      state.error = null;
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
    builder.addCase(fetchTasks.fulfilled, (state, { payload }) => {
      taskAdapter.setAll(state, payload);
      taskSlice.caseReducers.setSuccessStatus(state);
    });
    builder.addCase(fetchTasks.pending, (state) => {
      taskSlice.caseReducers.setLoadingStatus(state);
    });
    builder.addCase(fetchTasks.rejected, (state, { payload }) => {
      taskSlice.caseReducers.setErrorStatus(state, payload);
    });

    builder.addCase(fetchCreateTask.fulfilled, (state, { payload }) => {
      taskAdapter.addOne(state, payload);
      taskSlice.caseReducers.setSuccessStatus(state);
    });
    builder.addCase(fetchCreateTask.pending, (state) => {
      taskSlice.caseReducers.setLoadingStatus(state);
    });
    builder.addCase(fetchCreateTask.rejected, (state, { payload }) => {
      taskSlice.caseReducers.setErrorStatus(state, payload);
    });

    builder.addCase(fetchUpdateTask.fulfilled, (state, { payload }) => {
      taskAdapter.setOne(state, payload);
      taskSlice.caseReducers.setSuccessStatus(state);
    });
    builder.addCase(fetchUpdateTask.pending, (state) => {
      taskSlice.caseReducers.setLoadingStatus(state);
    });
    builder.addCase(fetchUpdateTask.rejected, (state, { payload }) => {
      taskSlice.caseReducers.setErrorStatus(state, payload);
    });

    builder.addCase(fetchDeleteTask.fulfilled, (state, { payload }) => {
      taskAdapter.removeOne(state, payload);
      taskSlice.caseReducers.setSuccessStatus(state);
    });
    builder.addCase(fetchDeleteTask.pending, (state) => {
      taskSlice.caseReducers.setLoadingStatus(state);
    });
  },
});

export default taskSlice.reducer;

export const { resetTasksState } = taskSlice.actions;
