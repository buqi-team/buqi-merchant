import { AxiosInstance } from 'axios';

import { PagedResp, int, int64 } from '../basic';

export interface ShopModel {
  id: string;
  createdAt: int64;
  updatedAt: int64;
  deletedAt: int64;
  name: string;
  bannerUrl: string;
  logoUrl: string;
  summary: string;
  detail: string;
  manager: string;
  managerPhone: string;
  position: string;
  region: string;
  address: string;
  settledAt: int64;
  supportWechat: string;
  supportPhone: string;
  status: int;
}
export interface ShopCreateReq {
  name: string;
  bannerUrl: string;
  logoUrl: string;
  summary: string;
  detail: string;
  manager: string;
  managerPhone: string;
  position: string;
  region: string;
  address: string;
  settledAt: int64;
  supportWechat: string;
  supportPhone: string;
  status: int;
}

export interface ShopUpdateReq {
  id: string;
  name: string;
  bannerUrl: string;
  logoUrl: string;
  summary: string;
  detail: string;
  manager: string;
  managerPhone: string;
  position: string;
  region: string;
  address: string;
  settledAt: int64;
  supportWechat: string;
  supportPhone: string;
  status: int;
}

export interface ShopListReq {
  page: int;
  pageSize: int;
  name: string;
  status: int[];
}

export class ShopAPI {
  http: AxiosInstance;
  resPath = 'app/admin/shops';
  constructor(axIns) {
    this.http = axIns;
  }
  get(id: string) {
    return this.http.get<ShopModel>(this.resPath + '/' + id);
  }
  list(req: ShopListReq) {
    return this.http.get<PagedResp<ShopModel>>(this.resPath, { params: req });
  }
  update(req: ShopUpdateReq) {
    return this.http.put(this.resPath + '/' + req.id, req);
  }
  delete(id: string) {
    return this.http.delete(this.resPath + `/${id}`);
  }
  create(req: ShopCreateReq) {
    return this.http.post(this.resPath, req);
  }
}
