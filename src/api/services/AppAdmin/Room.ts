import { number } from '@intlify/core-base';
import { PagedResp, int, int64 } from '../basic';
import { defHttp } from '/@/utils/http/axios';

export interface RoomsModel {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}
export interface RoomsListReq {
  page: int;
  pageSize: int;
}
export interface RoomsCreateReq {
  name: string;
}
// export interface RoomsDeleteReq {
//   id: string[];
// }
export interface RoomsUpdateReq {
  id: string;
  name: string;
}

export class RoomsAPI {
  // http: AxiosInstance;
  resPath = '';
  // constructor(axIns) {
  //   this.http = axIns;
  // }
  //   get(id: string) {
  //     return defHttp.get<GameShopModel>({ url: this.resPath + '/' + id });
  //   }
  create(req: RoomsCreateReq) {
    return defHttp.post({ url: this.resPath + '/room', params: req });
  }
  update(req: RoomsUpdateReq) {
    return defHttp.put({ url: this.resPath + '/room', params: req });
  }
  list(req: RoomsListReq) {
    return defHttp.get({ url: this.resPath + '/rooms', params: req });
  }
  delete(req: string[]) {
    return defHttp.delete({ url: this.resPath + '/rooms', params: req });
  }
}
