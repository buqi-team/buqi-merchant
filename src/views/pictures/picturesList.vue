<template>
  <PageWrapper title="店铺图片管理" contentBackground>
    <CardList :api="reloadListData" @get-method="getMethod" @delete="handleDel">
      <template #header>
        <Button @click="handleAdd" type="primary"> 添加店铺图片 </Button>
      </template>
    </CardList>
    <PictureAdd @register="registerModalAdd" @success="handleSuccess"></PictureAdd>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { CardList } from '/@/components/CardList';
  import { Button } from '/@/components/Button';
  import { Image } from 'ant-design-vue';
  import { BasicTable, useTable, TableActionType } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { appAdmin, GameShopPictureModel } from '/@/api/services/AppAdmin';
  import PictureAdd from './picturesAdd.vue';
  import { columns } from './data';
  import { useRouter } from 'vue-router';
  import { computed, ref, reactive, onMounted, watch, unref } from 'vue';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createSuccessModal, createMessage } = useMessage();
  const [registerModalAdd, { openModal: openModal3 }] = useModal();
  const { currentRoute } = useRouter();

  // let reload = (e) => {
  //   reloadListData(e)
  // };
  function getMethod(m: any) {}

  async function handleDel(id) {
    console.log(id);
    await appAdmin.gameShopPics.delete(id);
    createMessage.success('删除成功');
    // reload();
  }
  const listConditionRef = ref({
    pageSize: 10,
    page: 1,
  });

  const data = reactive<GameShopPictureModel[]>([]);
  async function reloadListData(e) {
    data.length = 0;
    var listCond = listConditionRef.value;
    listCond.page = e.page;
    listCond.pageSize = e.pageSize;
    const res = await appAdmin.gameShopPics.list(listCond);

    for (let i = 0; i < res.items.length; i++) {
      data.push({
        id: res.items[i].id,
        shop_id: res.items[i].shop_id,
        url: res.items[i].url,
      });
    }
    console.log('店铺里的图片', data);

    listConditionRef.value = {
      page: res.page,
      pageSize: res.pageSize,
    };
    return res;
  }
  function handleAdd() {
    openModal3(true, {
      isUpdate: true,
    });
  }

  function handleSuccess({ isUpdate, values }) {
    // reload();
  }
</script>
