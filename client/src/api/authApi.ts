import { instance } from 'api';
import { SignInPayload, SignInResponse } from 'models/utilsTypes';

export const authAPI = {
  login(payload: SignInPayload): Promise<SignInResponse> {
    return instance.post('/auth/login', payload).then((response) => response.data);
  },
};
