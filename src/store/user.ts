import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loadDataFromStorage, saveDataToStorage } from '../utils/util'

const USER_INFO_KEY = 'userInfo'

export const useUserStore = defineStore('userStore', () => {
  const userInfo = ref(loadDataFromStorage(USER_INFO_KEY) || {})

  const setUserInfo = (value: any) => {
    userInfo.value = value
    saveDataToStorage(USER_INFO_KEY, value)
  }

  return {
    userInfo,
    setUserInfo
  }
})
