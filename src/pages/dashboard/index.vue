<template>
  <n-layout style="height: 100vh;">
    <n-layout-content>
      <n-space vertical size="large" style="padding: 24px;">
        <n-row>
          <n-col span="6">
            <n-card bordered>
              <div class="stat-card">
                <div class="stat-title">总用户数</div>
                <div class="stat-value">1,234</div>
              </div>
            </n-card>
          </n-col>
          <n-col span="6">
            <n-card bordered>
              <div class="stat-card">
                <div class="stat-title">日活跃用户</div>
                <div class="stat-value">567</div>
              </div>
            </n-card>
          </n-col>
          <n-col span="6">
            <n-card bordered>
              <div class="stat-card">
                <div class="stat-title">新注册用户</div>
                <div class="stat-value">89</div>
              </div>
            </n-card>
          </n-col>
          <n-col span="6">
            <n-card bordered>
              <div class="stat-card">
                <div class="stat-title">收入</div>
                <div class="stat-value">￥12,345</div>
              </div>
            </n-card>
          </n-col>
        </n-row>
        <n-row>
          <n-col span="16">
            <n-card title="用户增长趋势" bordered>
              <!-- 这里可以放置图表，例如 ECharts 图表 -->
              <div class="chart-placeholder">图表组件</div>
            </n-card>
          </n-col>
          <n-col span="8">
            <n-card title="最新用户" bordered>
              <!-- 这里可以放置表格或列表 -->
              <n-list>
                <n-list-item>用户1</n-list-item>
                <n-list-item>用户2</n-list-item>
                <n-list-item>用户3</n-list-item>
              </n-list>
            </n-card>
          </n-col>
        </n-row>
      </n-space>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { NLayout, NLayoutContent, NRow, NCol, NCard, NSpace, NList, NListItem } from 'naive-ui'

// 可以在这里引入 ECharts 等图表库并进行相关配置
</script>

<style scoped>
.header-content {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 24px;
  font-size: 20px;
}

.stat-card {
  text-align: center;
}

.stat-title {
  font-size: 16px;
  color: #888;
}

.stat-value {
  font-size: 24px;
  margin-top: 8px;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border: 1px dashed #d9d9d9;
}
</style>
