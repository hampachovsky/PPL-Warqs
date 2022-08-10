import { State } from './utilsTypes';

export interface ITask {
  _id: string;
  text: string;
  completed: boolean;
}

export type TaskFormType = {
  text: ITask['text'];
};
