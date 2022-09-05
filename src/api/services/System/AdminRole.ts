import { AxiosInstance } from 'axios';

import { PagedResp, int, int64 } from '../basic';

export interface AdminRoleModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  remark: string;
  name: string;
  value: string;
  weight: number;
  status: number;
  permissions: PermModel[];
}
export interface AdminRoleListReq {
  page: int;
  pageSize: int;
  preloads: string[];
  name?: string;
  value?: string;
  status?: number;
}
export interface AdminRoleUpdateReq {
  id: string;
  remark: string;
  name: string;
  value: string;
  weight: number;
  status: number;
}
export interface AdminRoleCreateReq {
  remark: string;
  name: string;
  value: string;
  weight: number;
  status: number;
}
export class AdminRoleAPI {
  http: AxiosInstance;
  resPath = 'system/admin_roles';
  constructor(axIns) {
    this.http = axIns;
  }
  get(id: string, preloads: string[] = []) {
    const config = preloads ? { params: preloads } : null;
    return this.http.get<AdminRoleModel>(this.resPath + '/' + id, config);
  }
  list(req: AdminRoleListReq) {
    return this.http.get<PagedResp<AdminRoleModel>>(this.resPath, { params: req });
  }
  update(req: AdminRoleUpdateReq) {
    return this.http.put(this.resPath + '/' + req.id, req);
  }
  delete(id: string) {
    return this.http.delete(this.resPath + `/${id}`);
  }
  create(req: AdminRoleCreateReq) {
    return this.http.post(this.resPath, req);
  }
  enable(id: string) {
    return this.http.put(this.resPath + '/' + id, { status: 1 });
  }
  disable(id: string) {
    return this.http.put(this.resPath + '/' + id, { status: 0 });
  }
}
