import { useResize } from '@/hooks/useResize'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayoutStore = defineStore('layoutStore', () => {

  // 是否是移动端
  const isMobile = ref(window.innerWidth <= 768)

  // 抽屉菜单状态
  const hasDrawer = ref(false)

  // 切换抽屉状态
  const toggleDrawer = () => {
    hasDrawer.value = !hasDrawer.value
  }

  // 当前路由名称
  const checkedRouteName = ref('Dashboard')

  useResize(() => {
    isMobile.value = window.innerWidth <= 768
  })

  return {
    isMobile,
    hasDrawer,
    toggleDrawer,
    checkedRouteName,
  }
})
