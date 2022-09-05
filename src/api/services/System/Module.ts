import { AxiosInstance } from 'axios';
import { ref, Ref } from 'vue';
import { system } from '.';

import { PagedResp, int, int64 } from '../basic';

export interface ModuleModel {
  id: string;
  name: string;
  value: string;
}
export interface ModuleListReq {
  page?: int;
  pageSize?: int;
  name?: string;
  value?: string;
}
export interface ModuleUpdateReq {
  id: string;
  name: string;
  value: string;
}
export interface ModuleCreateReq {
  name: string;
  value: string;
}
export class ModuleAPI {
  http: AxiosInstance;
  resPath = 'system/modules';
  constructor(axIns) {
    this.http = axIns;
  }
  get(id: string) {
    return this.http.get<ModuleModel>(this.resPath + '/' + id);
  }
  list(req: ModuleListReq) {
    return this.http.get<PagedResp<ModuleModel>>(this.resPath, { params: req });
  }
  update(req: ModuleUpdateReq) {
    return this.http.put(this.resPath + '/' + req.id, req);
  }
  delete(id: string) {
    return this.http.delete(this.resPath + `/${id}`);
  }
  create(req: ModuleCreateReq) {
    return this.http.post(this.resPath, req);
  }
  enable(id: string) {
    return this.http.put(this.resPath + '/' + id, { status: 1 });
  }
  disable(id: string) {
    return this.http.put(this.resPath + '/' + id, { status: 0 });
  }
}
