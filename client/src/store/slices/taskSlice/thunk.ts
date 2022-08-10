import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskAPI } from 'api/taskApi';
import { ITask } from 'models/ITask';
import { RequestErrorType, TaskPayloadType } from 'models/utilsTypes';

export const fetchTasks = createAsyncThunk('task/fetchTasks', async (eventId: string, thunkAPI) => {
  try {
    const response = await taskAPI.getByEvent(eventId);
    return response;
  } catch (error) {
    const err = error as RequestErrorType;
    return thunkAPI.rejectWithValue(err.response?.data.error);
  }
});

export const fetchCreateTask = createAsyncThunk('task/fetchCreateTask', async (payload: TaskPayloadType, thunkAPI) => {
  try {
    const response = await taskAPI.create(payload);
    return response;
  } catch (error) {
    const err = error as RequestErrorType;
    return thunkAPI.rejectWithValue(err.response?.data.error);
  }
});

export const fetchUpdateTask = createAsyncThunk('task/fetchUpdateTask', async (payload: ITask, thunkAPI) => {
  try {
    const response = await taskAPI.update(payload);
    return response;
  } catch (error) {
    const err = error as RequestErrorType;
    return thunkAPI.rejectWithValue(err.response?.data.error);
  }
});

export const fetchDeleteTask = createAsyncThunk('task/fetchDeleteTask', async (taskId: ITask['_id']) => {
  await taskAPI.delete(taskId);
  return taskId;
});
