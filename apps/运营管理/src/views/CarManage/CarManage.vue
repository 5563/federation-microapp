<template>
  <div>
    <el-card shadow="never">
      <h1>1运营管理-2车辆管理</h1>
      我的位置在项目中
      看下我怎么更新11饿
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
const counterStore = useCounterStore()
const router = useRouter()
const toDetail = () => {
  router.push('/business/CarDetail')
}
const options = [
  {
    value: '选项1',
    label: '黄金糕'
  },
  {
    value: '选项2',
    label: '双皮奶'
  },
  {
    value: '选项3',
    label: '蚵仔煎'
  },
  {
    value: '选项4',
    label: '龙须面'
  },
  {
    value: '选项5',
    label: '北京烤鸭'
  }
]
</script>
