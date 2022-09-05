<template>
  <BasicModal v-bind="$attrs" @register="registerModalAdd" @ok="handleSubmit" title="添加剧本">
    <BasicForm @register="registerForm">
      <template #coverUrl="{ model, field }">
        <Upload
          v-if="model.cover_url"
          :model="model.cover_url"
          @uploadCoverUrlApi="uploadcoverUrlApi"
        ></Upload>
        <div v-else>
          <a-upload :showUploadList="true" :multiple="false" :customRequest="uploadcoverUrlApi">
            <a-button> <upload-outlined></upload-outlined> 上传</a-button>
          </a-upload>
        </div>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineProps, defineEmits, onMounted } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Upload } from '/@/components/bq-Upload';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import UiHelper from '/@/api/services/util/UiHelper';
  import { appAdmin, ScriptUpdateReq } from '/@/api/services/AppAdmin';
  import { ScriptStyleSelector } from '/@/api/services/AppAdmin/ScriptStyleSelector';
  import { scriptFormSchema } from './data';
  async function uploadcoverUrlApi(e) {
    console.log(e);
    const ret = await UiHelper.handleUpload(e);
    console.log(ret);
    setFieldsValue({
      coverUrl: ret,
    });
  }
  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');
  const styleIds = {
    list: [] as any[],
  };
  const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: scriptFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 26,
    },
  });

  const [registerModalAdd, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    const scriptStyleSelector = new ScriptStyleSelector();
    const treeData = await scriptStyleSelector.query();

    updateSchema([
      {
        field: 'styleIds',
        componentProps: {
          options: treeData,
        },
      },
    ]);
    if (unref(isUpdate)) {
      rowId.value = data.record.id;
      setFieldsValue({
        ...data.record,
      });
    }

    const ret = await appAdmin.script.get(rowId.value, ['styles']);
    styleIds.list = ret.styles;
    setFieldsValue({
      styleIds: styleIds.list.map((i) => i.id),
    });
  });

  const handleSubmit = async () => {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      // // TODO custom api
      const form: ScriptUpdateReq = {
        id: rowId.value,
        name: values.name,
        numberMax: parseInt(values.numberMax) || 0,
        numberMin: parseInt(values.numberMin) || 0,
        minuteDuration: parseInt(values.minuteDuration) || 0,
        coverUrl: values.coverUrl || '',
        authorName: values.authorName || '',
        publishDate: parseInt(values.publishDate) || 0,
        description: values.description || '',
        detail: values.detail || '',
        status: values.status || '',
        styleIds: values.styleIds || [],
      };

      console.log(form);
      const ret = await appAdmin.script.update(form);

      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
</script>
