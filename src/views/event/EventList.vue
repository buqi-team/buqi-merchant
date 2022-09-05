<template>
  <PageWrapper title="活动管理" contentBackground>
    <BasicTable title="活动列表" @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleAdd">活动添加</a-button>
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
    <!-- <EventModal @register="registerModalView" />
    <EventAdd @register="registerModalAdd" @success="handleSuccess"> </EventAdd>
    <EventEdit @register="registerModalEdit" @success="handleSuccess"></EventEdit> -->
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { appAdmin } from '/@/api/services/AppAdmin';
  import { columns, searchFormSchema } from './data';
  import { useModal } from '/@/components/Modal';
  // import EventAdd from './EventAdd.vue';
  // import EventModal from './EventModal.vue';
  // import EventEdit from './EventEdit.vue';
  import { EventModel } from '/@/api/services/AppAdmin/Event';
  import { computed, ref, reactive, onMounted, watch } from 'vue';

  const [registerModalView, { openModal: openModal1 }] = useModal();
  const [registerModalEdit, { openModal: openModal2 }] = useModal();
  const [registerModalAdd, { openModal: openModal3 }] = useModal();
  //   const searchInfo = reactive<Recordable>({});

  const listConditionRef = ref({
    // title: null,
    status: [0, 1, 2, 3, 4, 5],
    // preloads: ['owner', 'members'],
    // total: 0,
    page: 1,
    pageSize: 10,
  });
  const data = reactive<EventModel[]>([]);

  async function reloadListData(e) {
    var listCond = listConditionRef.value;
    listCond.page = e.page;
    listCond.pageSize = e.pageSize;
    data.length = 0;
    // const res = await appAdmin.event.list(listCond);
    // console.log('活动数据', res);

    // for (let i = 0; i < res.items.length; i++) {
    //   data.push({
    //     id: res.items[i].id,
    //     owner_id: res.items[i].owner_id,
    //     title: res.items[i].title,
    //     content: res.items[i].content,
    //     group_avatar_url: res.items[i].group_avatar_url,
    //     num_member_total: res.items[i].num_member_total,
    //     num_member_joined: res.items[i].num_member_joined,
    //     status: res.items[i].status,
    //     group_name: res.items[i].group_name,
    //     product_id: res.items[i].product_id,
    //     shop_id: res.items[i].shop_id,
    //     script_id: res.items[i].script_id,
    //     script_name: res.items[i].script.name,
    //     created_at: res.items[i].created_at,
    //     updated_at: res.items[i].updated_at,
    //   });
    // }
    // console.log(data);

    // listConditionRef.value = {
    //   // title: listCond.title,
    //   status: listCond.status,
    //   // total: listCond.total,
    //   page: res.page,
    //   pageSize: res.pageSize,
    //   // preloads: listCond.preloads,
    // };
    // console.log(res);
    // return res;
  }

  function handleView(record: Recordable) {
    openModal1(true, {
      isUpdate: false,
      event: record,
    });
    // // go('/system/account_detail/' + record.id);
  }
  function handleEdit(record: Recordable) {
    console.log(record);

    openModal2(true, {
      record,
      isUpdate: true,
    });
  }

  function handleAdd(record: Recordable) {
    console.log(record);
    openModal3(true, {
      isUpdate: true,
    });
  }

  async function handleDelete(record: Recordable) {
    await appAdmin.event.delete(record.id);
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
      if (info.status) {
        listConditionRef.value.status = [...info.status];
      } else {
        listConditionRef.value.status = [0, 1, 2, 3, 4, 5];
      }
      reloadListData;
    },
    actionColumn: {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  function handleSuccess({ isUpdate, values }) {
    reload();
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
