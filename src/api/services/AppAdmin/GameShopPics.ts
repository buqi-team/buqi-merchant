import { number } from '@intlify/core-base';
import { PagedResp, int, int64 } from '../basic';
import { defHttp } from '/@/utils/http/axios';

export interface GameShopPictureModel {
  id: string;
  shop_id: string;
  url: string;
}
export interface GameShopPicsListReq {
  page: int;
  pageSize: int;
}
export interface GameShopPicsCreateReq {
  urls: string[];
}
export interface GameShopPicsDeleteReq {
  id: string[];
}

export class GameShopPicsAPI {
  // http: AxiosInstance;
  resPath = '/pics';
  // constructor(axIns) {
  //   this.http = axIns;
  // }
  //   get(id: string) {
  //     return defHttp.get<GameShopModel>({ url: this.resPath + '/' + id });
  //   }
  create(req: GameShopPicsCreateReq) {
    return defHttp.post({ url: this.resPath, params: req });
  }
  list(req: GameShopPicsListReq) {
    return defHttp.get({ url: this.resPath, params: req });
  }
  delete(req: GameShopPicsDeleteReq) {
    return defHttp.delete({ url: this.resPath, params: req });
  }
}
