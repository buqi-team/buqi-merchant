import { number } from '@intlify/core-base';
import { PagedResp, int, int64 } from '../basic';
import { defHttp } from '/@/utils/http/axios';
export interface GameShopScriptModel {
  author_name: string;
  boxed: boolean;
  city_exclusive: boolean;
  cover_url: string;
  created_at: number;
  description: string;
  detail: string;
  id: string;
  minute_duration: number;
  name: string;
  number_female: number;
  number_male: number;
  number_max: number;
  number_min: number;
  publish_date: number;
  publish_time: number;
  rate: number;
  shop_exclusive: boolean;
  status: 1;
  updated_at: number;
}

export interface GameShopScriptListReq {
  page: int;
  pageSize: int;
  shopId: string;
}
export interface GameShopScriptUpdateReq {
  id: string;
  name: string;
  coverUrl: string;
  bannerUrl: string;
  logoUrl: string;
  summary: string;
  detail: string;
  manager: string;
  managerPhone: string;
  mapPosLng: number;
  mapPosLat: number;
  mapRegion: number;
  mapAddress: string;
  settledDate: number;
  supportWechat: string;
  supportPhone: string;
  status: number;
}
export interface ShopScriptModel {
  price: number;
  originalPrice: number;
  scriptId: string;
}
export interface GameShopScriptCreateReq {
  scripts: ShopScriptModel[];
  shopId: string;
}
export interface GameShopScriptDeleteReq {
  scripts: string[];
  shopId: string;
}

export class GameShopScriptAPI {
  // http: AxiosInstance;
  resPath = '/app/admin/shop';
  // constructor(axIns) {
  //   this.http = axIns;
  // }
  //   get(id: string) {
  //     return defHttp.get<GameShopModel>({ url: this.resPath + '/' + id });
  //   }
  list(req: GameShopScriptListReq) {
    //店铺剧本列表
    return defHttp.get(
      { url: this.resPath + '/script_list', params: req },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }
  create(req: GameShopScriptCreateReq) {
    //添加店铺剧本
    return defHttp.post(
      { url: this.resPath + '/script', params: req },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }

  //   update(req: GameShopUpdateReq) {
  //     return defHttp.put({ url: this.resPath + '/' + req.id, params: req });
  //   }
  delete(req: GameShopScriptDeleteReq) {
    return defHttp.delete(
      { url: this.resPath + '/script', params: req },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }
  //   create(req: GameShopCreateReq) {
  //     return defHttp.post({ url: this.resPath, params: req });
  //   }
  //   enable(id: string) {
  //     return defHttp.put({ url: this.resPath + '/' + id, params: { status: 1 } });
  //   }
  //   disable(id: string) {
  //     return defHttp.put({ url: this.resPath + '/' + id, params: { status: 0 } });
  //   }
}
