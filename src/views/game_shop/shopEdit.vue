<template>
  <PageWrapper title="编辑店铺" contentBackground contentClass="p-4">
    <BasicForm @register="registerForm">
      <template #coverUrl="{ model, field }">
        <a-input v-model:value="model.cover_url" />
        <!-- <BasicUpload
          :maxSize="20"
          :maxNumber="10"
          @change="handleChange"
          :api="uploadCoverUrlApi"
          class="my-5"
          :accept="['image/*']"
        /> -->
        <!-- <a-upload
      v-model:file-list="fileList"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      list-type="picture"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        upload
      </a-button>
    </a-upload> -->

        <!-- <Upload :model="model.cover_url" @uploadCoverUrlApi="uploadCoverUrlApi"></Upload> -->
      </template>
      <template #bannerUrl="{ model, field }">
        <a-input v-model:value="model.banner_url" />
        <!-- <Upload :model="model.banner_url" @uploadCoverUrlApi="uploadBannerUrlApi"></Upload> -->
      </template>
      <template #logoUrl="{ model, field }">
        <a-input v-model:value="model.logo_url" />
        <!-- <Upload :model="model.logo_url" @uploadCoverUrlApi="uploadLogoUrlApi"></Upload> -->
      </template>
      <template #mapPos="{ model, field }">
        <a-input v-model:value="model.mapPos" />
        <a-button @click="handleMap">坐标拾取</a-button>
      </template>
    </BasicForm>
    <template #rightFooter>
      <a-button type="primary" @click="customSubmitFunc"> 提交 </a-button>
    </template>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { PageWrapper } from '/@/components/Page';
  import { ref, reactive, computed, unref, defineProps, defineEmits, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import UiHelper from '/@/api/services/util/UiHelper';
  import { appAdmin, GameShopUpdateReq } from '/@/api/services/AppAdmin';
  import { shopFormSchema } from './data';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createSuccessModal, createMessage } = useMessage();
  import { useGo } from '/@/hooks/web/usePage';
  const go = useGo();
  function handleMap() {
    window.open('https://lbs.qq.com/getPoint/', '_blank');
  }

  async function uploadCoverUrlApi(e) {
    console.log(e);
    const ret = await UiHelper.handleUpload(e);

    console.log(ret);
    setFieldsValue({
      cover_url: ret,
    });
    return ret;
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
    schemas: shopFormSchema,
    labelWidth: 100,
    showActionButtonGroup: true,
    actionColOptions: {
      offset: 8,
      span: 24,
    },
  });
  let data: any = ref(null);
  async function reloadListData() {
    const res = await appAdmin.gameShop.get();
    data = {
      status: res.status,
      name: res.name,
      id: res.id,
      cover_url: res.cover_url,
      banner_url: res.banner_url,
      logo_url: res.logo_url,
      summary: res.summary,
      detail: res.detail,
      manager: res.manager,
      manager_phone: res.manager_phone,
      map_pos_lng: res.map_pos_lng,
      map_pos_lat: res.map_pos_lat,
      map_region: res.map_region,
      map_address: res.map_address,
      settled_date: res.settled_date,
      support_phone: res.support_phone,
      support_wechat: res.support_wechat,
      created_at: res.created_at,
      updated_at: res.updated_at,
    };
    console.log('data', data);
    if (data) {
      setFieldsValue({
        ...data,
      });
      setFieldsValue({
        mapPos: data.map_pos_lat + ',' + data.map_pos_lng,
        map_region: region(data),
        settled_date: data.settled_date.toString(),
      });
    }
  }
  onMounted(() => {
    reloadListData();
  });

  const region = (data: any) => {
    let regionArr: any = reactive([]);
    const province = parseInt(data.map_region / 10000) * 10000;
    const city = parseInt((data.map_region % 1000) / 100) * 100;
    const area = parseInt(data.map_region % 10);
    regionArr.push(province.toString());
    regionArr.push((province + city).toString());
    regionArr.push((province + city + area).toString());
    return regionArr;
  };

  async function customSubmitFunc() {
    try {
      const values = await validate();
      console.log('values', values);
      const form: GameShopUpdateReq = {
        name: values.name,
        cover_url: values.cover_url,
        banner_url: values.banner_url,
        logo_url: values.logo_url,
        summary: values.summary,
        detail: values.detail,
        manager: values.manager,
        manager_phone: values.manager_phone,
        map_pos_lng: parseFloat(values.mapPos.split(',')[1]) || 0,
        map_pos_lat: parseFloat(values.mapPos.split(',')[0]) || 0,
        map_region: parseInt(values.map_region[2]) || 0,
        map_address: values.map_address,
        settled_date: data.settled_date,
        support_wechat: values.support_wechat,
        support_phone: values.support_phone,
        rating: values.rating,
        opening_hours: values.opening_hours,
        status: data.status,
      };
      console.log('form', form);

      const res = await appAdmin.gameShop.update(form);
      console.log(res);
      go(`/app/gameShop`);

      // closeModal();
      // emit('success', { isUpdate: unref(isUpdate), values: { ...values } });
      createMessage.success('修改成功');
    } catch {
      createMessage.success('修改失败');
    } finally {
      // setModalProps({ confirmLoading: false });
    }
  }
</script>
