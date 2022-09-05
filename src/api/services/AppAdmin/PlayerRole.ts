// @autocode prevent overwrite
import { defHttp } from '/@/utils/http/axios';
import { AxiosInstance } from 'axios';

import { PagedResp, int, int64 } from '../basic';
import { PermModel } from '../System/Perm';

export interface PlayerRoleModel {
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
export interface PlayerRoleListReq {
  page: int;
  pageSize: int;
  name?: string;
  value?: string;
  status?: number;
}
export interface PlayerRoleUpdateReq {
  id: string;
  remark: string;
  name: string;
  value: string;
  weight: number;
  status: number;
}
export interface PlayerRoleCreateReq {
  remark: string;
  name: string;
  value: string;
  weight: number;
  status: number;
}

export interface PlayerRolePermsUpdateReq {
  roleId: string;
  permIds: string[];
}
export class PlayerRoleAPI {
  // http: AxiosInstance;
  resPath = '/app/admin/player_roles';
  // constructor(axIns) {
  //   this.http = axIns;
  // }
  // updatePerms(req: PlayerRolePermsUpdateReq) {
  //   return this.http.put(this.resPath + '/' + req.roleId + '/perms', req);
  // }
  // get(id: string, preloads: string[] = []) {
  //   let config = preloads ? { params: { preloads } } : null;
  //   return this.http.get<PlayerRoleModel>(this.resPath + '/' + id, config);
  // }
  list(req: PlayerRoleListReq) {
    return defHttp.get<PagedResp<PlayerRoleModel>>({ url: this.resPath, params: req });
  }
  // update(req: PlayerRoleUpdateReq) {
  //   return this.http.put(this.resPath + '/' + req.id, req);
  // }

  // delete(id: string) {
  //   return this.http.delete(this.resPath + `/${id}`);
  // }
  // create(req: PlayerRoleCreateReq) {
  //   return this.http.post(this.resPath, req);
  // }
  // enable(id: string) {
  //   return this.http.put(this.resPath + '/' + id, { status: 1 });
  // }
  // disable(id: string) {
  //   return this.http.put(this.resPath + '/' + id, { status: 0 });
  // }
}
