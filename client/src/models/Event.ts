import { ITask } from './ITask';

export enum eventType {
  minor = 'minor',
  warning = 'warning',
  important = 'important',
}

export interface IEvent {
  _id: string;
  title: string;
  text: string;
  eventType: eventType;
  eventDate: string;
  tasks: ITask[];
}

export type EventFormType = Omit<IEvent, '_id' | 'tasks'>;

export type EventListDataType = Omit<IEvent, 'tasks'>;
