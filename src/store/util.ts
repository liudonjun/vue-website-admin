import { defineStore } from 'pinia'
import { useLoadingBar } from 'naive-ui'

export const useUtilsStore = defineStore('utilsStore', () => {

  const loadingBar = useLoadingBar()

  const startLoadingBar = () => {
    loadingBar.start()
  }

  const endLoadingBar = () => {
    loadingBar.finish()
  }
  return {
    startLoadingBar,
    endLoadingBar
  }
})
