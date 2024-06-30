<script lang="ts" setup>
import { NIcon, NDropdown } from 'naive-ui'
import { MenuSharp, ExitOutline } from '@vicons/ionicons5'
import { useLayoutStore } from '@/store/layout'
import { useAuthStore } from '@/store/auth'
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/store/theme';

const layoutStore = useLayoutStore()

const themeStore = useThemeStore()

const { isMobile, checkedRouteName } = storeToRefs(layoutStore)

const authStore = useAuthStore()

const options = [
  {
    label: '退出登录',
    key: "logout"
  },
  {
    label: '修改密码',
    key: 'update',
    disabled: true
  },
  {
    label: '切换主题',
    key: 'theme'
  }
]

const handleSelect = (key: 'logout' | 'update' | 'theme') => {
  const map: { [key: string]: () => void } = {
    logout: () => authStore.logout(),
    // update: () => authStore.update(),
    theme: () => themeStore.togger()
  };

  const action = map[key];
  if (action) {
    return action();
  }
}

</script>
<template>
  <div class="harder-box">
    <div class="item-box">
      <n-icon size="30" v-show="isMobile" @click="layoutStore.toggleDrawer">
        <MenuSharp />
      </n-icon>
      <div style="margin-left: 20px;">
        {{ checkedRouteName }}
      </div>

      <div>
        <!-- <n-avatar round size="small" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" /> -->
        <!-- @click="authStore.logout" -->
        <n-dropdown trigger="click" :options="options" @select="handleSelect">
          <n-icon class="logout" size="30">
            <ExitOutline />
          </n-icon>
        </n-dropdown>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.harder-box {
  position: relative;
  height: 65px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, .08);

  .item-box {
    display: flex;

    justify-content: space-between i {
      cursor: pointer;
      margin-left: 20px;
    }
  }

  .logout {
    position: absolute;
    right: 20px;
    top: 20px;
  }


}
</style>