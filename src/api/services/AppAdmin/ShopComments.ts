import { number } from '@intlify/core-base';
import { PagedResp, int, int64 } from '../basic';
import { defHttp } from '/@/utils/http/axios';
interface ownerModel {
  phone_number: string;
  screen_name: string;
  username: string;
}

export interface ShopCommentsModel {
  id: string;
  content: string;
  created_at: number;
  owner: ownerModel;
}

export interface ShopCommentsListReq {
  page: int;
  pageSize: int;
  shopId: string;
}

export class ShopCommentsAPI {
  resPath = '/comments';
  list(req: ShopCommentsListReq) {
    return defHttp.get(
      { url: this.resPath, params: req },
      // { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' }
    );
  }
  delete(req: Array<string>) {
    return defHttp.delete(
      { url: this.resPath, params: req },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }
}
