<template>
  <BasicModal v-bind="$attrs" @register="registerModalAdd" @ok="handleSubmit" title="编辑玩家">
    <BasicForm @register="registerForm">
      <template #imageUrls="{ model, field }">
        <Upload
          v-if="model.imageUrls"
          :model="model.imageUrls"
          @uploadCoverUrlApi="uploadimageUrlsApi"
        ></Upload>
        <div v-else>
          <a-upload :showUploadList="true" :multiple="false" :customRequest="uploadimageUrlsApi">
            <a-button> <upload-outlined></upload-outlined> 上传</a-button>
          </a-upload>
        </div>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  //   import { UploadOutlined } from '@ant-design/icons-vue';
  import { ref, computed, unref, defineProps, defineEmits, onMounted } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Upload } from '/@/components/bq-Upload';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import UiHelper from '/@/api/services/util/UiHelper';
  import { appAdmin, EventUpdateReq } from '/@/api/services/AppAdmin';
  import { eventFormSchema } from './data';
  async function uploadimageUrlsApi(e) {
    console.log(e);
    const ret = await UiHelper.handleUpload(e);
    console.log(ret);
    setFieldsValue({
      imageUrls: ret,
    });
  }
  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');
  const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: eventFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 26,
    },
  });

  const [registerModalAdd, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    console.log('data', data);
    if (unref(isUpdate)) {
      rowId.value = data.record.id;
      setFieldsValue({
        ...data.record,
      });
    }
  });

  const handleSubmit = async () => {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // // TODO custom api
      const form: EventUpdateReq = {
        id: rowId.value,
        title: values.title,
        content: values.content,
        imageUrls: values.imageUrls || ['123'],
        numMemberTotal: values.numMemberTotal,
        numMemberJoined: values.numMemberJoined,
        status: values.status,
        productId: values.productId,
        scriptId: values.scriptId,
        ownerId: values.ownerId,
        shopId: values.shopId,
      };

      console.log(form);
      const ret = await appAdmin.event.update(form);
      console.log(ret);

      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
</script>
