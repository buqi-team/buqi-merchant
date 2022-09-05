import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface LoginReq {
  username: string;
  password: string;
}

export interface LoginResp {
  id: string;
  token: string;
  expiresAt: number;
}

import service from './http';
class AuthAPI {
  service: AxiosInstance;
  constructor(axIns) {
    this.service = axIns;
  }
  login(req: LoginReq) {
    return this.service.post<LoginResp>('/system/auth/login', req);
  }
}

export interface TagListReq {
  page: number;
  pageSize: number;
  name: string;
}

export interface TagResp {
  id: BigInt;
  name: string;
  slug: string;
  weight: number;
}

export interface TagCreateReq {
  name: string;
  slug: string;
  weight: number;
}

export interface PagedResp<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

class TagAPI {
  service: AxiosInstance;
  resourceUrl: string;
  constructor(axIns) {
    this.service = axIns;
    this.resourceUrl = '/blog/tags';
  }
  list(req: TagListReq) {
    return this.service.get<PagedResp<TagResp>>(this.resourceUrl, { params: req });
  }
  del(id: string) {
    return this.service.delete(this.resourceUrl + `/${id}`);
  }
  create(req: TagCreateReq) {
    return this.service.post(this.resourceUrl, req);
  }
}

interface CreatePermReq {
  name: string;
  node: string;
  groupName: string;
  moduleName: string;
}

interface UpdatePermReq {
  id: string;
  name: string;
  node: string;
  groupName: string;
  moduleName: string;
}

class PermAPI {
  service: AxiosInstance;
  constructor(axIns) {
    this.service = axIns;
  }
  list() {
    return this.service.get('/system/perms');
  }
  create(req: CreatePermReq) {
    return this.service.post('system/perms', req);
  }
  update(id: string, req: UpdatePermReq) {
    return this.service.put('system/perms/' + id, req);
  }
  delete(id: string) {
    return this.service.delete('system/perms/' + id);
  }
}

class BackendAPI {
  service: AxiosInstance;
  auth: AuthAPI;
  tag: TagAPI;
  perm: PermAPI;
  constructor(axIns) {
    this.service = axIns;
    this.auth = new AuthAPI(this.service);
    this.perm = new PermAPI(this.service);
  }
}

export default new BackendAPI(service);
