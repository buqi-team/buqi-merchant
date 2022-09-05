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

    customRender: ({ record }) => {
      let enable = false;
      let options = [
        { label: '禁用', value: 0 },
        { label: '进行中', value: 1 },
        { label: '就绪，停止加人', value: 2 },
        { label: '正在进行', value: 3 },
        { label: '已结束', value: 4 },
        { label: '已撤销', value: 5 },
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
    title: '发起用户ID',
    dataIndex: 'owner_id',
    width: 120,
  },
  {
    title: '标题（可留空）',
    dataIndex: 'title',
  },
  {
    title: '内容',
    dataIndex: 'content',
  },
  {
    title: '图片',
    dataIndex: 'group_avatar_url',
  },
  {
    title: '所需总人数',
    dataIndex: 'num_member_total',
  },
  {
    title: '已报名人数',
    dataIndex: 'num_member_joined',
  },
  {
    title: '关联的商品ID',
    dataIndex: 'product_id',
  },
  {
    title: '关联的剧本',
    dataIndex: 'script.name',
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
    field: 'title',
    label: '搜索活动',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '搜索状态',
    component: 'Select',
    componentProps: {
      mode: 'multiple',
      options: [
        { label: '禁用', value: 0 },
        { label: '进行中', value: 1 },
        { label: '就绪，停止加人', value: 2 },
        { label: '正在进行', value: 3 },
        { label: '已结束', value: 4 },
        { label: '已撤销', value: 5 },
      ],
    },
    colProps: { span: 8 },
  },
];
export const eventSchema: DescItem[] = [
  {
    field: 'status',
    label: '状态',
  },
  {
    field: 'id',
    label: 'ID',
  },
  {
    field: 'title',
    label: '标题（可留空）',
  },
  {
    field: 'content',
    label: '内容',
  },
  {
    field: 'imageUrls',
    label: '图片',
  },
  {
    field: 'numMemberTotal',
    label: '所需总人数',
  },
  {
    field: 'numMemberJoined',
    label: '已报名人数',
  },
  {
    field: 'status',
    label: '活动状态',
  },
  {
    field: 'productId',
    label: '关联的商品ID',
  },
  {
    field: 'scriptId',
    label: '关联的剧本',
  },
];
export const eventFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    // required: true,
  },
  {
    field: 'content',
    label: '内容',
    component: 'Input',
    // required: true,
  },
  {
    field: 'imageUrls',
    label: '图片',
    component: 'Input',
    slot: 'imageUrls',
    // required: true,
  },
  {
    field: 'numMemberTotal',
    label: '所需总人数',
    component: 'InputNumber',
    defaultValue: 0,
    // required: true,
  },
  {
    field: 'numMemberJoined',
    label: '已报名人数',
    component: 'InputNumber',
    defaultValue: 0,
    // required: true,
  },
  {
    field: 'status',
    label: '活动状态',
    component: 'Select',
    // required: true,
    componentProps: {
      options: [
        { label: '禁用', value: 0 },
        { label: '进行中', value: 1 },
        { label: '就绪，停止加人', value: 2 },
        { label: '正在进行', value: 3 },
        { label: '已结束', value: 4 },
        { label: '已撤销', value: 5 },
      ],
    },
  },
  {
    field: 'ownerId',
    label: '发起人ID',
    component: 'Input',
    // required: true,
  },
  {
    field: 'productId',
    label: '关联的商品ID',
    component: 'Input',
    // required: true,
  },
  {
    field: 'shopId',
    label: '关联的商家',
    component: 'Input',
    // required: true,
  },
  {
    field: 'scriptId',
    label: '关联的剧本',
    component: 'Input',
    // required: true,
  },
];
