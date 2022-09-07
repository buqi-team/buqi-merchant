import { DescItem } from '/@/components/Description/index';
import { FormSchema } from '/@/components/Table';
import { regionData as regionDataLocal } from '/@/api/services/region';
import { InputNumber, Tag, Upload } from 'ant-design-vue';
import { h } from 'vue';
import UiHelper from '/@/api/services/util/UiHelper';
import { Input } from 'ant-design-vue';
import { Tinymce } from '/@/components/Tinymce/index';
export const schema: DescItem[] = [
  {
    field: 'status',
    label: '状态',
  },
  {
    field: 'name',
    label: '店铺名',
    //   render: (curVal, data) => {
    //     return `${data.username}-${curVal}`;
    //   },
  },

  {
    field: 'id',
    label: '店铺ID',
  },
  {
    field: 'cover_url',
    label: '店铺封面图',
  },
  {
    field: 'banner_url',
    label: '店铺横幅图',
  },
  {
    field: 'logo_url',
    label: '店铺LOGO图',
  },
  {
    field: 'summary',
    label: '店铺简介',
  },
  {
    field: 'detail',
    label: '店铺详情',
  },
  {
    field: 'rating',
    label: '评分',
  },
  {
    field: 'opening_hours',
    label: '开店时长',
  },
  {
    field: 'manager',
    label: '店铺经理',
  },
  {
    field: 'manager_phone',
    label: '店铺经理手机号',
  },
  {
    field: 'map_pos_lng',
    label: '经度',
  },
  {
    field: 'map_pos_lat',
    label: '维度',
  },
  {
    field: 'map_region',
    label: '区域号',
  },
  {
    field: 'map_address',
    label: '地址',
  },
  {
    field: 'settled_date',
    label: '入住日期',
  },
  {
    field: 'support_phone',
    label: '联系手机号',
  },
  {
    field: 'support_wechat',
    label: '联系微信',
  },
  {
    field: 'created_at',
    label: '创建日期',
  },
  {
    field: 'updated_at',
    label: '修改日期',
  },
];

export const shopFormSchema: FormSchema[] = [
  {
    field: 'status',
    label: '状态',
    // required: true,
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: '停用', value: 0 },
        { label: '启用', value: 1 },
      ],
    },
  },
  {
    field: 'name',
    label: '店名',
    component: 'Input',
    // required: true,
  },
  {
    field: 'cover_url',
    label: '封面图',
    helpMessage: ['必须使用https链接'],
    component: 'Input',
    // required: true,
    slot: 'coverUrl',
  },
  {
    field: 'banner_url',
    label: '横幅图',
    helpMessage: ['必须使用https链接'],
    component: 'Input',
    // required: true,
    slot: 'bannerUrl',
  },
  {
    field: 'logo_url',
    label: 'LOGO',
    helpMessage: ['必须使用https链接'],
    component: 'Input',
    // required: true,
    slot: 'logoUrl',
  },
  {
    field: 'detail',
    component: 'Input',
    label: '详情',
    // rules: [{ required: true }],
    render: ({ model, field }) => {
      return h(Tinymce, {
        value: model[field],
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },
  {
    field: 'summary',
    label: '简介',
    component: 'Input',
    // required: true,
  },
  {
    field: 'rating',
    label: '评分',
    component: 'InputNumber',
    // required: true,
  },
  {
    field: 'opening_hours',
    label: '开店时长',
    component: 'Input',
    // required: true,
  },
  {
    field: 'manager',
    label: '负责人',
    component: 'Input',
    // required: true,
  },
  {
    field: 'manager_phone',
    label: '负责人电话',
    component: 'Input',
    // required: true,
  },
  {
    field: 'mapPos',
    label: '经纬值',
    defaultValue: '39.90984,116.342476',
    component: 'Input',
    slot: 'mapPos',
  },
  {
    field: 'map_region',
    label: '省市区位值',
    component: 'Cascader',
    // required: true,
    componentProps: {
      options: regionDataLocal,
    },
  },
  {
    field: 'map_address',
    label: '街道地址',
    component: 'Input',
    // required: true,
  },
  {
    field: 'settled_date',
    label: '入驻时间',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'X',
    },
  },
  {
    field: 'support_wechat',
    label: '客服微信',
    component: 'Input',
    // required: true,
  },
  {
    field: 'support_phone',
    label: '客服电话',
    component: 'Input',
    // required: true,
  },
];
