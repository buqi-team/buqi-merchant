import { defHttp } from '/@/utils/http/axios';
import { PagedResp, int, int64 } from '../basic';
import { PlayerModel } from './Player';
import { EventModel } from './Event';
export interface OrderModel {
  id: string;
  event: EventModel;
  event_id: string;
  player: PlayerModel[];
  player_id: string;
  status: number;
  created_at: string;
  updated_at: string;
}
export interface OrderListReq {
  page: int;
  pageSize: int;
  status: number[];
  startDate: string;
  endDate: string;
}
// export interface PlayerUpdateReq {
//   id: string;
//   phoneCountry: number;
//   phoneNumber: string;
//   username: string;
//   screenName: string;
//   password: string;
//   avatarUrl: string;
//   status: number;
//   roleIds: string[];
//   gender: string;
//   motto: string;
//   email: string;
//   shopId: string;
// }
export interface OrderRefundReq {
  orderId: string;
}
export class OrderAPI {
  //     http: AxiosInstance
  resPath = '/order';
  //     constructor(axIns) {
  //         this.http = axIns
  //     }
  //   get(id: string, preloads: string[] = []) {
  //     let config = preloads ? { params: { preloads } } : null;
  //     return defHttp.get<PlayerModel>({ url: this.resPath + '/' + id, params: config });
  //   }
  list(req: OrderListReq) {
    return defHttp.get<PagedResp<OrderModel>>({ url: this.resPath, params: req });
  }
  refund(req: OrderRefundReq) {
    return defHttp.post({ url: this.resPath + '/refund', params: req });
  }
  //   update(req: PlayerUpdateReq) {
  //     return defHttp.put({ url: this.resPath + '/' + req.id, params: req });
  //   }
  //   delete(id: string) {
  //     return defHttp.delete({ url: this.resPath + `/${id}` });
  //   }
  //   create(req: PlayerCreateReq) {
  //     return defHttp.post({ url: this.resPath, params: req });
  //   }
  //     enable(id: string) {
  //         return this.http.put(this.resPath + "/" + id, { status: 1 })
  //     }
  //     disable(id: string) {
  //         return this.http.put(this.resPath + "/" + id, { status: 0 })
  //     }
}
