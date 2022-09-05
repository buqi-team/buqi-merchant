interface ErrCode {
  code: number;
  name?: string;
  message?: string;
  message_zh?: string;
  errorDetail?: Array<string>;
}
const errCodes: Array<ErrCode> = [
  {
    code: 200000,
    name: 'OK',
    message: '',
    message_zh: '成功',
  },
  {
    code: 400000,
    name: 'ErrBadRequest',
    message: 'Bad request',
    message_zh: '请求非法',
  },
  {
    code: 400001,
    name: 'ErrBadParam',
    message: 'Invalid param to validate',
    message_zh: '请求参数有误',
  },
  {
    code: 400006,
    name: 'ErrWrongPassword',
    message: 'Incorrect subject or password.',
    message_zh: '密码或用户名/邮箱/手机号错误',
  },
  {
    code: 400007,
    name: 'ErrCaptchaSMS',
    message: 'Incorrect SMS captcha.',
    message_zh: '短信验证码错误',
  },
  {
    code: 400008,
    name: 'ErrCaptchaEmail',
    message: 'Incorrect Email captcha.',
    message_zh: '邮箱验证码错误',
  },
  {
    code: 400009,
    name: 'ErrCaptchaSMSExpired',
    message: 'Incorrect SMS captcha expired.',
    message_zh: '短信验证码错误',
  },
  {
    code: 400010,
    name: 'ErrCaptchaEmailExpired',
    message: 'Incorrect Email captcha: expired.',
    message_zh: '邮箱验证码错误',
  },
  {
    code: 400011,
    name: 'ErrCaptchaImage',
    message: 'Incorrect Image captcha.',
    message_zh: '图片验证码错误',
  },
  {
    code: 400012,
    name: 'ErrCaptchaImageExpired',
    message: 'Incorrect Image captcha: expired.',
    message_zh: '图片验证码错误',
  },
  {
    code: 400013,
    name: 'ErrDuplicatedPhone',
    message: 'Duplicated phone.',
    message_zh: '手机号已经被占用',
  },
  {
    code: 400014,
    name: 'ErrDuplicatedEmail',
    message: 'Duplicated email.',
    message_zh: '邮箱已经被占用',
  },
  {
    code: 400015,
    name: 'ErrDuplicatedUsername',
    message: 'Duplicated username.',
    message_zh: '用户名已经被占用',
  },
  {
    code: 400016,
    name: 'ErrBadUrlParam',
    message: 'Bad url param.',
    message_zh: 'URL 参数错误',
  },
  {
    code: 400017,
    name: 'ErrUnsupportedLoginType',
    message: 'Unsupported login Type.',
    message_zh: '暂不支持此登录方式',
  },
  {
    code: 400018,
    name: 'ErrDependencyNotFound',
    message: 'Dependency not found.',
    message_zh: '依赖的项不存在',
  },
  {
    code: 400019,
    name: 'ErrBadParamOutOfRange',
    message: 'Argument value out of range.',
    message_zh: '参数值超出允许范围',
  },
  {
    code: 400020,
    name: 'ErrBadRequestTooLarge',
    message: 'File too large',
    message_zh: '文件大小超出限制',
  },
  {
    code: 400021,
    name: 'ErrBadParamInvalidID',
    message: 'Invalid ID param',
    message_zh: 'ID 参数无效',
  },
  {
    code: 401000,
    name: 'ErrUnauthorized',
    message: 'Unauthorized.',
    message_zh: '缺失令牌',
  },
  {
    code: 401001,
    name: 'ErrTokenMissing',
    message: 'Missing token.',
    message_zh: '缺失令牌',
  },
  {
    code: 401002,
    name: 'ErrTokenExpired',
    message: 'Token has been expired.',
    message_zh: '令牌过期.',
  },
  {
    code: 401003,
    name: 'ErrTokenNotValidYet',
    message: 'Token has been destroyed.',
    message_zh: '令牌未到生效时间',
  },
  {
    code: 401004,
    name: 'ErrTokenMalformed',
    message: 'Failed to parse token.',
    message_zh: '不是正确的令牌格式',
  },
  {
    code: 401005,
    name: 'ErrTokenInvalid',
    message: 'Token is invalid.',
    message_zh: '令牌无效',
  },
  {
    code: 401006,
    name: 'ErrTokenDestroyed',
    message: 'Token is destroyed.',
    message_zh: '令牌无效',
  },
  {
    code: 403000,
    name: 'ErrNoPermission',
    message: 'No permission.',
    message_zh: '无权访问',
  },
  {
    code: 403001,
    name: 'ErrNotLogin',
    message: 'No permission: not login.',
    message_zh: '无权访问：未登录',
  },
  {
    code: 429000,
    name: 'ErrTooManyRequest',
    message: 'Too many requests.',
    message_zh: '访问频率过高',
  },
  {
    code: 404000,
    name: 'ErrNoSuchResource',
    message: 'No such resource.',
    message_zh: '未找到请求的资源',
  },
  {
    code: 404001,
    name: 'ErrNoSuchRoute',
    message: 'No such resource.',
    message_zh: '未找到请求的路由',
  },
  {
    code: 500000,
    name: 'ErrServerInternal',
    message: 'Server internal error.',
    message_zh: '服务器内部错误',
  },
  {
    code: 501000,
    name: 'ErrNotImplemented',
    message: 'Not implemented.',
    message_zh: '暂不支持',
  },
];

function trans(errcode: number): ErrCode {
  const ret = errCodes.find((e) => e.code === errcode);
  if (ret) {
    return ret;
  }
  return {
    code: -1,
    name: 'Unknown',
    message_zh: '未知错误，请更新错误码到最新版',
  };
}
export default trans;
