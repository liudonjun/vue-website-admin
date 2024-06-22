<template>
  <div class="login-container">
    <n-form :model="form" :rules="rules" ref="loginForm">
      <n-icon size="40">
        <game-controller-outline />
      </n-icon>
      <n-form-item label="用户名" prop="username">
        <n-input v-model="form.username" placeholder="请输入用户名"></n-input>
      </n-form-item>
      <n-form-item label="密码" prop="password">
        <n-input type="password" v-model="form.password" placeholder="请输入密码"></n-input>
      </n-form-item>
      <n-form-item>
        <n-button type="primary" @click="handleSubmit">登录</n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { GameControllerOutline, } from '@vicons/ionicons5'
import { ref } from 'vue';
import { NForm, NFormItem, NInput, NButton, NIcon } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../../store/auth';

const form = ref({
  username: '',
  password: ''
});

const store = useAuthStore()

const { token } = storeToRefs(store)

console.log('token', token);


const rules = ref({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
});

function handleSubmit() {

  const params = {
    "email": "3170495286@qq.com",
    "password": "asd711029"
  }
  store.login(params)
  // const { value, validate } = $refs.loginForm;
  // validate().then(valid => {
  //   if (valid) {
  //     // 这里可以提交登录逻辑，例如发送请求给后端验证
  //     console.log('登录成功！提交的表单数据:', value);
  //   } else {
  //     console.error('表单验证失败！');
  //   }
  // });
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
