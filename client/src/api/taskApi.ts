import { IEvent } from './../models/Event';
import { instance } from 'api';
import { EventPayloadType } from 'models/utilsTypes';
import { ITask } from 'models/ITask';

export const taskAPI = {
  async getByEvent(eventId: string): Promise<ITask[]> {
    const response = await instance.get(`/tasks/ev/${eventId}`);
    return response.data;
  },
  async create(event: EventPayloadType): Promise<IEvent> {
    const response = await instance.post('/events', event);
    return response.data;
  },
  async update(event: IEvent): Promise<IEvent> {
    const response = await instance.put(`/events/${event._id}`, event);
    return response.data;
  },
  async delete(id: string) {
    await instance.delete(`/events/${id}`);
  },
};
