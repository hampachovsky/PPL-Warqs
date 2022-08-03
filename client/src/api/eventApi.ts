import { IEvent } from './../models/Event';
import { instance } from 'api';
import { EventPayloadType } from 'models/utilsTypes';

export const eventAPI = {
  async getAll(): Promise<IEvent[]> {
    const response = await instance.get('/events/all');
    return response.data;
  },
  async create(event: EventPayloadType): Promise<IEvent> {
    const response = await instance.post('/events', event);
    return response.data;
  },
};
