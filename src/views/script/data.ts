import { BasicColumn } from '/@/components/Table';
import UiHelper from '/@/api/services/util/UiHelper';
import { Tag } from 'ant-design-vue';
import { h } from 'vue';
import { DescItem } from '/@/components/Description/index';
import { FormSchema } from '/@/components/Table';
import { Tinymce } from '/@/components/Tinymce/index';
export const columns: BasicColumn[] = [
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ record }) => {
      // const status = record.status;
      let enable = false;
      if (record.status == 1) enable = true;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '名称',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: '最大人数',
    dataIndex: 'number_max',
  },
  {
    title: '最小人数',
    dataIndex: 'number_min',
  },
  {
    title: '时长',
    dataIndex: 'minute_duration',
  },
  {
    title: '封面图',
    dataIndex: 'cover_url',
  },
  {
    title: '作者',
    dataIndex: 'author_name',
  },
  {
    title: '简介',
    dataIndex: 'description',
    ellipsis: true,
  },
  {
    title: '详情',
    dataIndex: 'detail',
  },

  {
    title: '类型',
    dataIndex: 'styles_hash',
  },
  {
    title: '发行时间',
    dataIndex: 'publish_date',
    customRender: ({ text }) => {
      if (text) return UiHelper.converter.timestampFormatter(text);
      return '';
    },
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    customRender: ({ text }) => {
      if (text) return UiHelper.converter.timestampFormatter(text);
      return '';
    },
  },
  {
    title: '修改时间',
    dataIndex: 'updated_at',
    customRender: ({ text }) => {
      if (text) return UiHelper.converter.timestampFormatter(text);
      return '';
    },
  },
];
export const linkScriptColumns: BasicColumn[] = [
  //待关联列表表头
  {
    title: '剧本ID',
    dataIndex: 'id',
  },
  {
    title: '剧本名字',
    dataIndex: 'name',
  },
  {
    title: '剧本价格',
    dataIndex: 'price',
    edit: true,
    // customRender: ({ record }) => {
    //   return h(InputNumber, {
    //     placeholder: '请输入',
    //   },()=>record);
    // }
  },
  {
    title: '剧本原价',
    dataIndex: 'originalPrice',
    edit: true,
    // customRender: ({ record }) => {
    //   return h(InputNumber, {
    //     placeholder: '请输入',
    //   },()=>record);
    // }
  },
];
export const scriptSchema: DescItem[] = [
  {
    field: 'status',
    label: '状态',
  },
  {
    field: 'id',
    label: 'ID',
  },
  {
    field: 'name',
    label: '剧本名',
  },
  {
    field: 'number_max',
    label: '最大人数',
  },
  {
    field: 'number_min',
    label: '最小人数',
  },
  {
    field: 'minute_duration',
    label: '时长',
  },
  {
    field: 'cover_url',
    label: '封面图',
  },
  {
    field: 'author_name',
    label: '作者',
  },
  {
    field: 'description',
    label: '简介',
  },
  {
    field: 'detail',
    label: '详情',
  },
  {
    field: 'styles_hash',
    label: '类型标签',
  },
  {
    field: 'publish_date',
    label: '发行时间',
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
export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '搜索剧本',
    component: 'Input',
    colProps: { span: 8 },
  },
];
export const scriptFormSchema: FormSchema[] = [
  {
    field: 'scriptId',
    label: '剧本ID',
    component: 'Input',
    // required: true,
  },
  {
    field: 'price',
    label: '价格',
    component: 'InputNumber',
    defaultValue: 0,
    // required: true,
  },
  {
    field: 'originalPrice',
    label: '原价',
    component: 'InputNumber',
    defaultValue: 0,
    // required: true,
  },
];
