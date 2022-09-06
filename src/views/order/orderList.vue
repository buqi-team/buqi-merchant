<template>
  <PageWrapper title="订单管理" contentBackground>
    <BasicTable title="订单列表" @register="registerTable">
      <template #toolbar>
        <!-- <a-button type="primary" @click="handleAdd">订单添加</a-button> -->
      </template>
      <template #avatarUrl="{ record }">
        <Avatar v-if="record.avatarUrl" :size="60" :src="record.avatarUrl" />
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
              label: '退款',
              disabled: refund(record.status),
              color: 'error',
              tooltip: '退款',
              popConfirm: {
                title: '是否确认退款',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <OrderModal @register="registerModalView" />
    <!-- <PlayerAdd @register="registerModalAdd" @success="handleSuccess"> </PlayerAdd>
    <PlayerEdit @register="registerModalEdit" @success="handleSuccess"></PlayerEdit> -->
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Pagination } from '/@/components/bq-pagination';
  import { BasicTable, useTable, TableAction, TableImg } from '/@/components/Table';
  import { Tag, Avatar } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { appAdmin } from '/@/api/services/AppAdmin';
  import { OrderRefundReq } from '/@/api/services/AppAdmin/Order';
  import moment from 'moment';
  import { OrderModel } from '/@/api/services/AppAdmin/Order';
  import { columns, searchFormSchema } from './data';
  import { useModal } from '/@/components/Modal';
  import OrderModal from './orderModal.vue';
  import { computed, ref, reactive, onMounted, watch } from 'vue';

  const [registerModalView, { openModal: openModal1 }] = useModal();
  //   const [registerModalEdit, { openModal: openModal2 }] = useModal();
  //   const [registerModalAdd, { openModal: openModal3 }] = useModal();
  //   const searchInfo = reactive<Recordable>({});
  function refund(status) {
    if (status == 1) return false;
    else return true;
  }

  //获取上一周和这一周的时间
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 14);
  end.setDate(end.getDate() + 14);
  const date = [start, end];
  const listConditionRef = ref({
    // startDate: moment(date[0]).utc().format(),
    // endDate: moment(date[1]).utc().format(),
    // status: [0, 1, 2, 3, 4],
    // total: 0,
    page: 1,
    pageSize: 10,
  });
  const data = reactive<OrderModel[]>([]);
  const reloadListData = async (e) => {
    var listCond = listConditionRef.value;
    listCond.page = e.page;
    listCond.pageSize = e.pageSize;
    data.length = 0;
    const res = await appAdmin.order.list(listCond);
    console.log(res);

    for (let i = 0; i < res.items.length; i++) {
      data.push({
        id: res.items[i].id,
        event: res.items[i].event,
        event_id: res.items[i].event_id,
        player: res.items[i].player,
        player_id: res.items[i].player_id,
        status: res.items[i].status,
        created_at: res.items[i].created_at,
        updated_at: res.items[i].updated_at,
      });
    }
    console.log(data);
    // console.log(res);

    listConditionRef.value = {
      // startDate: listCond.startDate,
      // endDate: listCond.endDate,
      // status: listCond.status,
      // total: res.total,
      page: res.page,
      pageSize: res.pageSize,
    };

    return res;
  };

  function handleView(record: Recordable) {
    openModal1(true, {
      record,
      isUpdate: true,
    });
  }
  function handleEdit(record: Recordable) {
    console.log(record);
    // openModal2(true, {
    //   record,
    //   isUpdate: true,
    // });
  }

  function handleAdd() {
    // openModal3(true, {
    //   isUpdate: true,
    // });
  }

  async function handleDelete(record: Recordable) {
    // console.log(record);
    const form: OrderRefundReq = {
      orderId: record.id,
    };
    const res = await appAdmin.order.refund(form);
    console.log(res);

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
      let arrSelect;
      if (info.status > -1) {
        arrSelect = info.status.toString().split();
        listConditionRef.value.status = arrSelect.concat();
      } else {
        listConditionRef.value.status = [0, 1, 2, 3, 4];
      }
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
