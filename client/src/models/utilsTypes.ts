import { IUser } from './IUser';
import { AxiosError } from 'axios';

export enum LoadingStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERORR = 'ERROR',
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

export type RequestErrorType = AxiosError<{ error: string }>;
