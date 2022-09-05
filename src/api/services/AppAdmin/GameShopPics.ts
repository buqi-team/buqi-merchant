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
  shopId: string;
}
export interface GameShopPicsCreateReq {
  shopId: string;
  urls: string[];
}
export interface GameShopPicsDeleteReq {
  id: string[];
}

export class GameShopPicsAPI {
  // http: AxiosInstance;
  resPath = '/app/admin/shop';
  // constructor(axIns) {
  //   this.http = axIns;
  // }
  //   get(id: string) {
  //     return defHttp.get<GameShopModel>({ url: this.resPath + '/' + id });
  //   }
  create(req: GameShopPicsCreateReq) {
    return defHttp.post(
      { url: this.resPath + '/pics', params: req },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }
  list(req: GameShopPicsListReq) {
    return defHttp.get(
      { url: this.resPath + '/pics', params: req },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }
  delete(req: GameShopPicsDeleteReq) {
    return defHttp.delete(
      { url: this.resPath + '/pics', params: req },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }
}
