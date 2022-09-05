<template>
  <PageWrapper title="剧本杀店管理" contentBackground>
    <BasicTable ref="tableRef" title="店铺列表" @register="registerTable" :searchInfo="searchInfo">
      <!-- <template #toolbar>
        <a-button type="primary" @click="handleAdd">添加店铺</a-button>
        <a-button type="primary" @click="handlePicture">店铺图片列表</a-button>
        <a-button type="primary" @click="handleRooms">店铺房间列表</a-button>
        <a-button type="primary" @click="handleShopComments">店铺评论列表</a-button>
        <a-button type="primary" @click="handleScriptComments">剧本评论列表</a-button>
     
      </template> -->
      <template #action="{ record }">
        <TableAction
          :actions="[
            // {
            //   label: '剧本',
            //   tooltip: '店铺剧本',
            //   onClick: handleScript.bind(null, record),
            // },
            {
              label: '查看',
              tooltip: '查看',
              onClick: handleView.bind(null, record),
            },
            {
              label: '编辑',
              tooltip: '编辑',

              onClick: handleEdit.bind(null, record),
            },
            {
              label: '删除',

              color: 'error',
              tooltip: '删除',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <!-- <GameShopModal @register="registerModalView" />
    <GameShopEdit @register="registerModalEdit" @success="handleSuccess"> </GameShopEdit>
    <GameShopAdd @register="registerModalAdd" @success="handleSuccess"> </GameShopAdd> -->
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction, TableActionType } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { appAdmin, GameShopModel } from '/@/api/services/AppAdmin';
  import { columns, searchFormSchema } from './data';
  import { useModal } from '/@/components/Modal';
  // import { useTabs } from '/@/hooks/web/useTabs';
  // import GameShopModal from './GameShopModal.vue';
  // import GameShopEdit from './GameShopEdit.vue';
  // import GameShopAdd from './GameShopAdd.vue';
  import { useGo } from '/@/hooks/web/usePage';
  import { computed, ref, reactive, onMounted, watch, unref } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createSuccessModal, createMessage } = useMessage();
  const go = useGo();
  const [registerModalView, { openModal: openModal1 }] = useModal();
  const [registerModalEdit, { openModal: openModal2 }] = useModal();
  const [registerModalAdd, { openModal: openModal3 }] = useModal();
  const searchInfo = reactive<Recordable>({});
  const listConditionRef = ref({
    keyword: '',
    page: 1,
    pageSize: 10,
  });
  const data = reactive<GameShopModel[]>([]);
  const reloadListData = async () => {
    var listCond = listConditionRef.value;
    data.length = 0;
    // const res = await appAdmin.gameShop.list(listCond);
    // for (let i = 0; i < res.items.length; i++) {
    //   data.push({
    //     status: res.items[i].status,
    //     name: res.items[i].name,
    //     id: res.items[i].id,
    //     cover_url: res.items[i].cover_url,
    //     banner_url: res.items[i].banner_url,
    //     logo_url: res.items[i].logo_url,
    //     summary: res.items[i].summary,
    //     detail: res.items[i].detail,
    //     manager: res.items[i].manager,
    //     manager_phone: res.items[i].manager_phone,
    //     map_pos_lng: res.items[i].map_pos_lng,
    //     map_pos_lat: res.items[i].map_pos_lat,
    //     map_region: res.items[i].map_region,
    //     map_address: res.items[i].map_address,
    //     settled_date: res.items[i].settled_date,
    //     support_phone: res.items[i].support_phone,
    //     support_wechat: res.items[i].support_wechat,
    //     created_at: res.items[i].created_at,
    //     updated_at: res.items[i].updated_at,
    //   });
    // }
    console.log(data);

    // listConditionRef.value = {
    //   keyword: listCond.keyword,
    //   page: res.page,
    //   pageSize: res.pageSize,
    // };

    // return res;
  };

  function handleView(record: Recordable) {
    openModal1(true, {
      isUpdate: false,
      shop: record,
    });
    // go('/game_shop/account_detail/' + record.id);
  }

  function handleEdit(record: Recordable) {
    console.log(record);
    openModal2(true, {
      record,
      isUpdate: true,
    });
  }

  function handleAdd() {
    openModal3(true, {
      isUpdate: true,
    });
  }

  const tableRef = ref<Nullable<TableActionType>>(null);
  function getTableAction() {
    const tableAction = unref(tableRef);
    if (!tableAction) {
      throw new Error('tableAction is null');
    }
    return tableAction;
  }

  function handlePicture() {
    const shopId = getTableAction().getSelectRows();
    if (shopId.length != 0) go('gameShopPictureList/' + shopId[0].id);
    else createMessage.error('请先选择店铺!');
  }

  function handleScript(record: Recordable) {
    go('gameShopScript/' + record.id);
  }

  function handleRooms() {
    const shopId = getTableAction().getSelectRows();
    if (shopId.length != 0) go('roomList/' + shopId[0].id);
    else createMessage.error('请先选择店铺!');
  }
  function handleShopComments() {
    const shopId = getTableAction().getSelectRows();
    if (shopId.length != 0) go('shopComments/' + shopId[0].id);
    else createMessage.error('请先选择店铺!');
  }
  function handleScriptComments() {
    const shopId = getTableAction().getSelectRows();
    if (shopId.length != 0) go('scriptComments/' + shopId[0].id);
    else createMessage.error('请先选择店铺!');
  }

  async function handleDelete(record: Recordable) {
    await appAdmin.gameShop.delete(record.id);
    reload();
  }
  const [registerTable, { reload, updateTableDataRecord }] = useTable({
    columns: columns,
    api: reloadListData,
    dataSource: data,
    showIndexColumn: true,
    useSearchForm: true,
    rowSelection: { type: 'radio' },
    bordered: true,
    showTableSetting: true,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    handleSearchInfoFn(info) {
      listConditionRef.value.keyword = info.name;
      reloadListData;
    },
    actionColumn: {
      width: '550',
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  function handleSuccess({ isUpdate, values }) {
    reload();
  }
</script>
