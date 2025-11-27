<template>
  <div class="dashboard">
    {{ counterStore.count }}
    <div>
      vue独立项目
      ss
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCounterStore } from '@/stores/counter'
const counterStore = useCounterStore()
import {
  User,
  Document,
  Setting,
  TrendCharts
} from '@element-plus/icons-vue'

const stats = ref([
  {
    title: '用户总数',
    value: '1,234',
    icon: User,
    color: '#409EFF'
  },
  {
    title: '文章数量',
    value: '567',
    icon: Document,
    color: '#67C23A'
  },
  {
    title: '系统配置',
    value: '89',
    icon: Setting,
    color: '#E6A23C'
  },
  {
    title: '今日访问',
    value: '2,345',
    icon: TrendCharts,
    color: '#F56C6C'
  }
])

const recentActivities = ref([
  {
    time: '2024-01-20 10:30:00',
    user: 'admin',
    action: '登录系统',
    status: '成功'
  },
  {
    time: '2024-01-20 10:25:00',
    user: 'user1',
    action: '修改用户信息',
    status: '成功'
  },
  {
    time: '2024-01-20 10:20:00',
    user: 'user2',
    action: '删除文章',
    status: '成功'
  },
  {
    time: '2024-01-20 10:15:00',
    user: 'user3',
    action: '系统配置修改',
    status: '失败'
  }
])

onMounted(() => {
  // 初始化数据
})
</script>

<style scoped>
.dashboard {
  padding: 0;
}

.stats-cards {
  margin-bottom: 20px;
}

.stat-card {
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 4px;
}

.stat-title {
  font-size: 14px;
  color: #909399;
}

.charts-row {
  margin-bottom: 20px;
}

.chart-card {
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: #303133;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.system-status {
  padding: 20px 0;
}

.status-item {
  margin-bottom: 20px;
}

.status-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #606266;
}

.recent-activity .el-card {
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
