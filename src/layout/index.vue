<template>
  <div class="layout">
    <div class="content">
      <n-layout has-sider style="height: 100%;">
        <Slide />
        <n-layout class="enter-x">
          <Harder />
          <RouterView></RouterView>
        </n-layout>
      </n-layout>
    </div>
    <DrawerMenu />
  </div>
</template>

<script setup lang="ts">
import { NLayout } from 'naive-ui'
import Slide from './slide.vue'
import DrawerMenu from './drawerMenu.vue'
import Harder from './harder.vue'

</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .harder-box {
    height: 65px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, .08);

    i {
      cursor: pointer;
      margin-left: 20px;
    }
  }

  .n-layout-sider {
    display: flex;
    flex-direction: column;
    justify-content: space-between
  }

  .slide-box {
    display: none;
  }

  .content {
    height: 100%;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
      n-layout-sider {
        display: none;
      }

      .slide-box {
        display: block;
        width: 100%;
        // background-color: #f0f0f0;
        height: 50px;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
        display: flex;
        padding: 0 20px;
        border-bottom: 1px solid #ccc;
      }

      .slide-box::after {
        content: '☰';
        font-size: 24px;
      }
    }
  }

  .enter-x {
    animation: enter-x 0.5s ease-in-out forwards;
  }

  @keyframes enter-x {
    from {
      transform: translateX(-50%);
      opacity: 0;
    }

    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
}
</style>
