// #autocode prevent overwrite

import { AxiosInstance } from 'axios';
import { ModuleResourceModel } from '.';

import { PagedResp, int, int64 } from '../basic';

export interface PermModel {
  id: string;
  name: string;
  value: string;
  node: string;
  resourceId: string;
  resource: ModuleResourceModel;
  createdAt: BigInt;
  updatedAt: BigInt;
}
export interface PermListReq {
  page: int;
  pageSize: int;
  name?: string;
  value?: string;
}
export interface PermUpdateReq {
  id: string;
  name: string;
  value: string;
  resourceId: string;
}
export interface PermCreateReq {
  name: string;
  value: string;
  resourceId: string;
}
export class PermAPI {
  http: AxiosInstance;
  resPath = 'system/perms';
  constructor(axIns) {
    this.http = axIns;
  }
  get(id: string) {
    return this.http.get<PermModel>(this.resPath + '/' + id);
  }
  list(req: PermListReq) {
    return this.http.get<PagedResp<PermModel>>(this.resPath, { params: req });
  }
  update(req: PermUpdateReq) {
    return this.http.put(this.resPath + '/' + req.id, req);
  }
  delete(id: string) {
    return this.http.delete(this.resPath + `/${id}`);
  }
  create(req: PermCreateReq) {
    return this.http.post(this.resPath, req);
  }
  enable(id: string) {
    return this.http.put(this.resPath + '/' + id, { status: 1 });
  }
  disable(id: string) {
    return this.http.put(this.resPath + '/' + id, { status: 0 });
  }
}
