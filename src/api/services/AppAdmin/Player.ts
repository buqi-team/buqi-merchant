import { defHttp } from '/@/utils/http/axios';
import { PagedResp, int, int64 } from '../basic';
import { PlayerRoleModel } from './PlayerRole';
export interface PlayerModel {
  id: string;
  openId: string;
  shopId: string;
  username: string;
  screenName: string;
  phoneCountry: number;
  phoneNumber: string;
  password: string;
  avatarUrl: string;
  status: number;
  gender: string;
  motto: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
export interface PlayerListReq {
  page: int;
  pageSize: int;
  keyword: string;
  // preloads: string[];
  // username?: string;
  // screenName?: string;
  // email?: string;
  // phoneNumber?: string;
  // status?: number;
}
export interface PlayerUpdateReq {
  id: string;
  phoneCountry: number;
  phoneNumber: string;
  username: string;
  screenName: string;
  password: string;
  avatarUrl: string;
  status: number;
  roleIds: string[];
  gender: string;
  motto: string;
  email: string;
  shopId: string;
}
export interface PlayerCreateReq {
  phoneCountry: number;
  phoneNumber: string;
  username: string;
  screenName: string;
  password: string;
  avatarUrl: string;
  status: number;
  roleIds: string[];
  gender: string;
  motto: string;
  email: string;
  shopId: string;
}
export class PlayerAPI {
  //     http: AxiosInstance
  resPath = '/app/admin/players';
  //     constructor(axIns) {
  //         this.http = axIns
  //     }
  get(id: string, preloads: string[] = []) {
    const config = preloads ? { params: { preloads } } : null;
    return defHttp.get<PlayerModel>({ url: this.resPath + '/' + id, params: config });
  }
  list(req: PlayerListReq) {
    return defHttp.get<PagedResp<PlayerModel>>(
      { url: '/app/admin/player', params: req },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }
  update(req: PlayerUpdateReq) {
    return defHttp.put({ url: this.resPath + '/' + req.id, params: req });
  }
  delete(id: string) {
    return defHttp.delete({ url: this.resPath + `/${id}` });
  }
  create(req: PlayerCreateReq) {
    return defHttp.post({ url: this.resPath, params: req });
  }
  //     enable(id: string) {
  //         return this.http.put(this.resPath + "/" + id, { status: 1 })
  //     }
  //     disable(id: string) {
  //         return this.http.put(this.resPath + "/" + id, { status: 0 })
  //     }
}
