<template>
  <Alert>一共为杨乖乖检索到文本总数为{{ count }}</Alert>
  <Upload class="mt-20" accept=".xls,.xlsx" draggable :show-file-list="false" @change="handleChange"></Upload>
  <Form class="mt-20">
    <FormItem label="搜索内容">
      <Input placeholder="请输入搜索内容" v-model="searchText"></Input>
    </FormItem>
    <FormItem label="sheet页数">
      <InputNumber placeholder="请输入需要展示的sheet页数" v-model="sheetNumber"></InputNumber>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSearch"> 确认检索</Button>
    </FormItem>
  </Form>

  <Spin v-if="loading"></Spin>
  <div ref="table" v-else v-html="TableHtml"></div>
</template>

<script setup lang="ts">
import {ref, Ref, watch} from "vue";
import {Upload, Input, InputNumber, Form, FormItem, Message, Spin, Button, Alert} from "@arco-design/web-vue";
import type {FileItem} from "@arco-design/web-vue"
import {excelToHtml,countOccurrences} from "../utils";

const file = ref();
const searchText = ref('')
const sheetNumber = ref(1);
const TableHtml = ref("");
const currentFile: Ref<File> = ref();
const loading = ref(false);
const table: Ref<HTMLElement> = ref();
const count = ref(0);

async function handleChange(list: FileItem[]) {
  const file = list[0].file;
  if (file) {
    currentFile.value = file;
    renderTableData();
  }
}

async function renderTableData() {
  loading.value = true
  try {
    TableHtml.value = await excelToHtml(currentFile.value, sheetNumber.value - 1);
  } catch (err) {
    Message.warning("文件解析出现错误")
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  count.value = countOccurrences(table.value.innerText, searchText.value);
}

watch(sheetNumber, renderTableData);
</script>
<style scoped>
.mt-20 {
  margin-top: 20px;
}
</style>
