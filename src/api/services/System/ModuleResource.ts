// #autocode prevent overwrite
import { AxiosInstance } from 'axios';
import { ModuleModel } from '.';

import { PagedResp, int, int64 } from '../basic';

export interface ModuleResourceModel {
  id: string;
  name: string;
  value: string;
  moduleId: string;
  module: ModuleModel;
  createdAt: BigInt;
  updatedAt: BigInt;
}
export interface ModuleResourceListReq {
  page: int;
  pageSize: int;
  name?: string;
  value?: string;
}
export interface ModuleResourceUpdateReq {
  id: string;
  name: string;
  value: string;
  moduleId: string;
}
export interface ModuleResourceCreateReq {
  name: string;
  value: string;
  moduleId: string;
}
export class ModuleResourceAPI {
  http: AxiosInstance;
  resPath = 'system/module_resources';
  constructor(axIns) {
    this.http = axIns;
  }
  get(id: string) {
    return this.http.get<ModuleResourceModel>(this.resPath + '/' + id);
  }
  list(req: ModuleResourceListReq) {
    return this.http.get<PagedResp<ModuleResourceModel>>(this.resPath, { params: req });
  }
  update(req: ModuleResourceUpdateReq) {
    return this.http.put(this.resPath + '/' + req.id, req);
  }
  delete(id: string) {
    return this.http.delete(this.resPath + `/${id}`);
  }
  create(req: ModuleResourceCreateReq) {
    return this.http.post(this.resPath, req);
  }
  enable(id: string) {
    return this.http.put(this.resPath + '/' + id, { status: 1 });
  }
  disable(id: string) {
    return this.http.put(this.resPath + '/' + id, { status: 0 });
  }
}
