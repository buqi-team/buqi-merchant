<template>
  <a-input v-model:value="model" />
  <img :src="model" />
  <a-upload :showUploadList="true" :multiple="false" :customRequest="uploadUrlApi">
    <a-button> <upload-outlined /> 上传</a-button>
  </a-upload>
  <!-- <BasicUpload :multiple="false" :maxSize="20" :maxNumber="1" :api="handleChange" /> -->
</template>

<script lang="ts" setup>
  import { ref, computed, unref, defineProps, defineEmits, reactive, watch } from 'vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  const props = defineProps({
    model: { type: String, default: null },
  });

  const emit = defineEmits(['uploadCoverUrlApi']);
  function uploadUrlApi() {
    emit('uploadCoverUrlApi');
  }
</script>
