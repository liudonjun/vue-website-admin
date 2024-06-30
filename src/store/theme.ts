import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { loadDataFromStorage, saveDataToStorage } from '@/utils/util'
import { darkTheme } from 'naive-ui'

const THEME_KEY = 'theme'

export const useThemeStore = defineStore('themeStore', () => {
  const theme = ref(loadDataFromStorage(THEME_KEY) || 'light')

  const checkedTheme = computed(() => {
    return theme.value == 'light' ? null : darkTheme
  })

  const themeClass = computed(() => {
    return theme.value == 'light' ? 'light-theme' : 'dark-theme'
  })

  const togger = () => {
    theme.value == 'light' ? setTheme('dark') : setTheme('light')
  }

  const setTheme = (value: any) => {
    theme.value = value
    saveDataToStorage(THEME_KEY, value)
  }

  return {
    theme,
    themeClass,
    checkedTheme,
    setTheme,
    togger
  }
})
