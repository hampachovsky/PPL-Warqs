import { instance } from 'api';
import { TaskApiRoutes } from 'constatns/apiRoute';
import { ITask } from 'models/ITask';
import { TaskPayloadType } from 'models/utilsTypes';

export const taskAPI = {
  async getByEvent(eventId: string): Promise<ITask[]> {
    const response = await instance.get(`${TaskApiRoutes.GET_BY_EVENT}${eventId}`);
    return response.data;
  },
  async create(payload: TaskPayloadType): Promise<ITask> {
    const response = await instance.post(TaskApiRoutes.CREATE, payload);
    return response.data;
  },
  async update(task: ITask): Promise<ITask> {
    const response = await instance.put(`${TaskApiRoutes.UPDATE}${task._id}`, task);
    return response.data;
  },
  async delete(id: ITask['_id']) {
    await instance.delete(`${TaskApiRoutes.DELETE}${id}`);
  },
};
