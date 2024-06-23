<script lang="ts" setup>
import { MenuOption, NIcon, NDrawer, NMenu, NButton } from 'naive-ui';
import { ref, h, Component } from 'vue';
import { HomeOutline as HomeIcon } from '@vicons/ionicons5'
import { useThemeStore } from '../store/theme';
import { useLayoutStore } from '../store/layout';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const layoutStore = useLayoutStore()
const { hasDrawer, checkedRouteName } = storeToRefs(layoutStore)

const collapsed = ref(false)

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

const themeStore = useThemeStore()

</script>
<template>
  <n-drawer v-model:show="hasDrawer" placement="left" :width="240" :mask-closable="true">
    <n-menu v-model:value="checkedRouteName" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22"
      :options="menuOptions" @update:value="handleUpdateValue" />
    <NButton @click="themeStore.togger">切换主题</NButton>
  </n-drawer>
</template>
