<template>
  <PageWrapper title="评论管理" contentBackground>
    <BasicTable ref="tableRef" title="评论列表" @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleDelete">批量删除</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '查看',
              tooltip: '查看',
              onClick: handleView.bind(null, record),
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
    <!-- <CommentsModal @register="registerModalView" /> -->
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction, TableActionType } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { appAdmin, ShopCommentsModel } from '/@/api/services/AppAdmin';
  import { columns } from './data';
  import { useModal } from '/@/components/Modal';
  // import { useTabs } from '/@/hooks/web/useTabs';
  import { useRouter } from 'vue-router';
  import { useGo } from '/@/hooks/web/usePage';
  import { computed, ref, reactive, onMounted, watch, unref } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  // import CommentsModal from './commentsModal.vue';
  const { createSuccessModal, createMessage } = useMessage();
  const go = useGo();
  const { currentRoute } = useRouter();
  const id = computed(() => {
    return unref(currentRoute).params.id;
  });
  const [registerModalView, { openModal: openModal1 }] = useModal();
  //   const [registerModalEdit, { openModal: openModal2 }] = useModal();
  //   const [registerModalAdd, { openModal: openModal3 }] = useModal();
  const searchInfo = reactive<Recordable>({});
  const listConditionRef = ref({
    page: 1,
    pageSize: 10,
  });
  const data = reactive<ShopCommentsModel[]>([]);
  const reloadListData = async () => {
    console.log(id);

    var listCond = listConditionRef.value;
    data.length = 0;
    const res = await appAdmin.shopComment.list(listCond);
    console.log(res);

    // for (let i = 0; i < res.items.length; i++) {
    //   data.push({
    //     id: res.items[i].id,
    //     content: res.items[i].content,
    //     created_at: res.items[i].created_at,
    //     owner: res.items[i].owner,
    //   });
    // }
    console.log(data);

    listConditionRef.value = {
      page: res.page,
      pageSize: res.pageSize,
    };

    return data;
  };
  function handleScript(record: Recordable) {
    // openModal1(true, {
    //   isUpdate: false,
    //   record,
    // });
    go('gameShopScript/' + record.id);
  }

  function handleView(record: Recordable) {
    openModal1(true, {
      isUpdate: false,
      record,
    });
    // go('/game_shop/account_detail/' + record.id);
  }

  function handleEdit(record: Recordable) {
    // console.log(record);
    // openModal2(true, {
    //   record,
    //   isUpdate: true,
    // });
  }

  function handleAdd() {
    // openModal3(true, {
    //   id,
    //   isUpdate: true,
    // });
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
    // const scriptId = getTableAction().getSelectRows();
    // go('gameShopPictureList/' + scriptId[0].id);
  }

  //   async function handleDelete(record: Recordable) {
  //     let id = record.id.split()
  //     const res = await appAdmin.room.delete(id);
  //     console.log(res);

  //     reload();
  //   }

  async function handleDelete(record: Recordable) {
    try {
      const roomsId = getTableAction()
        .getSelectRows()
        .map((i) => i.id);
      console.log(roomsId);

      const form = {
        id: roomsId,
      };
      console.log(form);

      const res = await appAdmin.shopComment.delete(form.id);
      console.log(res);
      getTableAction().clearSelectedRowKeys();
      createMessage.success('删除成功');
      reload();
    } catch {
      createMessage.error('删除失败');
    }
  }
  const [registerTable, { reload, updateTableDataRecord }] = useTable({
    columns: columns,
    api: reloadListData,
    dataSource: data,
    showIndexColumn: true,
    // useSearchForm: true,
    rowSelection: { type: 'checkbox' },
    bordered: true,
    showTableSetting: true,
    // formConfig: {
    //   labelWidth: 120,
    //   schemas: searchFormSchema,
    //   autoSubmitOnEnter: true,
    // },
    handleSearchInfoFn(info) {
      //   listConditionRef.value.name = info.name;
      //   reloadListData;
    },
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  function handleSuccess({ isUpdate, values }) {
    reload();
    // if (isUpdate) {
    //   reload();

    //   // 演示不刷新表格直接更新内部数据。
    //   // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
    //   // const result = updateTableDataRecord(values.id, values);
    //   // console.log(result);
    // } else {
    //   reload();
    // }
  }
  //   onMounted(() => {});
</script>
