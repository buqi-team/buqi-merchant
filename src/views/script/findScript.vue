<template>
  <PageWrapper title="关联剧本" contentBackground>
    <!-- <BasicForm @register="register" @submit="handleAdd"> -->
    <!-- <template #remoteSearch="{ model, field }">
          <ApiSelect
            :api="optionsListApi"
            showSearch
            :filterOption="false"
            :params="searchParams"
            @change="handleAdd"
            @search="onSearch"
            :immediate="false"
          />
        </template> -->
    <!-- </BasicForm> -->
    <div class="m-4 bg-white" v-if="isImport">
      识别成功{{ successImportTotal }}条, 失败{{ errorArr.length }}条,失败剧本：
      <span v-for="item in errorArr" key="item">{{ item.name }}({{ item.rowNum }}),</span>
    </div>

    <BasicTable title="待关联列表" @register="registerTable">
      <template #toolbar>
        <ImpExcel @success="loadDataSuccess" @error="loadDataFail">
          <a-button class="m-3"> 导入Excel </a-button>
        </ImpExcel>
        <a-button type="primary" @click="handleSubmit">提交关联剧本</a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import {
    BasicTable,
    useTable,
    TableAction,
    BasicColumn,
    ActionItem,
    EditRecordRow,
  } from '/@/components/Table';
  import { Alert } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { appAdmin, ShopScriptModel } from '/@/api/services/AppAdmin';
  import { linkScriptColumns } from './data';
  import { useRouter } from 'vue-router';
  import { BasicForm, useForm, FormSchema, ApiSelect } from '/@/components/Form/index';
  import { computed, ref, reactive, onMounted, watch, unref, watchEffect } from 'vue';
  import UiHelper from '/@/api/services/util/UiHelper';
  import { useGo } from '/@/hooks/web/usePage';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { message } from 'ant-design-vue';
  import { ImpExcel, ExcelData } from '/@/components/Excel';
  import { useI18n } from '/@/hooks/web/useI18n';
  const go = useGo();
  const { t } = useI18n();
  import { h } from 'vue';
  import { Input } from 'ant-design-vue';
  const data: any = [];
  type errorScript = { name: string; rowNum: Number };
  const errorArr: errorScript[] = [];
  const successImportTotal = ref(0);
  const isImport = ref(false);
  const { currentRoute } = useRouter();
  const shopId = computed(() => {
    return unref(currentRoute).params.id;
  });

  const keyword = ref<string>('');
  const searchParams = computed<Recordable>(() => {
    return { keyword: unref(keyword) };
  });
  function onSearch(value: string) {
    keyword.value = value;
  }
  const listConditionRef = ref({
    keyword: searchParams.value.keyword,
    page: 1,
    pageSize: 10,
  });
  const tableListRef = ref<
    {
      title: string;
      columns?: any[];
      dataSource?: any[];
    }[]
  >([]);
  async function loadDataSuccess(excelDataList: ExcelData[]) {
    isImport.value = false;
    tableListRef.value = [];
    console.log('导入的列表', excelDataList);
    for (const excelData of excelDataList) {
      const {
        header,
        results,
        meta: { sheetName },
      } = excelData;
      // var listCond = listConditionRef.value;

      // let scriptArr = reactive<ShopScriptModel[]>([]);

      for (let i = 0; i < results.length; i++) {
        try {
          // listCond.keyword = results[i].name;
          let form = {
            name: results[i].name,
          };
          console.log(form);

          const script = await appAdmin.scriptSearch.find(form);
          console.log('调用接口后的剧本资料', script);
          const dataSource = getDataSource();
          const addRow: EditRecordRow = {
            id: script.items[0].id,
            name: results[i].name,
            price: results[i].price || results[i].originalPrice,
            originalPrice: results[i].originalPrice || results[i].price,
            key: `${Date.now()}`,
          };
          dataSource.push(addRow);
          successImportTotal.value++;
        } catch {
          errorArr.push({ name: results[i].name, rowNum: results[i].__rowNum__ + 1 });
        } finally {
          continue;
        }
      }
      console.log('导入错误', errorArr);

      isImport.value = true;
      createMessage.success('导入完成');
    }
  }
  function loadDataFail(excelDataList: ExcelData[]) {}

  var optionsRef: any = ref([]);
  async function optionsListApi() {
    optionsRef.value = [];
    var listCond = listConditionRef.value;
    listCond.keyword = searchParams.value.keyword;
    const res = await appAdmin.scriptSearch.list(listCond);
    optionsRef.value = UiHelper.converter.listToSelectOptions(res.items);
    console.log(res);
    console.log(optionsRef.value);

    return optionsRef.value;
  }
  const searchScriptSchema: FormSchema[] = [
    {
      field: 'scriptId',
      component: 'ApiSelect',
      label: '搜索剧本',
      slot: 'remoteSearch',
      colProps: {
        span: 8,
      },
    },
  ];
  const [register, { validate, setProps }] = useForm({
    labelWidth: 80,
    showActionButtonGroup: false,
    schemas: searchScriptSchema,
    actionColOptions: {
      span: 14,
    },
  });

  const { createSuccessModal, createMessage } = useMessage();
  async function handleSubmit(record: Recordable) {
    try {
      const dataSource = getDataSource();
      console.log(dataSource);
      const scriptArr = reactive<ShopScriptModel[]>([]);
      for (let i = 0; i < data.length; i++) {
        scriptArr.push({
          price: parseInt(data[i].price),
          originalPrice: parseInt(data[i].originalPrice),
          scriptId: data[i].id,
        });
      }

      const form = {
        scripts: scriptArr,
      };

      console.log('要提交的数据:script', scriptArr);
      console.log('form', form);
      if (scriptArr.length == 0) {
        throw 'null';
      }

      const ret = await appAdmin.script.create(scriptArr);
      console.log(ret);
      data.value = [];

      go(`/app/script`);
      createMessage.success('提交完成');
    } catch {
      createMessage.error('提交失败');
    }
  }
  const [registerTable, { reload, getDataSource }] = useTable({
    columns: linkScriptColumns,
    dataSource: data,
    showIndexColumn: true,
    pagination: true,
  });

  function handleAdd(e) {
    console.log(e);

    const dataSource = getDataSource();
    const addRow: EditRecordRow = {
      id: e,
      name: optionsRef.value.map((i) => {
        if (e == parseInt(i.value)) return i.label;
      }),
      price: 0,
      originalPrice: 0,
      key: `${Date.now()}`,
    };
    dataSource.push(addRow);
  }
</script>
