<script setup lang="ts">
import { MenuOption, NIcon, NLayoutSider, NMenu } from 'naive-ui';
import { Component, h, ref } from 'vue';
import { HomeOutline as HomeIcon } from '@vicons/ionicons5'
import { useThemeStore } from '@/store/theme';
import { useLayoutStore } from '@/store/layout';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import SvgIcon from '@/components/base/SvgIcon.vue';

const collapsed = ref(false)

const layoutStore = useLayoutStore()

const { isMobile, checkedRouteName } = storeToRefs(layoutStore)

const themeStore = useThemeStore()

const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const renderSvgIcon = (icon: string) => {
  return () => h(SvgIcon, {
    icon: icon, // 将'icon'属性作为props传递
    style: 'width: 20px; height: 20px' // 也可以在这里直接设置样式
  })
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
    icon: renderSvgIcon('UserFriends')
  },
  {
    label: '角色管理',
    key: 'Role',
    icon: renderSvgIcon('AdminPanelSettingsFilled')
  },
]

const router = useRouter()

const handleUpdateValue = (key: string, _: MenuOption) => {
  router.push({
    name: key
  })
}

</script>
<!-- DarkModeRound DarkTheme24Filled -->
<template>
  <n-layout-sider class="enter-x" v-if="!isMobile" bordered collapse-mode="width" :collapsed-width="64" :width="180"
    :collapsed="collapsed" show-trigger @collapse="collapsed = true" @expand="collapsed = false">
    <div style="height: 40px;text-align: center;line-height: 40px">logo</div>
    <n-menu content-class="slide-box" style="height: 100%;" v-model:value="checkedRouteName" :collapsed="collapsed"
      :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" @update:value="handleUpdateValue" />
    <SvgIcon class="sw-box" icon="LightModeFilled" @click="themeStore.togger()"
      style="width: 30px;height: 30px;margin: 0 auto;" />
  </n-layout-sider>
</template>

<style lang="scss" scoped>
::v-deep(.n-layout-sider-scroll-container) {
  display: flex;
  flex-direction: column;

  .n-menu {
    flex: 1;
  }

  .sw-box {
    padding: 20px 0;
  }
}
</style>
