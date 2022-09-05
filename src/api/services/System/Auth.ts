import { AxiosInstance } from 'axios';
import { AdminModel } from '.';

export interface LoginReq {
  username: string;
  password: string;
}

export interface LoginResp {
  id: string;
  token: string;
  expiresAt: number;
}

export class AuthAPI {
  service: AxiosInstance;
  resPath = '/system/auth';

  constructor(axIns) {
    this.service = axIns;
  }
  login(req: LoginReq) {
    return this.service.post<LoginResp>(this.resPath + '/login', req);
  }
  getProfile(id: string) {
    return this.service.get<AdminModel>(this.resPath + '/profile');
  }
}
