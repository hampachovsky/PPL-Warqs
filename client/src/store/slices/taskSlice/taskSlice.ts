import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskState } from 'models/ITask';
import { LoadingStatus } from 'models/utilsTypes';

const initialState: TaskState = {
  tasks: null,
  status: LoadingStatus.IDLE,
  error: null,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setLoadingStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {},
});

export default taskSlice.reducer;

export const { setLoadingStatus } = taskSlice.actions;
