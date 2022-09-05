<template>
  <BasicModal v-bind="$attrs" @register="registerModalView" :title="getTitle" @ok="handleSubmit">
    <!-- <BasicForm @register="registerForm" /> -->
    <Description
      size="middle"
      title="活动信息"
      :bordered="false"
      :column="1"
      :data="eventData"
      :schema="eventSchema"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineProps, defineEmits, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Description } from '/@/components/Description/index';
  import { eventSchema } from './data';

  const isUpdate = ref(true);
  const eventData: Recordable = ref(null);
  const [registerModalView, { setModalProps, closeModal }] = useModalInner(async (data) => {
    // resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    eventData.value = data?.event;
  });
  const getTitle = '查看活动';
  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      closeModal();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
