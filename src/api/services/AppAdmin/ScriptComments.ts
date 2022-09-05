import { number } from '@intlify/core-base';
import { PagedResp, int, int64 } from '../basic';
import { defHttp } from '/@/utils/http/axios';
export interface ScriptCommentsModel {
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

export interface ScriptCommentsListReq {
  page: int;
  pageSize: int;
  shopId: string;
}

export class ScriptCommentsAPI {
  resPath = '/app/admin/script/comments';
  list(req: ScriptCommentsListReq) {
    return defHttp.get(
      { url: this.resPath, params: req },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }
  delete(req: Array<string>) {
    return defHttp.delete(
      { url: this.resPath, params: req },
      { apiUrl: 'https://buqi.4536251.cn:9991/api/v1' },
    );
  }
}
