<template>
  <PageWrapper content="">
    <div class="py-8 bg-white flex flex-col justify-center items-center">
      <BasicForm @register="register" />
      <div class="flex justify-center">
        <a-button @click="resetFields"> 重置 </a-button>
        <a-button class="!ml-4" type="primary" @click="handleSubmit"> 确认 </a-button>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form';
  import { appAdmin, UpdatePasswordReq } from '/@/api/services/AppAdmin';
  import { formSchema } from './pwd.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageEnum } from '/@/enums/pageEnum';
  import { router } from '/@/router';
  import { useRouter } from 'vue-router';
  const { createSuccessModal, createMessage } = useMessage();
  export default defineComponent({
    name: 'ChangePassword',
    components: { BasicForm, PageWrapper },
    setup() {
      const [register, { validate, resetFields }] = useForm({
        size: 'large',
        baseColProps: { span: 24 },
        labelWidth: 100,
        showActionButtonGroup: false,
        schemas: formSchema,
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          const { passwordOld, passwordNew } = values;
          let params: UpdatePasswordReq = {
            oldPassword: values.passwordOld,
            newPassword: values.passwordNew,
          };

          // TODO custom api
          const res = await appAdmin.password.update(params);
          console.log(res);

          createMessage.success('修改成功');
          resetFields();
          // const { router } = useRouter();
          // router.push(PageEnum.BASE_LOGIN);
        } catch (error) {
          // createMessage.error('修改失败',error);
        }
      }

      return { register, resetFields, handleSubmit };
    },
  });
</script>
