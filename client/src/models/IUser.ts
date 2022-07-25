import { IEvent } from './Event';
import { LoadingStatus } from './utilsTypes';

export interface IUser {
  _id: string;
  username: string;
}

export interface UserState {
  user: IUser | null;
  status: LoadingStatus;
  error: string | null;
  isAuth: boolean;
}
