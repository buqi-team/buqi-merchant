// import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
// import { AdminAPI, AdminRoleAPI, ModuleResourceAPI, PermAPI } from '.';

// import httpService from '/@/api/services/plugins/http';
// import { ModuleAPI } from './Module';
// import { AuthAPI } from './Auth';
import { StorageAPI } from './Storage';

export class SystemService {
  // http: AxiosInstance;

  // auth: AuthAPI;
  // perm: PermAPI;
  storage: StorageAPI;
  // module: ModuleAPI;
  // moduleResource: ModuleResourceAPI;
  // admin: AdminAPI;
  // adminRole: AdminRoleAPI;

  constructor() {
    // this.http = axIns;
    // this.auth = new AuthAPI(this.http);
    // this.perm = new PermAPI(this.http);
    this.storage = new StorageAPI();
    // this.module = new ModuleAPI(this.http);
    // this.moduleResource = new ModuleResourceAPI(this.http);
    // this.admin = new AdminAPI(this.http);
    // this.adminRole = new AdminRoleAPI(this.http);
  }
}

export const system = new SystemService();
