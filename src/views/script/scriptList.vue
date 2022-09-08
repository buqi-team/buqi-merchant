<template>
  <PageWrapper title="剧本管理" contentBackground>
    <BasicTable ref="tableRef" title="剧本列表" @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleAdd">剧本添加</a-button>
        <a-button type="primary" @click="handleFind">关联剧本</a-button>
        <a-button type="primary" @click="handleMultipleDelete">批量删除</a-button>
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
    <ScriptModal @register="registerModalView" />
    <ScriptAdd @register="registerModalAdd" @success="handleSuccess"> </ScriptAdd>
    <!-- <ScriptEdit @register="registerModalEdit" @success="handleSuccess"></ScriptEdit> -->
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction, TableActionType } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { appAdmin } from '/@/api/services/AppAdmin';
  import { columns, searchFormSchema } from './data';
  import { useModal } from '/@/components/Modal';
  import ScriptModal from './scriptModal.vue';
  import { ScriptModel } from '/@/api/services/AppAdmin/Script';
  import ScriptAdd from './scriptAdd.vue';
  import ScriptEdit from './scriptEdit.vue';
  import { computed, ref, reactive, onMounted, watch, unref } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useGo } from '/@/hooks/web/usePage';
  const { createSuccessModal, createMessage } = useMessage();
  const go = useGo();
  const [registerModalView, { openModal: openModal1 }] = useModal();
  const [registerModalEdit, { openModal: openModal2 }] = useModal();
  const [registerModalAdd, { openModal: openModal3 }] = useModal();
  //   const searchInfo = reactive<Recordable>({});

  const listConditionRef = ref({
    page: 1,
    pageSize: 10,
    keyword: '',
  });
  const data = reactive<ScriptModel[]>([]);

  const reloadListData = async (e) => {
    var listCond = listConditionRef.value;
    listCond.page = e.page;
    listCond.pageSize = e.pageSize;
    data.length = 0;
    const res = await appAdmin.script.list(listCond);

    for (let i = 0; i < res.items.length; i++) {
      data.push({
        id: res.items[i].id,
        name: res.items[i].name,
        numberMax: res.items[i].number_max,
        numberMin: res.items[i].number_min,
        minuteDuration: res.items[i].minute_duration,
        coverUrl: res.items[i].cover_url,
        authorName: res.items[i].author_name,
        status: res.items[i].status,
        publishDate: res.items[i].publish_date,
        description: res.items[i].description,
        detail: res.items[i].detail,
        styleIds: res.items[i].styles_hash,
        styles: res.items[i].styles,
        createdAt: res.items[i].createdAt,
        updatedAt: res.items[i].updatedAt,
      });
    }
    listConditionRef.value = {
      keyword: listCond.keyword,
      page: res.page,
      pageSize: res.pageSize,
    };
    return res;
  };

  function handleFind() {
    go(`/app/script/findScript`);
  }

  function handleView(record: Recordable) {
    openModal1(true, {
      isUpdate: true,
      record,
    });
  }
  function handleEdit(record: Recordable) {
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

  async function handleDelete(record: Recordable) {
    let id = record.id.split();
    await appAdmin.script.delete(id);
    reload();
  }
  const tableRef = ref<Nullable<TableActionType>>(null);
  function getTableAction() {
    const tableAction = unref(tableRef);
    if (!tableAction) {
      throw new Error('tableAction is null');
    }
    return tableAction;
  }
  async function handleMultipleDelete(record: Recordable) {
    try {
      const id = getTableAction()
        .getSelectRows()
        .map((i) => i.id);

      const res = await appAdmin.script.delete(id);
      console.log(res);
      getTableAction().clearSelectedRowKeys();
      createMessage.success('删除成功');
      reload();
    } catch {
      createMessage.error('删除失败');
    }
  }

  const [
    registerTable,
    { reload, updateTableDataRecord, getPaginationRef, setPagination, setProps },
  ] = useTable({
    columns: columns,
    api: reloadListData,
    dataSource: data,
    showIndexColumn: true,
    useSearchForm: false,
    rowSelection: { type: 'checkbox' },
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
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  function handleSuccess() {
    reload();
  }
  //   onMounted(() => {});
</script>
