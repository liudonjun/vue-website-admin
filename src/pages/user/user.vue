<template>
  <n-layout style="height: 100vh;">
    <n-layout-content>
      <n-space vertical size="large" style="padding: 24px;">
        <!-- 筛选项 -->
        <n-card bordered>
          <n-space>
            <n-input v-model:value="filters.username" placeholder="用户名" clearable style="width: 200px;" />
            <n-button @click="getTableData">筛选</n-button>
            <n-button @click="handleResetFilters">重置</n-button>
            <n-button type="primary" @click="showFormDrawer(true)">创建</n-button>
          </n-space>
        </n-card>
        <!-- 用户列表表格 -->
        <n-card bordered>
          <n-data-table :columns="columns" :data="tableData" />
          <n-pagination style="margin-top: 20px;"
            @update:page="(currentPage) => handleCurrentPage(currentPage, getTableData)"
            @update:page-size="(pageSize) => handlePageSize(pageSize, getTableData)" v-model:page="currentPage"
            v-model:page-size="pageSize" :page-count="_total" show-size-picker :page-sizes="[10, 20, 30, 40]" />
        </n-card>
      </n-space>
    </n-layout-content>

    <n-drawer v-model:show="visable" :width="502" placement="right">
      <n-drawer-content :title="drawerTitle">
        <n-form ref="formRef" :label-width="80" :model="ruleForm" :rules="rules">
          <n-form-item label="用户名" path="username">
            <n-input v-model:value="ruleForm.username" placeholder="输入用户名" />
          </n-form-item>
          <n-form-item label="邮箱" path="email">
            <n-input :disabled="!hasAdd" v-model:value="ruleForm.email" placeholder="输入邮箱" />
          </n-form-item>
          <n-form-item v-if="hasAdd" label="密码" path="password">
            <n-input v-model:value="ruleForm.password" placeholder="输入密码" />
          </n-form-item>
          <n-form-item>
            <n-button attr-type="button" @click="onSubmit">
              提交
            </n-button>
          </n-form-item>
        </n-form>
      </n-drawer-content>
    </n-drawer>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, h, computed } from 'vue'
import { NLayout, NDrawer, NDrawerContent, NForm, NFormItem, NLayoutContent, NSpace, NCard, NInput, NPagination, NButton, NDataTable, FormInst, useMessage, useDialog } from 'naive-ui'
import { fetchCreateUser, fetchDeleteUser, fetchUpdateUser, fetchUserList } from '@/api/user'
import usePagination from '@/hooks/usePagination'
import { UserDto } from '@/types/userDto';
import { HttpStatus } from '@/types/httpStatus';
import SvgIcon from '@/components/base/SvgIcon.vue';

const filters = ref({
  username: undefined
})

const {
  currentPage,
  pageSize,
  total,
  setTotal,
  handlePageSize,
  handleCurrentPage
} = usePagination(1, 10)

onMounted(() => {
  getTableData()
})

const ruleForm = ref<RuleFormData>({
  id: undefined,
  username: undefined,
  email: undefined,
  password: undefined,
})

interface RuleFormData {
  id: undefined | string
  username: undefined | string
  email: undefined | string
  password: undefined | string
}

const rules = ref({
  username: {
    required: true,
    message: '请输入姓名',
    trigger: 'blur'
  },
  email: {
    required: true,
    message: '请输入邮箱',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: 'blur'
  },
})

// 默认新增用户
const hasAdd = ref(true)

const drawerTitle = computed(() => {
  return hasAdd.value ? '新增' : '编辑'
})

const showFormDrawer = (type: boolean, row?: UserDto) => {
  if (!type) {
    const target = JSON.parse(JSON.stringify(row))
    ruleForm.value = target
  }
  hasAdd.value = type
  visable.value = true
}

const createUser = async () => {
  const params = {
    username: ruleForm.value.username,
    email: ruleForm.value.email,
    password: ruleForm.value.password
  }
  const { data: response } = await fetchCreateUser(params)
  if (response.code == HttpStatus.OK) {
    message.success('User updated successfully')
    visable.value = false
    getTableData()
  }
}

const updaetUser = async () => {
  const params = {
    username: ruleForm.value.username,
    email: ruleForm.value.email,
  }
  const { data: response } = await fetchUpdateUser(ruleForm.value.id, params)
  if (response.code == HttpStatus.OK) {
    message.success('User updated successfully')
    visable.value = false
    getTableData()
  }
}

const dialog = useDialog()

const deleteUser = async (row: any) => {
  const { data: response } = await fetchDeleteUser(row.id)
  if (response.code == HttpStatus.OK) {
    message.success('User delete successfully')
    visable.value = false
    getTableData()
  }
}

const showDelDialog = (row: UserDto) => {
  dialog.warning({
    title: '警告',
    content: '你确定要删除这名用户吗？孩子?',
    positiveText: '确定',
    negativeText: '不确定',
    onPositiveClick: () => {
      deleteUser(row)
    },
  })
}


const formRef = ref<FormInst | null>(null)

const message = useMessage()

// 提交表单
const onSubmit = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      if (hasAdd.value) {
        createUser()
      } else {
        updaetUser()
      }
    }
  })
}

const visable = ref(false)

const _total = computed(() => {
  return total.value / pageSize.value
})

const tableData = ref() || []

const getTableData = async () => {
  const params = {
    pageIndex: currentPage.value,
    pageSize: pageSize.value,
    username: filters.value.username
  }
  const { data: response } = await fetchUserList(params)
  tableData.value = response.data?.result

  setTotal(response.data?.total || 0)
}


const columns = [
  // { title: 'ID', key: 'id' },
  { title: '用户名', key: 'username' },
  { title: '邮箱', key: 'email' },
  { title: '创建时间', key: 'created_at' },
  { title: '更新时间', key: 'updated_at' },
  {
    title: '操作', key: 'action', render(row: UserDto) {
      return h(
        'div',
        [
          h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: 'small',
              type: 'primary',
              renderIcon: () =>
                h(SvgIcon, {
                  icon: 'edit', // 将'icon'属性作为props传递
                  style: 'width: 20px; height: 20px' // 也可以在这里直接设置样式
                })
              ,
              onClick: () => showFormDrawer(false, row),
              style: { marginRight: '8px' } // 调整按钮之间的间距
            },
            '编辑'
          ),
          h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: 'small',
              type: 'error',
              renderIcon: () =>
                h(SvgIcon, {
                  icon: 'deleteTowOne', // 将'icon'属性作为props传递
                  style: 'width: 20px; height: 20px' // 也可以在这里直接设置样式
                })
              ,
              onClick: () => showDelDialog(row)
            },
            '删除'
          )
        ]
      );
    }
  }
]

const handleResetFilters = () => {
  filters.value.username = undefined
  getTableData()
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
