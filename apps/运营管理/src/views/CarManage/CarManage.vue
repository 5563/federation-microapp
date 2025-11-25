<template>
  <div>
    <el-card shadow="never">
      <el-row>
        <el-col :span="12">
          <el-button type="primary">新增按钮 </el-button>
          <el-button type="primary">删除按钮</el-button>
          <el-button type="primary">修改按钮</el-button>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="请输入内容" />
        </el-col>
        <el-col :span="12">
          <el-select placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-row>
    </el-card>
    <el-button @click="toDetail"> 我是跳转详情 </el-button>
    <el-button @click="counterStore.increment"> {{ counterStore.count }} </el-button>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
const counterStore = useCounterStore()
const router = useRouter()
const toDetail = () => {
  router.push('/carmanage/cardetail')
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
