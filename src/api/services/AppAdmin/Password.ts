import { defHttp } from '/@/utils/http/axios';
import { PagedResp, int, int64 } from '../basic';

export interface UpdatePasswordReq {
  oldPassword: string;
  newPassword: string;
}

export class PasswordAPI {
  resPath = '/change_password';

  update(req: UpdatePasswordReq) {
    return defHttp.put({ url: this.resPath, params: req });
  }
}
