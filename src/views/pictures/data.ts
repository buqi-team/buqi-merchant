import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
  },

  {
    title: '店铺图片',
    dataIndex: 'url',
    slots: { customRender: 'imageUrl' },
  },
];
export const editFormSchema: FormSchema[] = [
  {
    field: 'coverUrl',
    label: '封面图',
    helpMessage: ['必须使用https链接'],
    component: 'Input',
    slot: 'coverUrl',
  },
];
