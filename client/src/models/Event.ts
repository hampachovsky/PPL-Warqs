import { LoadingStatus } from './utilsTypes';

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
}

export interface EventState {
  events: IEvent[] | null;
  status: LoadingStatus;
  error: string | null;
}

export type EventListDataType = Omit<IEvent, 'tasks'>;
