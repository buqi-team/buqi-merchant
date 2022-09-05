import { BasicColumn } from '/@/components/Table';
import { appAdmin } from '/@/api/services/AppAdmin';
import { computed, ref, reactive, onMounted, watch } from 'vue';
import { DescItem } from '/@/components/Description/index';
import { FormSchema } from '/@/components/Table';
import { InputNumber, Tag, Upload } from 'ant-design-vue';
import { h } from 'vue';
import UiHelper from '/@/api/services/util/UiHelper';
import { Input } from 'ant-design-vue';
import { Tinymce } from '/@/components/Tinymce/index';
import { Time } from '/@/components/Time';
import moment from 'moment';
import { regionData as regionDataLocal } from '/@/api/services/region';
export const columns: BasicColumn[] = [
  {
    title: '店名',
    dataIndex: 'name',
  },
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
    title: '封面图',
    dataIndex: 'cover_url',
  },
  {
    title: '横幅图',
    dataIndex: 'banner_url',
  },
  {
    title: 'Logo',
    dataIndex: 'logo_url',
  },
  {
    title: '简介',
    dataIndex: 'summary',
  },
  {
    title: '详情',
    dataIndex: 'detail',
  },
  {
    title: '负责人',
    dataIndex: 'manager',
  },
  {
    title: '负责人电话',
    dataIndex: 'manager_phone',
  },
  {
    title: '经度',
    dataIndex: 'map_pos_lng',
  },
  {
    title: '纬度',
    dataIndex: 'map_pos_lat',
  },
  {
    title: '省市区',
    dataIndex: 'map_region',
  },
  {
    title: '街道门牌',
    dataIndex: 'map_address',
  },
  {
    title: '营业时间',
    dataIndex: 'opening_hours',
  },
  {
    title: '入驻时间',
    dataIndex: 'settled_date',
    customRender: ({ text }) => {
      return UiHelper.converter.timestampFormatter(text);
    },
  },
  {
    title: '客服微信',
    dataIndex: 'supportWechat',
  },
  {
    title: '客服电话',
    dataIndex: 'supportPhone',
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
    field: 'name',
    label: '搜索店名',
    component: 'Input',
    colProps: { span: 8 },
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
    // render: ({ model, field }) => {
    //   return h(Input, {
    //     value: model,
    //   });
    // return h(Tinymce, {
    //   value: model[field],
    //   onChange: (value: string) => {
    //     model[field] = value;
    //   },
    // });
  },

  // required: true,
  // },
  // {
  //   field: 'mapPosLat',
  //   label: '位值维度',
  //   defaultValue: 39.90984,
  //   component: 'Input',
  //   slot: 'mapPosLat',
  //   // required: true,
  // },
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

export const shopSchema: DescItem[] = [
  {
    field: 'status',
    label: '状态',
  },
  {
    field: 'name',
    label: '店名',
  },
  {
    field: 'id',
    label: 'ID',
  },
  {
    field: 'cover_url',
    label: '封面图',
  },
  {
    field: 'banner_url',
    label: '横幅图',
  },
  {
    field: 'logo_url',
    label: 'Logo图',
  },
  {
    field: 'summary',
    label: '简介',
  },
  {
    field: 'detail',
    label: '详情',
  },
  {
    field: 'manager',
    label: '负责人',
  },
  {
    field: 'manager_phone',
    label: '负责人电话',
  },
  {
    field: 'map_pos_lng',
    label: '经度',
  },
  {
    field: 'map_pos_lat',
    label: '纬度',
  },
  {
    field: 'map_region',
    label: '省市区',
  },
  {
    field: 'map_address',
    label: '街道门牌',
  },
  {
    field: 'settled_date',
    label: '入驻时间',
  },
  {
    field: 'support_wechat',
    label: '客服微信',
  },
  {
    field: 'support_phone',
    label: '客服电话',
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
