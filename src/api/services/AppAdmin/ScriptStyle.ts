import { AxiosInstance } from 'axios';
import { defHttp } from '/@/utils/http/axios';
import { PagedResp, int } from '../basic';

export interface ScriptStyleModel {
  id: string;
  name: string;
  weight: number;
  status: number;
  created_at: string;
  updated_at: string;
}
export interface ScriptStyleListReq {
  page: int;
  pageSize: int;
  name?: string;
  status?: number;
}
export interface ScriptStyleDeleteReq {
  id: string[];
}
export interface ScriptStyleUpdateReq {
  id: string;
  name: string;
  // weight: number;
  // status: number;
}
export interface ScriptStyleCreateReq {
  name: string;
  // weight: number;
  // status: number;
}

export class ScriptStyleAPI {
  //   http: AxiosInstance;
  resPath = '/app/admin/script/scriptStyle';
  //   constructor(axIns) {
  //     this.http = axIns;
  //   }
  //   get(id: string) {
  //     return this.http.get<ScriptStyleModel>(this.resPath + '/' + id);
  //   }
  list(req: ScriptStyleListReq) {
    return defHttp.get<PagedResp<ScriptStyleModel>>(
      { url: this.resPath, params: req },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }
  update(req: ScriptStyleUpdateReq) {
    return defHttp.put(
      { url: this.resPath, params: req },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }
  delete(req: ScriptStyleDeleteReq) {
    return defHttp.delete(
      { url: this.resPath, params: req },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }
  create(req: ScriptStyleCreateReq) {
    return defHttp.post(
      { url: this.resPath, params: req },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }
  //   enable(id: string) {
  //     return this.http.put(this.resPath + '/' + id, { status: 1 });
  //   }
  //   disable(id: string) {
  //     return this.http.put(this.resPath + '/' + id, { status: 0 });
  //   }
}
