export class UiValidator {
  patterns = {
    mobilePhoneChina: {
      pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
      message: '请输入合法手机号',
      trigger: 'blur',
    },
    phoneChina: {
      pattern: /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/,
      message: '请输入合法手机号/电话号',
      trigger: 'blur',
    },
    idNumberChina: {
      pattern:
        /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
      message: '请输入合法身份证号',
      trigger: 'blur',
    },
    email: {
      pattern: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g,
      message: '请输入正确的邮箱',
      trigger: 'blur',
    },
  };
}
