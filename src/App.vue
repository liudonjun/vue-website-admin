<script setup lang="ts">
import { NMessageProvider, NConfigProvider, NLoadingBarProvider } from 'naive-ui';
import { useThemeStore } from './store/theme';
import { storeToRefs } from 'pinia';

const themeStore = useThemeStore()

const { themeClass } = storeToRefs(themeStore)
</script>

<template>
  <n-config-provider :theme="themeStore.checkedTheme" :class="themeClass">
    <n-loading-bar-provider>
      <n-message-provider>
        <RouterView></RouterView>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
