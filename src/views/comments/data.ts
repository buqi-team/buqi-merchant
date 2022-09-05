import { BasicColumn } from '/@/components/Table';
import UiHelper from '/@/api/services/util/UiHelper';
import { Tag } from 'ant-design-vue';
import { h } from 'vue';
import { DescItem } from '/@/components/Description/index';
import { FormSchema } from '/@/components/Table';
export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '评论',
    dataIndex: 'content',
  },
  {
    title: '评论人手机',
    dataIndex: 'owner.phone_number',
  },
  {
    title: '评论人昵称',
    dataIndex: 'owner.screen_name',
  },
  {
    title: '评论人用户名',
    dataIndex: 'owner.username',
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    customRender: ({ text }) => {
      if (text) return UiHelper.converter.timestampFormatter(text);
      return '';
    },
  },
];
export const descSchema: DescItem[] = [
  {
    field: 'id',
    label: 'ID',
  },

  {
    field: 'content',
    label: '评论信息',
  },
  {
    field: 'owner.phone_number',
    label: '评论人手机',
  },
  {
    field: 'owner.screen_name',
    label: '评论人昵称',
  },
  {
    field: 'owner.username',
    label: '评论人用户名',
  },
  {
    field: 'created_at',
    label: '创建时间',
  },
];
