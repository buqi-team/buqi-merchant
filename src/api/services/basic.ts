// 此处定义 API 相关的基本类型

export type int64 = Number;
export type int = Number;

export interface PagedResp<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
