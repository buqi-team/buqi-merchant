<template>
  <BasicModal v-bind="$attrs" @register="registerModalView" :title="getTitle" @ok="handleSubmit">
    <!-- <BasicForm @register="registerForm" /> -->
    <Description
      size="middle"
      title="剧本杀店铺信息"
      :bordered="false"
      :column="1"
      :data="shopData"
      :schema="shopSchema"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, defineProps, defineEmits, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Description } from '/@/components/Description/index';
  import { shopSchema } from './data';

  const isUpdate = ref(true);
  const shopData: Recordable = ref(null);
  const [registerModalView, { setModalProps, closeModal }] = useModalInner(async (data) => {
    // resetFields();
    console.log(data);

    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    shopData.value = data?.shop;
    console.log('isUpdate', isUpdate.value);
    console.log('shop', shopData.value);
  });
  const getTitle = '查看店铺';
  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      closeModal();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
