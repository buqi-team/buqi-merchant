import UiHelper from '/@/app-shared/services/util/UiHelper';
import { Ref, ref } from 'vue';
import { PlayerRoleListReq, appAdmin } from '.';
// #autocode prevent overwrite
export class PlayerRoleSelector {
  public optionsRef: Ref;
  public queryParams: PlayerRoleListReq;
  constructor() {
    this.optionsRef = ref([]);
    this.queryParams = {
      page: 1,
      pageSize: 20,
      preloads: ['permissions'],
      name: null,
      value: null,
      status: null,
    };
  }
  query = async (name = '') => {
    this.queryParams.name = name;
    const ret = await appAdmin.playerRole.list(this.queryParams);
    console.log(ret);

    this.optionsRef.value = UiHelper.converter.listToSelectOptions(ret.items);

    return this.optionsRef;
  };
}
