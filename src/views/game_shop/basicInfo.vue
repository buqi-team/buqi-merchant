<template>
  <PageWrapper>
    <a-button type="primary" @click="toEdit()">编辑店铺信息</a-button>
    <Description :column="3" class="mt-4" title="店铺" :data="dataSource" :schema="schema" />

    <!-- <ShopEdit @register="registerModalEdit" @success="handleSuccess"></ShopEdit> -->
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { defineComponent, onMounted, ref, reactive, computed } from 'vue';
  import { Description, DescItem, useDescription } from '/@/components/Description/index';
  import { PageWrapper } from '/@/components/Page';
  import { schema } from './data';
  import { useModal } from '/@/components/Modal';
  import ShopEdit from './shopEdit.vue';
  import { appAdmin, GameShopModel } from '/@/api/services/AppAdmin';
  import { useGo } from '/@/hooks/web/usePage';
  // const [registerModalEdit, { openModal: openModal1 }] = useModal();
  const go = useGo();
  let data = reactive<any>({ value: {} });
  async function reloadListData() {
    const res = await appAdmin.gameShop.get();
    data.value = {
      status: res.status,
      name: res.name,
      id: res.id,
      cover_url: res.cover_url,
      banner_url: res.banner_url,
      logo_url: res.logo_url,
      summary: res.summary,
      detail: res.detail,
      manager: res.manager,
      manager_phone: res.manager_phone,
      map_pos_lng: res.map_pos_lng,
      map_pos_lat: res.map_pos_lat,
      map_region: res.map_region,
      map_address: res.map_address,
      settled_date: res.settled_date,
      support_phone: res.support_phone,
      support_wechat: res.support_wechat,
      created_at: res.created_at,
      updated_at: res.updated_at,
    };
    //   console.log("dataSource",dataSource);
    //   return dataSource
  }
  //   const dataSource = reloadListData()
  let dataSource = computed(() => {
    return data.value;
  });
  function toEdit() {
    go(`/app/gameShop/shopEdit`);
  }
  // function handleSuccess({ isUpdate, values }) {
  //   reloadListData();
  // }
  onMounted(() => {
    reloadListData();
    // console.log(dataSource);
  });
</script>
