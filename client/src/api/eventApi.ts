import { IEvent } from './../models/Event';
import { instance } from 'api';

export const eventAPI = {
  async getAll(): Promise<IEvent[]> {
    const response = await instance.get('/events/all');
    return response.data;
  },
};
