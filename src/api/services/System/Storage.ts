// import { PagedResp } from '/@/app-shared/services/plugins/backend';
// import { AxiosInstance } from 'axios';
import { defHttp } from '/@/utils/http/axios';

export interface UploadModel {
  id: string;
  created_at: number;
  updated_at: number;
  deleted_at: number;
  name: string;
  url: string;
  storage: string;
  admin_id: string;
  size: number;
}

export interface ListUploadReq {
  page: number;
  pageSize: number;
  name: string;
}
export interface ListUploadResp {
  id: string;
  createdAt: number;
  updatedAt: number;
  deletedAt: number;
  name: string;
  storage: string;
  url: string;
  adminId: string;
  size: number;
}

export interface PutImageResp {
  id: string;
  url: string;
}
export interface UploadFileParams {
  // Other parameters
  data?: Recordable;
  // File parameter interface field name
  name?: string;
  // file name
  file: File;
  // file name
  filename?: string;
  [key: string]: any;
}
export interface PutImageReq {
  file: File;
}
export interface UploadApiResult {
  message: string;
  code: number;
  url: string;
}
enum Api {
  STORAGE_LIST = '/system/storages',
}

export class StorageAPI {
  putImage(req: PutImageReq) {
    const formData = new FormData();
    formData.append('file', req.file);
    return defHttp.put<UploadModel>({
      url: Api.STORAGE_LIST + '/image',
      params: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  uploadImage(params: PutImageReq) {
    const formData = new FormData();
    formData.append('file', params.file);
    console.log(formData);

    return defHttp.put<UploadModel>({
      url: Api.STORAGE_LIST + '/image',
      params: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

// export class StorageAPI {
//   http: AxiosInstance;
//   resPath = 'system/storages';

//   constructor(axIns) {
//     this.http = axIns;
//   }

// putImage(req: PutImageReq) {
//   console.log('putImage');

//   const formData = new FormData();
//   formData.append('file', req.file);
//   return this.http.put<UploadModel>(this.resPath + '/image', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
// }

//   list(req: ListUploadReq) {
//     return this.http.get<PagedResp<ListUploadResp>>(this.resPath, { params: req });
//   }
//   delete(id: string) {
//     return this.http.delete(this.resPath + `/${id}`);
//   }
// }
