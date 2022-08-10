import { IEvent } from 'models/Event';
import { IUser } from './IUser';
import { AxiosError } from 'axios';
import { ITask } from './ITask';

export enum LoadingStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERORR = 'ERROR',
}

export interface State {
  status: LoadingStatus;
  error: string | null;
}

export interface SignInPayload {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface SignUpPayload {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface SignInResponse {
  token: string;
  user: IUser;
}

export type LocationStateType = {
  from: { pathname: string };
};

export type EventPayloadType = Omit<IEvent, '_id'>;

export type RequestErrorType = AxiosError<{ error: string }>;

export type TaskPayloadType = {
  text: ITask['text'];
  eventId: IEvent['_id'];
};
