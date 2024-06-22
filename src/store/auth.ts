import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loadDataFromStorage, saveDataToStorage } from '../utils/util'
import { fetchLogin, fetchUserInfo } from '../api/user'
import type { LoginDto } from '../types/loginDto'
import { useUserStore } from './user'
import { useRouter } from 'vue-router'

const TOKEN = 'token'

export const useAuthStore = defineStore('authStore', () => {
  const token = ref(loadDataFromStorage('TOKEN') || '')

  const hasLogin = computed(() => !!token.value)

  const store = useUserStore()

  const router = useRouter()

  const login = async (params: LoginDto) => {
    const res = await fetchLogin(params)
    token.value = res.data.access_token
    saveDataToStorage(TOKEN, res.data.access_token)
    if (!!token.value) {
      const userInfo = await fetchUserInfo()
      store.setUserInfo(userInfo.data)
      router.push('/')
    }
  }

  const logout = () => {
    token.value = ''
    saveDataToStorage(TOKEN, '')
    router.push('/login')
  }

  return {
    login,
    logout,
    token,
    hasLogin
  }
})
