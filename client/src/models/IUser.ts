import { IEvent } from './Event';
import { LoadingStatus, State } from './utilsTypes';

export interface IUser {
  _id: string;
  username: string;
}

export interface UserState extends State {
  user: IUser | null;
  isAuth: boolean;
}
