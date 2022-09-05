import UiHelper from '/@/app-shared/services/util/UiHelper';
import { Ref, ref } from 'vue';
import { GameShopListReq, appAdmin } from '.';
// #autocode prevent overwrite
export class GameShopSelector {
  public optionsRef: Ref;
  public queryParams: GameShopListReq;
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
    const res = await appAdmin.gameShop.list(this.queryParams);
    this.optionsRef.value = UiHelper.converter.listToSelectOptions(res.items);

    return this.optionsRef;
  };
}
