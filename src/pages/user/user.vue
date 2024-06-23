<template>
  <n-layout style="height: 100vh;">
    <n-layout-content>
      <n-space vertical size="large" style="padding: 24px;">
        <!-- 筛选项 -->
        <n-card bordered>
          <n-space>
            <n-input v-model:value="filters.name" placeholder="用户名" clearable style="width: 200px;" />
            <n-select v-model:value="filters.status" :options="statusOptions" placeholder="用户状态" clearable
              style="width: 200px;" />
            <n-button @click="handleFilter">筛选</n-button>
            <n-button @click="handleResetFilters">重置</n-button>
          </n-space>
        </n-card>
        <!-- 用户列表表格 -->
        <n-card bordered>
          <n-table :columns="columns" :data="filteredUsers" :pagination="pagination">
            <template #action="{ row }">
              <n-button type="primary" size="small" @click="handleEdit(row)">编辑</n-button>
              <n-button type="error" size="small" @click="handleDelete(row)">删除</n-button>
            </template>
          </n-table>
        </n-card>
      </n-space>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NLayout, NLayoutContent, NSpace, NCard, NInput, NSelect, NButton, NTable } from 'naive-ui'

const filters = ref({
  name: '',
  status: null
})

const statusOptions = [
  { label: '活跃', value: 'active' },
  { label: '禁用', value: 'disabled' }
]

const users = ref([
  { id: 1, name: '用户1', status: 'active' },
  { id: 2, name: '用户2', status: 'disabled' },
  { id: 3, name: '用户3', status: 'active' },
  // 添加更多用户数据...
])

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesName = filters.value.name === '' || user.name.includes(filters.value.name)
    const matchesStatus = filters.value.status === null || user.status === filters.value.status
    return matchesName && matchesStatus
  })
})

const columns = [
  { title: 'ID', key: 'id' },
  { title: '用户名', key: 'name' },
  { title: '状态', key: 'status' },
  { title: '操作', key: 'action', render: 'action' }
]

const pagination = {
  pageSize: 10,
  pageCount: Math.ceil(users.value.length / 10)
}

const handleFilter = () => {
  // 过滤逻辑已经在 computed 中处理
}

const handleResetFilters = () => {
  filters.value.name = ''
  filters.value.status = null
}

const handleEdit = (row: any) => {
  alert(`编辑用户：${row.name}`)
}

const handleDelete = (row: any) => {
  alert(`删除用户：${row.name}`)
}
</script>

<style scoped>
.header-content {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 24px;
  font-size: 20px;
}
</style>
