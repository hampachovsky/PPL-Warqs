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
