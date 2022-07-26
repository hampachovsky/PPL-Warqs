import { instance } from 'api';
import { IUser } from 'models/IUser';
import { SignInPayload, SignInResponse, SignUpPayload } from 'models/utilsTypes';

export const authAPI = {
  async login(payload: SignInPayload): Promise<SignInResponse> {
    const response = await instance.post('/auth/login', payload);
    return response.data;
  },
  async register(payload: SignUpPayload): Promise<string> {
    const response = await instance.post('/auth/register', payload);
    return response.data;
  },
  async authMe(): Promise<IUser> {
    const response = await instance.get('/auth/me');
    return response.data;
  },
};
