<script setup lang="ts">
import { NMessageProvider, NDialogProvider, NNotificationProvider, NConfigProvider, NLoadingBarProvider } from 'naive-ui';
import { useThemeStore } from './store/theme';
import { storeToRefs } from 'pinia';

const themeStore = useThemeStore()

const { themeClass } = storeToRefs(themeStore)
</script>

<template>
  <n-config-provider :theme="themeStore.checkedTheme" :class="themeClass">
    <n-notification-provider>
      <n-loading-bar-provider>
        <n-message-provider>
          <n-dialog-provider>
            <RouterView></RouterView>
          </n-dialog-provider>
        </n-message-provider>
      </n-loading-bar-provider>
    </n-notification-provider>
  </n-config-provider>
</template>
