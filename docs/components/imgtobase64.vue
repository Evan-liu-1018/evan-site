<template>
  <Upload accept="image/*" draggable :show-file-list="false" @change="handleChange"></Upload>
  <Textarea class="mt-20" :model-value="src" v-if="src" :auto-size="true" style="max-height: 400px;overflow-y: auto"/>
  <Button class="mt-20" @click="handleCopy" v-if="src" type="primary">点击复制base64内容</Button>
  <img v-if="src" :src="src" alt="">
</template>

<script setup lang="ts">
import {ref} from "vue";
import {img2Base64} from "../utils";
import {useClipboard} from "@vueuse/core";
import {Message, Upload, Button, Textarea} from "@arco-design/web-vue";
import type {FileItem} from "@arco-design/web-vue"

const file = ref();
const src = ref('')

async function handleChange(list: FileItem[]) {
  const file = list[0].file;
  if (file) {
    src.value = await img2Base64(file)
  }
}

async function handleCopy() {
  if (!isSupported.value) {
    Message.warning("当前浏览器不支持复制操作")
    return;
  }
  await copy(src.value);
  Message.success("复制成功")
}

const {copy, isSupported} = useClipboard();
</script>
<style scoped>
img {
  margin-top: 60px;
  object-fit: contain;
}

.mt-20 {
  margin-top: 20px;
}
</style>
  