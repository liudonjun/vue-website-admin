<script setup lang="ts">
import { MenuOption, NIcon, NSwitch, NLayoutSider, NMenu } from 'naive-ui';
import { Component, h, ref } from 'vue';
import { HomeOutline as HomeIcon } from '@vicons/ionicons5'
import { useThemeStore } from '../store/theme';
import { useLayoutStore } from '../store/layout';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';


const collapsed = ref(false)

const layoutStore = useLayoutStore()

const { isMobile, checkedRouteName } = storeToRefs(layoutStore)

const themeStore = useThemeStore()

const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: '仪表盘',
    key: 'Dashboard',
    icon: renderIcon(HomeIcon)
  },
  {
    label: '用户管理',
    key: 'User',
    icon: renderIcon(HomeIcon)
  },
  {
    label: '角色管理',
    key: 'Role',
    icon: renderIcon(HomeIcon)
  },
]

const router = useRouter()

const handleUpdateValue = (key: string, _: MenuOption) => {
  router.push({
    name: key
  })
}

</script>

<template>
  <n-layout-sider class="enter-x" v-if="!isMobile" bordered collapse-mode="width" :collapsed-width="64" :width="240"
    :collapsed="collapsed" show-trigger @collapse="collapsed = true" @expand="collapsed = false">
    <n-menu v-model:value="checkedRouteName" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22"
      :options="menuOptions" @update:value="handleUpdateValue" />
    <!-- <NButton @click="themeStore.togger">切换主题</NButton> -->
    <n-switch @click="themeStore.togger">
      <template #checked>
        暗黑模式
      </template>
      <template #unchecked>
        白天模式
      </template>
    </n-switch>
  </n-layout-sider>
</template>
