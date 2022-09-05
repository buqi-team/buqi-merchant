import { AxiosInstance } from 'axios';

import { PagedResp, int } from '../basic';

export interface ProductModel {
  id: string;
  shopId: string;
  shop: GameShopModel;
  name: string;
  scriptId: string;
  script: ScriptModel;
  weight: number;
  summary: string;
  detail: string;
  visible: number;
  updatedAt: string;
  createdAt: string;
}
export interface ProductListReq {
  page: int;
  pageSize: int;
  name?: string;
}
export interface ProductUpdateReq {
  id: string;
  name: string;
  scriptId: string;
  weight: number;
  summary: string;
  detail: string;
  visible: number;
}
export interface ProductCreateReq {
  name: string;
  scriptId: string;
  weight: number;
  summary: string;
  detail: string;
  visible: number;
}
export class ProductAPI {
  http: AxiosInstance;
  resPath = 'app/merchant/products';
  constructor(axIns) {
    this.http = axIns;
  }
  get(id: string) {
    return this.http.get<ProductModel>(this.resPath + '/' + id);
  }
  list(req: ProductListReq) {
    return this.http.get<PagedResp<ProductModel>>(this.resPath, { params: req });
  }
  update(req: ProductUpdateReq) {
    return this.http.put(this.resPath + '/' + req.id, req);
  }
  delete(id: string) {
    return this.http.delete(this.resPath + `/${id}`);
  }
  create(req: ProductCreateReq) {
    return this.http.post(this.resPath, req);
  }
  enable(id: string) {
    return this.http.put(this.resPath + '/' + id, { status: 1 });
  }
  disable(id: string) {
    return this.http.put(this.resPath + '/' + id, { status: 0 });
  }
}
