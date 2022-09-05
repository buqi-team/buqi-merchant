import { BasicColumn } from '/@/components/Table';
import UiHelper from '/@/api/services/util/UiHelper';
import { Tag } from 'ant-design-vue';
import { h } from 'vue';
import { DescItem } from '/@/components/Description/index';
import { FormSchema } from '/@/components/Table';
export const columns: BasicColumn[] = [
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      let enable = false;
      let options = [
        { label: '未付款', value: 0 },
        { label: '已付款', value: 1 },
        { label: '退款中', value: 2 },
        { label: '已退款', value: 3 },
        { label: '订单关闭', value: 4 },
      ];

      if (record.status > 0 && record.status < 4) enable = true;
      const color = enable ? 'green' : 'red';
      const text = options.map((i) => {
        if (i.value == record.status) return i.label;
      });
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '组队名',
    dataIndex: 'event.group_name',
  },
  {
    title: '活动标题',
    dataIndex: 'event.title',
  },
  {
    title: '活动描述',
    dataIndex: 'event.content',
  },
  {
    title: '发起人显示名',
    dataIndex: 'player.screen_name',
  },
  {
    title: '发起人用户名',
    dataIndex: 'player.username',
  },
  {
    title: '发起人用户id',
    dataIndex: 'player.id',
  },
  {
    title: '付款日期',
    dataIndex: 'pay_at',
    customRender: ({ text }) => {
      return UiHelper.converter.timestampFormatter(text);
    },
  },
  {
    title: '删除日期',
    dataIndex: 'deleted_at',
    customRender: ({ text }) => {
      return UiHelper.converter.timestampFormatter(text);
    },
  },

  {
    title: '创建时间',
    dataIndex: 'created_at',
    customRender: ({ text }) => {
      return UiHelper.converter.timestampFormatter(text);
    },
  },
  {
    title: '修改时间',
    dataIndex: 'updated_at',
    customRender: ({ text }) => {
      return UiHelper.converter.timestampFormatter(text);
    },
  },
];
export const searchFormSchema: FormSchema[] = [
  {
    field: 'status',
    label: '搜索状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '未付款', value: 0 },
        { label: '已付款', value: 1 },
        { label: '退款中', value: 2 },
        { label: '已退款', value: 3 },
        { label: '订单关闭', value: 4 },
      ],
    },
    colProps: { span: 8 },
  },
];
export const descSchema: DescItem[] = [
  {
    field: 'status',
    label: '状态',
  },
  {
    field: 'id',
    label: 'ID',
  },
  {
    field: 'event.group_name',
    label: '组队名',
  },
  {
    field: 'event.title',
    label: '标题（可留空）',
  },
  {
    field: 'event.content',
    label: '内容',
  },
  {
    field: 'player.screen_name',
    label: '发起人显示名',
  },
  {
    field: 'player.username',
    label: '发起人用户名',
  },
  {
    field: 'player.id',
    label: '发起人用户id',
  },
  {
    field: 'created_at',
    label: '创建时间',
  },
  {
    field: 'updated_at',
    label: '修改时间',
  },
];
