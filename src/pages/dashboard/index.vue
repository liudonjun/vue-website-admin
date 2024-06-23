<script lang="ts" setup>
import { NButton } from 'naive-ui'
import { useAuthStore } from '../../store/auth'
import { storeToRefs } from 'pinia';
import { useUserStore } from '../../store/user';
import { useThemeStore } from '../../store/theme';
const authStore = useAuthStore()
const userStore = useUserStore()
const themeStore = useThemeStore()
const { userInfo } = storeToRefs(userStore)
const logoutClick = () => {
  authStore.logout()
}
</script>

<template>
  <div class="grid-demo">
    <div style="color: var(--primary-color);">{{ userInfo }}</div>
    <n-button @click="themeStore.togger">切换主题</n-button>
    <n-button @click="logoutClick">退出登录</n-button>
  </div>
</template>
