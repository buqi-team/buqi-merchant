<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModalEdit"
    :title="'编辑店铺信息'"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #coverUrl="{ model, field }">
        <Upload :model="model.cover_url" @uploadCoverUrlApi="uploadCoverUrlApi" />
      </template>
      <template #bannerUrl="{ model, field }">
        <Upload :model="model.banner_url" @uploadCoverUrlApi="uploadBannerUrlApi" />
      </template>
      <template #logoUrl="{ model, field }">
        <Upload :model="model.logo_url" @uploadCoverUrlApi="uploadLogoUrlApi" />
        <!-- <a-input v-model:value="model.logoUrl"></a-input>
        <img :src="model.logoUrl" />
        <a-upload :showUploadList="true" :multiple="false" :customRequest="uploadLogoUrlApi">
          <a-button> <upload-outlined></upload-outlined> 上传</a-button>
        </a-upload> -->
        <!-- <BasicUpload :multiple="false" :maxSize="20" :maxNumber="1" :api="handleChange" /> -->
      </template>
      <template #mapPos="{ model, field }">
        <a-input v-model:value="model.mapPos" />
        <a-button @click="handleMap">坐标拾取</a-button>
      </template>
      <!-- <template #mapPosLat="{ model, field }">
        <a-input-number id="inputNumber" v-model:value="model.mapPosLat" />
        <a-button @click="handleMap">链接</a-button>
      </template> -->
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { ref, reactive, computed, unref, defineProps, defineEmits } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { Upload } from '/@/components/bq-Upload';
  import UiHelper from '/@/app-shared/services/util/UiHelper';
  import { appAdmin, GameShopUpdateReq } from '/@/app-shared/services/AppAdmin';
  import { shopFormSchema } from './data';
  import { useGo } from '/@/hooks/web/usePage';
  import { useTabs } from '/@/hooks/web/useTabs';
  const { setTitle, updatePath } = useTabs();
  const go = useGo();

  function handleMap() {
    // 设置tab的标题
    // 更新当前tab的path并跳转到新页面
    // const path = 'tencent';
    // go(path, true);

    window.open('https://lbs.qq.com/getPoint/', '_blank');

    // 此时会在当前标签打开path
  }

  async function uploadCoverUrlApi(e) {
    console.log(e);
    const ret = await UiHelper.handleUpload(e);
    console.log(ret);
    setFieldsValue({
      cover_url: ret,
    });
  }
  async function uploadBannerUrlApi(e) {
    console.log(e);
    const ret = await UiHelper.handleUpload(e);
    console.log(ret);
    setFieldsValue({
      banner_url: ret,
    });
  }
  async function uploadLogoUrlApi(e) {
    console.log(e);
    const ret = await UiHelper.handleUpload(e);
    console.log(ret);
    setFieldsValue({
      logo_url: ret,
    });
  }

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');

  const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: shopFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 26,
    },
  });

  const [registerModalEdit, { setModalProps, closeModal }] = useModalInner((data) => {
    // resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    console.log(data.record);
    rowId.value = data.record.id;
    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
      });
    }
    setFieldsValue({
      mapPos: data.record.map_pos_lat + ',' + data.record.map_pos_lng,
      map_region: region(data),
      settled_date: data.record.settled_date.toString(),
    });
  });
  const region = (data: any) => {
    let regionArr: any = reactive([]);
    const province = parseInt(data.record.map_region / 10000) * 10000;
    const city = parseInt((data.record.map_region % 1000) / 100) * 100;
    const area = parseInt(data.record.map_region % 10);
    regionArr.push(province.toString());
    regionArr.push((province + city).toString());
    regionArr.push((province + city + area).toString());
    return regionArr;
  };

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // TODO custom api
      console.log(values);
      const form: GameShopUpdateReq = {
        id: rowId.value,
        name: values.name,
        coverUrl: values.cover_url,
        bannerUrl: values.banner_url,
        logoUrl: values.logo_url,
        summary: values.summary,
        detail: values.detail,
        manager: values.manager,
        managerPhone: values.manager_phone,
        mapPosLng: parseFloat(values.mapPos.split(',')[1]) || 0,
        mapPosLat: parseFloat(values.mapPos.split(',')[0]) || 0,
        mapRegion: parseInt(values.map_region[2]) || 0,
        mapAddress: values.map_address,
        settledDate: parseInt(values.settled_date) || 0,
        supportWechat: values.support_wechat,
        supportPhone: values.support_phone,
        status: values.status,
      };
      console.log(form);

      await appAdmin.gameShop.update(form);
      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
