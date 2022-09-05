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
    title: '房间名',
    dataIndex: 'name',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    customRender: ({ text }) => {
      if (text) return UiHelper.converter.timestampFormatter(text);
      return '';
    },
  },
  {
    title: '修改时间',
    dataIndex: 'updatedAt',
    customRender: ({ text }) => {
      if (text) return UiHelper.converter.timestampFormatter(text);
      return '';
    },
  },
];

export const editFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '房间',
    component: 'Input',
    // required: true,
  },
];
