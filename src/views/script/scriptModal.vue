<template>
  <BasicModal v-bind="$attrs" @register="registerModalView" :title="getTitle" @ok="handleSubmit">
    <!-- <BasicForm @register="registerForm" /> -->
    <Description
      size="middle"
      title="剧本信息"
      :bordered="false"
      :column="1"
      :data="dataList"
      :schema="scriptSchema"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineProps, defineEmits, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Description } from '/@/components/Description/index';
  import { scriptSchema } from './data';

  const isUpdate = ref(true);
  const dataList: Recordable = ref(null);
  const [registerModalView, { setModalProps, closeModal }] = useModalInner(async (data) => {
    // resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    dataList.value = data?.record;
  });
  const getTitle = '查看剧本';
  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      closeModal();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
