// #autocode prevent overwrite
import { AxiosInstance } from 'axios';
import { AdminRoleModel } from '.';

import { PagedResp, int, int64 } from '../basic';

export interface AdminModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  phoneCountry: number;
  phoneNumber: string;
  email: string;
  username: string;
  screenName: string;
  password: string;
  avatarUrl: string;
  status: number;
  roleIds: string[];
  motto: string;
  roles: AdminRoleModel[];
}
export interface AdminListReq {
  page: int;
  pageSize: int;
  preloads: string[];
  username?: string;
  screenName?: string;
  email?: string;
  phoneNumber?: string;
  status?: number;
}
export interface AdminUpdateReq {
  id: string;
  phoneCountry: number;
  phoneNumber: string;
  email: string;
  username: string;
  screenName: string;
  password: string;
  avatarUrl: string;
  status: number;
  roleIds: string[];
  motto: string;
}
export interface AdminCreateReq {
  phoneCountry: number;
  phoneNumber: string;
  email: string;
  username: string;
  screenName: string;
  password: string;
  avatarUrl: string;
  status: number;
  roleIds: string[];
  motto: string;
}
export class AdminAPI {
  http: AxiosInstance;
  resPath = 'system/admins';
  constructor(axIns) {
    this.http = axIns;
  }
  get(id: string, preloads: string[] = []) {
    const config = preloads ? { params: { preloads } } : null;
    return this.http.get<AdminModel>(this.resPath + '/' + id, config);
  }
  list(req: AdminListReq) {
    return this.http.get<PagedResp<AdminModel>>(this.resPath, { params: req });
  }
  update(req: AdminUpdateReq) {
    return this.http.put(this.resPath + '/' + req.id, req);
  }
  delete(id: string) {
    return this.http.delete(this.resPath + `/${id}`);
  }
  create(req: AdminCreateReq) {
    return this.http.post(this.resPath, req);
  }
  enable(id: string) {
    return this.http.put(this.resPath + '/' + id, { status: 1 });
  }
  disable(id: string) {
    return this.http.put(this.resPath + '/' + id, { status: 0 });
  }
}
