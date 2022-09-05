<template>
  <PageWrapper title="剧本管理" contentBackground>
    <BasicTable title="剧本列表" @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleAdd">剧本添加</a-button>
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
    <ScriptModal @register="registerModalView" />
    <!-- <ScriptAdd @register="registerModalAdd" @success="handleSuccess"> </ScriptAdd>
    <ScriptEdit @register="registerModalEdit" @success="handleSuccess"></ScriptEdit> -->
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { appAdmin } from '/@/api/services/AppAdmin';
  //   import { PlayerModel } from '/@/app-shared/services/AppAdmin/Player';
  import { columns, searchFormSchema } from './data';
  import { useModal } from '/@/components/Modal';
  import ScriptModal from './scriptModal.vue';
  import { ScriptModel } from '/@/api/services/AppAdmin/Script';
  import ScriptAdd from './scriptAdd.vue';
  import ScriptEdit from './scriptEdit.vue';
  import { computed, ref, reactive, onMounted, watch } from 'vue';

  const [registerModalView, { openModal: openModal1 }] = useModal();
  const [registerModalEdit, { openModal: openModal2 }] = useModal();
  const [registerModalAdd, { openModal: openModal3 }] = useModal();
  //   const searchInfo = reactive<Recordable>({});

  const listConditionRef = ref({
    // name: null,
    // status: null,
    // total: 0,
    page: 1,
    pageSize: 10,
    keyword: '',
    // preloads: ['styles'],
  });
  const data = reactive<ScriptModel[]>([]);

  const reloadListData = async (e) => {
    var listCond = listConditionRef.value;
    // listCond.page = e.page;
    // listCond.pageSize = e.pageSize;
    data.length = 0;
    const res = await appAdmin.script.list(listCond);
    console.log(res);

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
    console.log(res);
    // setPagination({
    //     current:getPaginationRef().current;
    // })

    listConditionRef.value = {
      // name: listCond.name,
      // status: listCond.status,
      // total: res.total,
      keyword: listCond.keyword,
      page: res.page,
      pageSize: res.pageSize,
      // preloads: listCond.preloads,
    };
    // console.log(res);
    return res;
  };

  function handleView(record: Recordable) {
    openModal1(true, {
      isUpdate: true,
      record,
    });
    // // go('/system/account_detail/' + record.id);
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
    await appAdmin.script.delete(record.id);
    reload();
  }

  const [
    registerTable,
    { reload, updateTableDataRecord, getPaginationRef, setPagination, setProps },
  ] = useTable({
    columns: columns,
    api: reloadListData,
    dataSource: data,
    showIndexColumn: true,
    useSearchForm: true,
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

  function handleSuccess({ isUpdate, values }) {
    if (isUpdate) {
      // 演示不刷新表格直接更新内部数据。
      // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
      // const result = updateTableDataRecord(values.id, values);
      // console.log(result);
    } else {
      reload();
    }
  }
  //   onMounted(() => {});
</script>
