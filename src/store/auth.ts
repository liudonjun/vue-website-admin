import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loadDataFromStorage, saveDataToStorage } from '@/utils/util'
import { fetchLogin, fetchUserInfo } from '@/api/user'
import type { LoginDto } from '@/types/loginDto'
import { useUserStore } from './user'
import { useRouter } from 'vue-router'
import { useMessage, useLoadingBar } from 'naive-ui'
import { HttpStatus } from '@/types/httpStatus'

const TOKEN = 'token'

export const useAuthStore = defineStore('authStore', () => {
  const token = ref(loadDataFromStorage(TOKEN) || '')

  const hasLogin = computed(() => !!token.value)

  const store = useUserStore()

  const router = useRouter()

  const message = useMessage();

  const loadingBar = useLoadingBar() 

  const login = async (params: LoginDto) => {
    loadingBar.start()
    const res = await fetchLogin(params)
    if (res.data.code == HttpStatus.OK) {
      token.value = res.data.data?.access_token
      saveDataToStorage(TOKEN, res.data.data?.access_token)
      if (!!token.value) {
        const { data: userInfo } = await fetchUserInfo()
        store.setUserInfo(userInfo.data)
        router.push('/')
        message.success('登录成功')
      }
      loadingBar.finish()
    } else {
      message.error(res.data.message)
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
