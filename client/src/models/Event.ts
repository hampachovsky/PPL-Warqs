import { Moment } from 'moment';

export enum eventType {
  minor = 'minor',
  warning = 'warnings',
  important = 'important',
}

export interface IEvent {
  _id: string;
  title: string;
  text: string;
  eventType: eventType;
  eventDate: string;
  author: string;
  tasks: string[];
}
export type EventFormType = Omit<IEvent, 'author' | '_id' | 'tasks'>;
