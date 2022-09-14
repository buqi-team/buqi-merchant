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
export interface ScriptImportMatchReq {
  name: string;
}

export interface ScriptSearchListReq {
  page: int;
  pageSize: int;
  keyword: string;
}

export class ScriptSearchAPI {
  // http: AxiosInstance
  resPath = '/script';
  // constructor(axIns) {
  //     this.http = axIns
  // }
  // get(id: string, preloads: string[] = []) {
  //   // let config = preloads ? { params: { preloads } } : null
  //   return defHttp.get<ScriptModel>({ url: this.resPath + '/' + id, params: { preloads } });
  // }
  find(req: ScriptImportMatchReq) {
    return defHttp.get<PagedResp<ScriptModel>>({ url: this.resPath + '/findByName', params: req });
  }
  get(req: ScriptSearchListReq) {
    return defHttp.get<PagedResp<ScriptModel>>({ url: this.resPath + '/search', params: req });
  }

  //   update(req: ScriptUpdateReq) {
  //     return defHttp.put({ url: this.resPath + '/' + req.id, params: req });
  //   }
  //   delete(id: string) {
  //     return defHttp.delete({ url: this.resPath + `/${id}` });
  //   }
  //   create(req: ScriptCreateReq) {
  //     return defHttp.post({ url: this.resPath, params: req });
  //   }
  // enable(id: string) {
  //     return this.http.put(this.resPath + "/" + id, { status: 1 })
  // }
  // disable(id: string) {
  //     return this.http.put(this.resPath + "/" + id, { status: 0 })
  // }
}
