import UiHelper from '/@/api/services/util/UiHelper';
import { Ref, ref } from 'vue';
import { ScriptStyleListReq, appAdmin } from '.';

export class ScriptStyleSelector {
  public optionsRef: Ref;
  public queryParams: ScriptStyleListReq;
  constructor() {
    this.optionsRef = ref([]);
    this.queryParams = {
      page: 1,
      pageSize: 20,
      name: null,
      status: null,
    };
  }
  query = async (name = '') => {
    this.queryParams.name = name;
    const ret = await appAdmin.scriptStyle.list(this.queryParams);

    this.optionsRef.value = UiHelper.converter.listToSelectOptions(ret.items);
    return this.optionsRef;
  };
}
