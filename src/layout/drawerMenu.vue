<script lang="ts" setup>
import { MenuOption, NIcon, NDrawer, NMenu } from 'naive-ui';
import { ref, h, Component } from 'vue';
import { HomeOutline as HomeIcon } from '@vicons/ionicons5'
import { useThemeStore } from '@/store/theme';
import { useLayoutStore } from '@/store/layout';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import SvgIcon from '@/components/base/SvgIcon.vue';

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
      <SvgIcon class="sw-box" icon="LightModeFilled" @click="themeStore.togger()" style="width: 30px;height: 30px;margin: 0 auto;" />
  </n-drawer>
</template>

<style lang="scss" scoped>
::v-deep(.n-drawer-container) {
  display: flex;
  flex-direction: column;
  background: red;

  .n-menu {
    flex: 1;
  }

  .sw-box {
    padding: 20px 0;
  }
}
</style>