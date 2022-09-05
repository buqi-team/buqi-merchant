// http.ts
import { useGlobalSetting } from '/@/app-shared/hooks/setting';
import useCurrentUser from '/@/app-shared/hooks/useCurrentUser';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import trans from './backend_errcodes';
// import message from './message'
import { message } from 'ant-design-vue';

function statusTextOf(status: number): string {
  const statusDict = {
    400: '请求错误',
    401: '未授权，请重新登录',
    403: '拒绝访问',
    404: '请求出错',
    408: '请求超时',
    500: '服务器错误',
    501: '服务未实现',
    502: '网络错误',
    503: '服务不可用',
    504: '网络超时',
    505: 'HTTP版本不受支持',
  };
  return statusDict[status] || `未知错误(${status})`;
}
const settings = useGlobalSetting();
console.log(settings);
const service = axios.create({
  baseURL: settings.apiUrl,
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    //获取token，并将其添加至请求头中
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 错误抛到业务代码
    error.data = {};
    error.data.msg = '服务器异常，请联系管理员！';
    return Promise.resolve(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log(JSON.stringify(response.data))
    const status = response.status;
    if (200 <= status && status < 300) {
      response.data = response.data.result;
    }
    if (401 == status) {
      useCurrentUser().logout();
    }
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log('repeated request: ' + error.message);
    } else {
      const code: number = error?.response?.data?.code;
      if (code) {
        const data = error?.response?.data;
        const err = trans(code);
        const detail = data.errorDetail || [];
        const extra = detail.length == 0 ? '' : '\n' + detail.join('\n');
        message.error(err.message_zh + extra);
        if (err.name == 'ErrTokenExpired') {
          location.replace('/auth/login');
        }
      } else {
        message.error('未知错误');
        console.log(error?.response, error?.response?.data.code);
      }
    }
    return Promise.reject(error);
  },
);

export default service;
