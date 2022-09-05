<template>
  <BasicModal v-bind="$attrs" @register="registerModalAdd" @ok="handleSubmit" title="编辑房间">
    <BasicForm @register="registerForm" />
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
  import { appAdmin, RoomsUpdateReq } from '/@/api/services/AppAdmin';
  import { PlayerRoleSelector } from '/@/app-shared/services/AppAdmin/PlayerRoleSelector';
  import { GameShopSelector } from '/@/app-shared/services/AppAdmin/GameShopSelector';
  import { editFormSchema } from './data';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createSuccessModal, createMessage } = useMessage();
  async function uploadAvatarUrlApi(e) {
    console.log(e);
    const ret = await UiHelper.handleUpload(e);
    console.log(ret);
    setFieldsValue({
      avatarUrl: ret,
    });
  }
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
      const form: RoomsUpdateReq = {
        id: rowId.value,
        name: values.name,
      };

      console.log(form);
      const ret = await appAdmin.room.update(form);
      console.log(ret);

      closeModal();
      createMessage.success('编辑成功');
      emit('success', { isUpdate: unref(isUpdate), values: { ...values } });
    } catch {
      createMessage.error('编辑失败');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  };
</script>
