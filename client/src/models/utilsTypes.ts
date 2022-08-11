import { AxiosError } from 'axios';
import { IEvent } from 'models/Event';
import { ITask } from './ITask';
import { IUser } from './IUser';

export enum LoadingStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERORR = 'ERROR',
}

export type FiltersType = {
  type: string;
  date: string;
  queryString: string;
};

export interface State {
  status: LoadingStatus;
  error: string | null;
}

export interface EventState extends State {
  filters: FiltersType;
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
  from: { pathname: string; search: string };
};

export type EventPayloadType = Omit<IEvent, '_id'>;

export type RequestErrorType = AxiosError<{ error: string }>;

export type TaskPayloadType = {
  text: ITask['text'];
  eventId: IEvent['_id'];
};
