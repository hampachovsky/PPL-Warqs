import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from 'models/ITask';
import { LoadingStatus, State } from 'models/utilsTypes';
import { fetchTasks } from './thunk';

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
  },
});

export default taskSlice.reducer;

export const { setLoadingStatus } = taskSlice.actions;
