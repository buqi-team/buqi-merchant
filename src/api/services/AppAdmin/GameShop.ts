import { PagedResp, int, int64 } from '../basic';
import { defHttp } from '/@/utils/http/axios';
export interface GameShopModel {
  name: string;
  id: string;
  cover_url: string;
  banner_url: string;
  logo_url: string;
  summary: string;
  detail: string;
  manager: string;
  manager_phone: string;
  map_pos_lng: number;
  map_pos_lat: number;
  map_region: number;
  map_address: string;
  settled_date: string;
  support_wechat: string;
  support_phone: string;
  status: number;
  created_at: string;
  updated_at: string;
}
export interface GameShopListReq {
  page: int;
  pageSize: int;
  keyword: string;
  // name?: string;
  // status?: number;
}
export interface GameShopUpdateReq {
  name: string;
  cover_url: string;
  banner_url: string;
  logo_url: string;
  summary: string;
  detail: string;
  manager: string;
  manager_phone: string;
  map_pos_lng: number;
  map_pos_lat: number;
  map_region: number;
  map_address: string;
  settled_date: number;
  support_wechat: string;
  support_phone: string;
  rating: number;
  opening_hours: string;
  status: number;
}
export interface GameShopCreateReq {
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
export class GameShopAPI {
  // http: AxiosInstance;
  resPath = '/shop';
  // constructor(axIns) {
  //   this.http = axIns;
  // }
  get() {
    return defHttp.get<GameShopModel>({ url: this.resPath });
  }
  update(req: GameShopUpdateReq) {
    return defHttp.put({ url: this.resPath, params: req });
  }
  list(req: GameShopListReq) {
    return defHttp.get<PagedResp<GameShopModel>>({ url: this.resPath, params: req });
  }

  delete(id: string) {
    return defHttp.delete({ url: this.resPath + `/${id}` });
  }
  create(req: GameShopCreateReq) {
    return defHttp.post({ url: this.resPath, params: req });
  }
  enable(id: string) {
    return defHttp.put({ url: this.resPath + '/' + id, params: { status: 1 } });
  }
  disable(id: string) {
    return defHttp.put({ url: this.resPath + '/' + id, params: { status: 0 } });
  }
}
