import { AxiosInstance } from 'axios';
import { ScriptStyleModel } from '.';
import { defHttp } from '/@/utils/http/axios';
import { PagedResp, int, int64 } from '../basic';

export interface ScriptModel {
  id: string;
  name: string;
  numberMax: number;
  numberMin: number;
  minuteDuration: number;
  price: number;
  originalPrice: number;
  coverUrl: string;
  authorName: string;
  publishDate: string;
  description: string;
  detail: string;
  status: number;
  styleIds: string[];
  styles: ScriptStyleModel[];
  updatedAt: string;
  createdAt: string;
}
export interface ScriptListReq {
  page: int;
  pageSize: int;
  keyword: string;
  // preloads: string[];
  // name?: string;
  // status?: number;
}
export interface ScriptUpdateReq {
  script_id: string;
  price: number;
}
export interface ScriptCreateReq {
  scriptId: string;
  price: number;
  originalPrice: number;
}
export class ScriptAPI {
  // http: AxiosInstance
  resPath = '/script';
  // constructor(axIns) {
  //     this.http = axIns
  // }
  get(id: string, preloads: string[] = []) {
    // let config = preloads ? { params: { preloads } } : null
    return defHttp.get<ScriptModel>({ url: this.resPath + '/' + id, params: { preloads } });
  }
  // list(req: ScriptListReq) {
  //   return defHttp.get<PagedResp<ScriptModel>>({ url: this.resPath, params: req });
  // }
  list(req: ScriptListReq) {
    return defHttp.get({ url: this.resPath, params: req });
  }
  update(req: ScriptUpdateReq) {
    return defHttp.put({ url: this.resPath + '/change_price', params: req });
  }
  delete(req: string[]) {
    return defHttp.delete({ url: this.resPath, params: req });
  }
  create(req: ScriptCreateReq[]) {
    return defHttp.post({ url: this.resPath, params: req });
  }
  // enable(id: string) {
  //     return this.http.put(this.resPath + "/" + id, { status: 1 })
  // }
  // disable(id: string) {
  //     return this.http.put(this.resPath + "/" + id, { status: 0 })
  // }
}
