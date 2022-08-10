import { IEvent } from './../models/Event';
import { instance } from 'api';
import { EventPayloadType } from 'models/utilsTypes';
import { EventApiRoutes } from 'constatns/apiRoute';

export const eventAPI = {
  async getAll(): Promise<IEvent[]> {
    const response = await instance.get(EventApiRoutes.GET_ALL);
    return response.data;
  },
  async create(event: EventPayloadType): Promise<IEvent> {
    const response = await instance.post(EventApiRoutes.CREATE, event);
    return response.data;
  },
  async update(event: IEvent): Promise<IEvent> {
    const response = await instance.put(`${EventApiRoutes.UPDATE}${event._id}`, event);
    return response.data;
  },
  async delete(id: IEvent['_id']) {
    await instance.delete(`${EventApiRoutes.DELETE}${id}`);
  },
};
