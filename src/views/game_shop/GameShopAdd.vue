<template>
  <BasicModal v-bind="$attrs" @register="registerModalAdd" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #coverUrl="{ model, field }">
        <!-- <Upload :model="model.coverUrl" @uploadCoverUrlApi ="uploadCoverUrlApi" ></Upload> -->
        <a-input v-model:value="model.cover_url" />
        <img :src="model.cover_url" />
        <a-upload :showUploadList="true" :multiple="true" :customRequest="uploadCoverUrlApi">
          <a-button> <upload-outlined /> 上传</a-button>
        </a-upload>
        <!-- <BasicUpload :maxNumber="1" :api="uploadApi" /> -->
      </template>
      <template #bannerUrl="{ model, field }">
        <a-input v-model:value="model.banner_url" />
        <img :src="model.banner_url" />
        <a-upload :showUploadList="true" :multiple="true" :customRequest="uploadBannerUrlApi">
          <a-button> <upload-outlined /> 上传</a-button>
        </a-upload>
        <!-- <BasicUpload :maxNumber="1" :api="uploadApi" /> -->
      </template>
      <template #logoUrl="{ model, field }">
        <a-input v-model:value="model.logo_url" />
        <img :src="model.logo_url" />
        <a-upload :showUploadList="true" :multiple="true" :customRequest="uploadLogoUrlApi">
          <a-button> <upload-outlined /> 上传</a-button>
        </a-upload>
        <!-- <BasicUpload :multiple="false" :maxSize="20" :maxNumber="1" :api="uploadApi" /> -->
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
  import { ref, computed, unref, defineProps, defineEmits } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Upload } from '/@/components/bq-Upload';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import UiHelper from '/@/api/services/util/UiHelper';
  import { appAdmin, GameShopCreateReq } from '/@/api/services/AppAdmin';
  import { shopFormSchema } from './data';
  import { useMessage } from '/@/hooks/web/useMessage';
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
  const { createSuccessModal, createMessage } = useMessage();
  async function uploadCoverUrlApi(e) {
    console.log(e);
    const ret = await UiHelper.handleUpload(e);
    console.log(ret);
    setFieldsValue({
      coverUrl: ret,
    });
  }
  async function uploadBannerUrlApi(e) {
    console.log(e);
    const ret = await UiHelper.handleUpload(e);
    console.log(ret);
    setFieldsValue({
      bannerUrl: ret,
    });
  }
  async function uploadLogoUrlApi(e) {
    console.log(e);
    const ret = await UiHelper.handleUpload(e);
    console.log(ret);
    setFieldsValue({
      logoUrl: ret,
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

  const [registerModalAdd, { setModalProps, closeModal }] = useModalInner(async (data) => {
    // resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
      });
    }
  });

  const handleSubmit = async () => {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // TODO custom api
      const form: GameShopCreateReq = {
        name: values.name,
        coverUrl: values.cover_url,
        bannerUrl: values.banner_url,
        logoUrl: values.logo_url,
        summary: values.summary,
        detail: values.detail,
        manager: values.manager,
        managerPhone: values.manager_phone,
        mapPosLng: parseFloat(values.mapPos.split(',')[1]),
        mapPosLat: parseFloat(values.mapPos.split(',')[0]),
        mapRegion: parseInt(values.map_region[2]) || 0,
        mapAddress: values.map_address,
        settledDate: parseInt(values.settled_date) || 0,
        supportWechat: values.support_wechat,
        supportPhone: values.support_phone,
        status: values.status,
      };
      console.log(form);

      const ret = await appAdmin.gameShop.create(form);
      console.log(ret);
      createMessage.success('新建成功');

      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values } });
    } catch {
      createMessage.error('新建失败');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
</script>
