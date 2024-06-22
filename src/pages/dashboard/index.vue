<script lang="ts" setup>
import { NButton } from 'naive-ui'
import { useAuthStore } from '../../store/auth'
const store = useAuthStore()
const logoutClick = () => {
  store.logout()
}
</script>

<template>
  <div class="grid-demo">
    dashboard
    <n-button @click="logoutClick">退出登录</n-button>
  </div>
</template>
