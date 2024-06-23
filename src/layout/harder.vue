<script lang="ts" setup>
import { NIcon } from 'naive-ui'
import { MenuSharp, ExitOutline } from '@vicons/ionicons5'
import { useLayoutStore } from '../store/layout'
import { useAuthStore } from '../store/auth'
import { storeToRefs } from 'pinia';

const layoutStore = useLayoutStore()

const { isMobile, checkedRouteName } = storeToRefs(layoutStore)

const authStore = useAuthStore()


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

      <n-icon class="logout" size="30" @click="authStore.logout">
        <ExitOutline />
      </n-icon>
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