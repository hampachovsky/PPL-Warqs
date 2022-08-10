import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    setLoadingStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTasks.fulfilled, (state, { payload }) => {
      taskAdapter.setAll(state, payload);
      state.status = LoadingStatus.SUCCESS;
      state.error = null;
    });
    builder.addCase(fetchTasks.pending, (state, { payload }) => {
      state.status = LoadingStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchTasks.rejected, (state, { payload }) => {
      state.status = LoadingStatus.ERORR;
      if (typeof payload === 'string') {
        state.error = payload;
      } else {
        state.error = 'unknown error';
      }
    });

    builder.addCase(fetchCreateTask.fulfilled, (state, { payload }) => {
      taskAdapter.addOne(state, payload);
      state.error = null;
      state.status = LoadingStatus.SUCCESS;
    });
    builder.addCase(fetchCreateTask.pending, (state) => {
      state.status = LoadingStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchCreateTask.rejected, (state, { payload }) => {
      state.status = LoadingStatus.ERORR;
      if (typeof payload === 'string') {
        state.error = payload;
      } else {
        state.error = 'unknown error';
      }
    });

    builder.addCase(fetchUpdateTask.fulfilled, (state, { payload }) => {
      taskAdapter.setOne(state, payload);
      state.error = null;
      state.status = LoadingStatus.SUCCESS;
    });
    builder.addCase(fetchUpdateTask.pending, (state) => {
      state.status = LoadingStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchUpdateTask.rejected, (state, { payload }) => {
      state.status = LoadingStatus.ERORR;
      if (typeof payload === 'string') {
        state.error = payload;
      } else {
        state.error = 'unknown error';
      }
    });

    builder.addCase(fetchDeleteTask.fulfilled, (state, { payload }) => {
      taskAdapter.removeOne(state, payload);
      state.error = null;
      state.status = LoadingStatus.SUCCESS;
    });
    builder.addCase(fetchDeleteTask.pending, (state) => {
      state.status = LoadingStatus.LOADING;
      state.error = null;
    });
  },
});

export default taskSlice.reducer;

export const { setLoadingStatus } = taskSlice.actions;
