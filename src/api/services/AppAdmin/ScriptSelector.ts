import UiHelper from '/@/app-shared/services/util/UiHelper';
import { Ref, ref } from 'vue';
import { ScriptListReq, appAdmin } from '.';

export class ScriptSelector {
  public optionsRef: Ref;
  public queryParams: ScriptListReq;
  constructor() {
    this.optionsRef = ref([]);
    this.queryParams = {
      page: 1,
      pageSize: 20,
      keyword: '',
      // name: '',
      // status: null,
    };
  }
  query = async (keyword = '') => {
    this.queryParams.keyword = keyword;
    const ret = await appAdmin.script.list(this.queryParams);
    this.optionsRef.value = UiHelper.converter.listToSelectOptions(ret.data.items);
  };
}
