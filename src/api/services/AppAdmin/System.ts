import { defHttp } from '/@/utils/http/axios';
import { PagedResp, int, int64 } from '../basic';
import { PlayerRoleModel } from './PlayerRole';
export interface UserModel {
  avatar_url: string;
  created_at: string;
  deleted_at: string;
  email: string;
  id: string;
  motto: string;
  operator_id: string;
  phone: string;
  screen_name: string;
  status: number;
  updated_at: number;
  username: string;
}
export interface UserCreateReq {
  username: string;
  screen_name: string;
  phone: string;
  email: string;
  motto: string;
  avatar_url: string;
}
export interface UserUpdateReq {
  id: string;
  username: string;
  screen_name: string;
  phone: string;
  email: string;
  motto: string;
  avatar_url: string;
}

export interface UserListReq {
  page: int;
  pageSize: int;
}
export interface UserPswUpdateReq {
  id: string;
  newPassword: string;
}

export class SystemAPI {
  //     http: AxiosInstance
  resPath = '/app/admin/system';
  //     constructor(axIns) {
  //         this.http = axIns
  //     }
  // get(id: string, preloads: string[] = []) {
  //   let config = preloads ? { params: { preloads } } : null;
  //   return defHttp.get<PlayerModel>({ url: this.resPath + '/' + id, params: config });
  // }
  list(req: UserListReq) {
    return defHttp.get<PagedResp<UserModel>>(
      { url: this.resPath + '/admin_list', params: req },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }
  create(req: UserCreateReq) {
    return defHttp.post(
      { url: this.resPath + '/admin', params: req },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }
  update(req: UserUpdateReq) {
    return defHttp.put(
      { url: this.resPath + '/admin', params: req },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }
  delete(id: Array<string>) {
    return defHttp.delete(
      { url: this.resPath + '/admin', params: id },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }

  password(req: UserPswUpdateReq) {
    return defHttp.put(
      { url: this.resPath + '/change_password', params: req },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }

  // update(req: PlayerUpdateReq) {
  //   return defHttp.put({ url: this.resPath + '/' + req.id, params: req });
  // }
  // delete(id: string) {
  //   return defHttp.delete({ url: this.resPath + `/${id}` });
  // }
  // create(req: PlayerCreateReq) {
  //   return defHttp.post({ url: this.resPath, params: req });
  // }
  //     enable(id: string) {
  //         return this.http.put(this.resPath + "/" + id, { status: 1 })
  //     }
  //     disable(id: string) {
  //         return this.http.put(this.resPath + "/" + id, { status: 0 })
  //     }
}
