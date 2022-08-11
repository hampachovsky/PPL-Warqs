import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskAPI } from 'api/taskApi';
import { ITask } from 'models/ITask';
import { RequestErrorType, TaskPayloadType } from 'models/utilsTypes';
import { ActionType } from './types';

export const fetchTasks = createAsyncThunk(ActionType.FETCH_TASKS, async (eventId: string, thunkAPI) => {
  try {
    const response = await taskAPI.getByEvent(eventId);
    return response;
  } catch (error) {
    const err = error as RequestErrorType;
    return thunkAPI.rejectWithValue(err.response?.data.error);
  }
});

export const fetchCreateTask = createAsyncThunk(
  ActionType.FETCH_CREATE_TASK,
  async (payload: TaskPayloadType, thunkAPI) => {
    try {
      const response = await taskAPI.create(payload);
      return response;
    } catch (error) {
      const err = error as RequestErrorType;
      return thunkAPI.rejectWithValue(err.response?.data.error);
    }
  },
);

export const fetchUpdateTask = createAsyncThunk(ActionType.FETCH_UPDATE_TASK, async (payload: ITask, thunkAPI) => {
  try {
    const response = await taskAPI.update(payload);
    return response;
  } catch (error) {
    const err = error as RequestErrorType;
    return thunkAPI.rejectWithValue(err.response?.data.error);
  }
});

export const fetchDeleteTask = createAsyncThunk(ActionType.FETCH_DELETE_TASK, async (taskId: ITask['_id']) => {
  await taskAPI.delete(taskId);
  return taskId;
});
