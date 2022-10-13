<template>
  <Popover
    :visible="state.stream"
    @click="state.stream = true"
    title=""
    trigger="click"
    :overlayClassName="`${prefixCls}__overlay`"
  >
    <Badge>
      <BarcodeOutlined />
    </Badge>
    <template #content>
      <div class="">
        <qr-stream v-if="state.stream" @decode="onDecode" class="mb">
          <div style="color: red" class="frame"></div>
        </qr-stream>
        {{ state.result }}
      </div>
      <div class="mt-2 w-full flex justify-center">
        <Button class="" @click="state.stream = false">关闭</Button>
      </div>
    </template>
  </Popover>
</template>
<script lang="ts" setup>
  import { Button } from 'ant-design-vue';
  import { QrStream, QrCapture, QrDropzone } from 'vue3-qr-reader';
  import { computed, defineComponent, ref, reactive } from 'vue';
  import { Popover, Tabs, Badge } from 'ant-design-vue';
  import { BarcodeOutlined } from '@ant-design/icons-vue';
  // import { tabListData, ListItem } from './data';
  // import NoticeList from './NoticeList.vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { appAdmin } from '/@/api/services/AppAdmin';

  const { prefixCls } = useDesign('header-notify');
  const { createMessage } = useMessage();
  // const listData = ref(tabListData);
  const state = reactive({
    result: '',
    stream: false,
  });

  async function onDecode(data) {
    console.log(data);

    state.result = data;
    let form = {
      qrcode: state.result,
    };

    createMessage.success('扫描成功');
    const res = await appAdmin.gameShop.checkIn(form);
    if (res) {
      createMessage.success('签到成功');
      setTimeout(() => {
        state.stream = false;
        state.result = '';
      }, 600);
    }
  }
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-notify';

  .@{prefix-cls} {
    padding-top: 2px;

    &__overlay {
      max-width: 360px;
    }

    .ant-tabs-content {
      width: 300px;
    }

    .ant-badge {
      font-size: 18px;

      .ant-badge-multiple-words {
        padding: 0 4px;
      }

      svg {
        width: 0.9em;
      }
    }
  }
</style>
