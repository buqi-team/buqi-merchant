import { defHttp } from '/@/utils/http/axios';
import { PagedResp, int, int64 } from '../basic';
import { PlayerRoleModel } from './PlayerRole';
export interface MerchantModel {
  avatar_url: string;
  created_at: string;
  deleted_at: string;
  id: string;
  shop_id: string;
  operator_id: string;
  phone_number: string;
  screen_name: string;
  status: number;
  updated_at: number;
  username: string;
}
export interface MerchantCreateReq {
  username: string;
  screen_name: string;
  phone: string;
  shop_id: string;
  motto: string;
  avatar_url: string;
}
export interface MerchantUpdateReq {
  id: string;
  username: string;
  screen_name: string;
  phone: string;
  motto: string;
  avatar_url: string;
}

export interface MerchantListReq {
  shopId: string;
  page: int;
  pageSize: int;
}

export class MerchantAPI {
  resPath = '/app/admin/merchant';
  list(req: MerchantListReq) {
    return defHttp.get<PagedResp<MerchantModel>>(
      { url: this.resPath, params: req },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }
  create(req: MerchantCreateReq) {
    return defHttp.post(
      { url: this.resPath, params: req },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }
  update(req: MerchantUpdateReq) {
    return defHttp.put(
      { url: this.resPath, params: req },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }
  delete(id: Array<string>) {
    return defHttp.delete(
      { url: this.resPath, params: id },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }
}
