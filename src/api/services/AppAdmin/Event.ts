import { defHttp } from '/@/utils/http/axios';
import { GameShopModel, PlayerModel, ScriptModel } from '.';
import { ProductModel } from '.././AppMerchant/Product';
import { PagedResp, int, int64 } from '.././basic';

export interface EventModel {
  id: string;
  owner_id: string;
  title: string;
  content: string;
  group_avatar_url: string;
  num_member_total: number;
  num_member_joined: number;
  status: number;
  group_name: string;
  product_id: string;
  shop_id: string;
  script_id: string;
  script_name: string;
  created_at: string;
  updated_at: string;
}
export interface EventListReq {
  page: int;
  pageSize: int;
  status: number[];
  // page: number;
  // owner: PlayerModel;
  // pageSize: number;
  // ownerId?: string;
  // title?: string;
}
export interface EventUpdateReq {
  id: string;
  title: string;
  content: string;
  imageUrls: string[];
  numMemberTotal: number;
  numMemberJoined: number;
  ownerId: string;
  shopId: string;
  status: number;
  productId: string;
  scriptId: string;
}
export interface EventCreateReq {
  title: string;
  content: string;
  imageUrls: string[];
  numMemberTotal: number;
  numMemberJoined: number;
  status: number;
  ownerId: string;
  productId: string;
  shopId: string;
  scriptId: string;
}

export class EventAPI {
  // http: AxiosInstance
  resPath = '/events';
  // constructor(axIns) {
  //     this.http = axIns
  // }
  get(id: string, preloads: string[] = []) {
    const config = preloads ? { params: { preloads } } : null;
    return defHttp.get<EventModel>({ url: this.resPath + '/' + id, params: config });
  }
  list(req: EventListReq) {
    return defHttp.get<PagedResp<EventModel>>({ url: this.resPath, params: req });
  }
  update(req: EventUpdateReq) {
    return defHttp.put({ url: this.resPath + '/' + req.id, params: req });
  }
  delete(id: string) {
    return defHttp.delete({ url: this.resPath + `/${id}` });
  }
  create(req: EventCreateReq) {
    return defHttp.post({ url: this.resPath, params: req });
  }
  cancel(id: string) {
    return defHttp.post({ url: this.resPath + '/' + id + '/cancel' });
  }
  // enable(id: string) {
  //     return defHttp.put(this.resPath + "/" + id, { status: 1 })
  // }
  // disable(id: string) {
  //     return defHttp.put(this.resPath + "/" + id, { status: 0 })
  // }
}
