import { State } from './utilsTypes';

export interface ITask {
  _id: string;
  text: string;
  completed: boolean;
}

export interface TaskState extends State {
  tasks: ITask[] | null;
}

export type TaskFormType = Omit<ITask, '_id' | 'completed'>;
