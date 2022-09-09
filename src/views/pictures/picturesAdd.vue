<template>
  <BasicModal v-bind="$attrs" @register="registerModalAdd" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #coverUrl="{ model, field }">
        <a-input v-model:value="model.coverUrl"></a-input>
        <Upload
          name="file"
          @change="handleChange"
          :show-upload-list="false"
          :action="uploadCoverUrlApi"
          accept=".jpg,.jpeg,.gif,.png,.webp,.jfif"
        >
          <a-button> Upload </a-button>
        </Upload>
        <img :src="model.coverUrl" />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { Upload } from 'ant-design-vue';
  import { ref, computed, unref, defineProps, defineEmits } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import UiHelper from '/@/api/services/util/UiHelper';
  import { appAdmin, GameShopPicsCreateReq } from '/@/api/services/AppAdmin';
  import { editFormSchema } from './data';
  import { useRouter } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { currentRoute } = useRouter();

  const { createSuccessModal, createMessage } = useMessage();

  let shopArr: any = [];
  const handleChange = (list: string[]) => {
    // createMessage.info(`已上传文件${JSON.stringify(list)}`);
  };
  async function uploadCoverUrlApi(e) {
    console.log(e);
    let form = {
      file: e,
    };
    const ret = await UiHelper.handleUpload(form);
    console.log(ret);

    if (ret) shopArr.push(ret);
    console.log(shopArr);
    setFieldsValue({
      coverUrl: shopArr.toString(),
    });

    return ret;
  }

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const shopId = ref('');
  const rowId = ref('');

  const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: editFormSchema,
    useSearchForm: false,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 26,
    },
  });

  const [registerModalAdd, { setModalProps, closeModal }] = useModalInner(async (data) => {
    // resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    // if (unref(isUpdate)) {
    //   setFieldsValue({
    //     ...data.record,
    //   });
    // }
  });

  const handleSubmit = async () => {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // TODO custom api
      const form: GameShopPicsCreateReq = {
        urls: shopArr,
      };
      console.log(form);

      const ret = await appAdmin.gameShopPics.create(form);
      createMessage.success('上传完成');
      // console.log(ret);

      closeModal();
      resetFields();

      emit('success', { isUpdate: unref(isUpdate), values: { ...values } });
    } catch {
      createMessage.error('上传失败');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
</script>
