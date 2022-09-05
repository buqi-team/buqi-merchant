<template>
  <BasicModal v-bind="$attrs" @register="registerModalAdd" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { ref, computed, unref, defineProps, defineEmits } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Upload } from '/@/components/bq-Upload';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import UiHelper from '/@/app-shared/services/util/UiHelper';
  import { appAdmin, RoomsCreateReq } from '/@/api/services/AppAdmin';
  import { editFormSchema } from './data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useGo } from '/@/hooks/web/usePage';
  import { useTabs } from '/@/hooks/web/useTabs';
  const { setTitle, updatePath } = useTabs();
  const go = useGo();

  const { createSuccessModal, createMessage } = useMessage();
  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');

  const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: editFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 26,
    },
  });

  const [registerModalAdd, { setModalProps, closeModal }] = useModalInner(async (data) => {
    // resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    rowId.value = data?.id;
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
      const form: RoomsCreateReq = {
        name: values.name,
      };
      console.log(form);

      const ret = await appAdmin.room.create(form);
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
