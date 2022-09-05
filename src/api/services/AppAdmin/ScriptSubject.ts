import { AxiosInstance } from 'axios';
import { defHttp } from '/@/utils/http/axios';
import { PagedResp, int } from '../basic';

export interface ScriptSubjectModel {
  id: string;
  name: string;
  weight: number;
  status: number;
  created_at: string;
  updated_at: string;
}
export interface ScriptSubjectListReq {
  page: int;
  pageSize: int;
  name?: string;
  status?: number;
}
export interface ScriptSubjectDeleteReq {
  id: string[];
}
export interface ScriptSubjectUpdateReq {
  id: string;
  name: string;
  // weight: number;
  // status: number;
}
export interface ScriptSubjectCreateReq {
  name: string;
  // weight: number;
  // status: number;
}

export class ScriptSubjectAPI {
  //   http: AxiosInstance;
  resPath = '/app/admin/script/scriptSubject';
  //   constructor(axIns) {
  //     this.http = axIns;
  //   }
  //   get(id: string) {
  //     return this.http.get<ScriptStyleModel>(this.resPath + '/' + id);
  //   }
  list(req: ScriptSubjectListReq) {
    return defHttp.get<PagedResp<ScriptSubjectModel>>(
      { url: this.resPath, params: req },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }
  update(req: ScriptSubjectUpdateReq) {
    return defHttp.put(
      { url: this.resPath, params: req },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }
  delete(req: ScriptSubjectDeleteReq) {
    return defHttp.delete(
      { url: this.resPath, params: req },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }
  create(req: ScriptSubjectCreateReq) {
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
