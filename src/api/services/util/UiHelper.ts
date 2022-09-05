import { system } from '/@/api/services/System/SystemService';
import { UiValidator } from './UiValidator';

class UiConverter {
  listToSelectOptions = (list: any[], labelKey = 'name') => {
    return list.map((x) => {
      return { label: x[labelKey], value: x.id };
    });
  };
  pad = (who, padString, length) => {
    let str = who;
    while (str.length < length) str = padString + str;
    return str;
  };
  timestampFormatter = (ts: number, formatStr = 'Y/M/D h:m:s', ms = true) => {
    const date = new Date(ts * (ms ? 1000 : 1));
    const c = {
      Y: date.getFullYear(),
      M: date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
      D: date.getDate(),
      h: this.pad(date.getHours().toString(), '0', 2),
      m: this.pad(date.getMinutes().toString(), '0', 2),
      s: this.pad(date.getSeconds().toString(), '0', 2),
    };
    let out = formatStr;
    Object.keys(c).forEach((k) => {
      out = out.replace(k.toString(), c[k]);
    });
    return out;
  };
  // 将 region id 转换为三段式数组
  regionToArray = (adcode) => {
    return [
      (adcode / 10000).toFixed(0) + '0000',
      (adcode / 100).toFixed(0) + '00',
      adcode.toFixed(0),
    ];
  };
}

export class UiHelper {
  converter: UiConverter;
  validator: UiValidator;
  constructor() {
    this.converter = new UiConverter();
    this.validator = new UiValidator();
  }
  async handleUpload(e) {
    console.log('handleUpload', e);
    try {
      const ret = await system.storage.putImage({ file: e.file });
      e.onSuccess();
      console.log(ret);
      return ret.url;
    } catch (error) {
      e.onError();
    }
  }
  async sleep(ms) {
    return await new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  // isInDialog() {
  //   return !!document.querySelector('.n-modal-container');
  // }
}

export default new UiHelper();
