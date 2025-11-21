<template>
  <div>
    <el-card shadow="never">
      <el-row>
        <el-col :span="12">
          <el-button type="primary">新增</el-button>
          <el-button type="primary">删除</el-button>
          <el-button type="primary">修改</el-button>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="请输入内容" />
        </el-col>
      </el-row>
    </el-card>
    <el-button @click="toDetail"> 跳转详情 </el-button>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const toDetail = () => {
  router.push('/carmanage/cardetail')
}
</script>
