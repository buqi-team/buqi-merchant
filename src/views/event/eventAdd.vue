<template>
  <BasicModal v-bind="$attrs" @register="registerModalAdd" @ok="handleSubmit" title="添加活动">
    <BasicForm @register="registerForm">
      <template #imageUrls="{ model, field }">
        <a-input v-model:value="model.imageUrls"></a-input>
        <BasicUpload
          :maxSize="20"
          :maxNumber="10"
          @change="handleChange"
          :api="uploadCoverUrlApi"
          class="my-5"
          :accept="['image/*']"
        />
        <!-- <Upload
          v-if="model.avatarUrl"
          :model="model.avatarUrl"
          @uploadCoverUrlApi="uploadAvatarUrlApi"
        ></Upload>
        <div v-else>
          <a-upload :showUploadList="true" :multiple="false" :customRequest="uploadAvatarUrlApi">
            <a-button> <upload-outlined></upload-outlined> 上传</a-button>
          </a-upload>
        </div> -->
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
  import { appAdmin, EventCreateReq } from '/@/api/services/AppAdmin';
  import { eventFormSchema } from './data';
  async function uploadAvatarUrlApi(e) {
    const ret = await UiHelper.handleUpload(e);
    console.log(ret);
    setFieldsValue({
      imageUrls: ret,
    });
  }
  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
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
      console.log(data);
      setFieldsValue({
        ...data.record,
      });
    }
  });
  const handleChange = (list: string[]) => {
    createMessage.info(`已上传文件${JSON.stringify(list)}`);
  };
  const handleSubmit = async () => {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // // TODO custom api
      const form: EventCreateReq = {
        title: values.title,
        content: values.content,
        imageUrls: values.imageUrls || [],
        numMemberTotal: values.numMemberTotal,
        numMemberJoined: values.numMemberJoined,
        status: values.status,
        productId: values.productId,
        ownerId: values.ownerId,
        shopId: values.shopId,
        scriptId: values.scriptId,
      };

      console.log(form);
      const ret = await appAdmin.event.create(form);
      console.log(ret);

      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
</script>
