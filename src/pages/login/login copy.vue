<template>
  <div class="login-container enter-x">
    <n-icon size="40">
      <game-controller-outline />
    </n-icon>
    <n-form :model="form" :rules="rules" ref="loginForm">
      <n-form-item label="用户名" path="email">
        <n-input v-model:value="form.email" placeholder="请输入用户名" autocomplete="username"></n-input>
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input type="password" v-model:value="form.password" placeholder="请输入密码"
          current-password="current-password"></n-input>
      </n-form-item>
      <n-form-item>
        <n-button type="primary" @click="handleSubmit">登录</n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { GameControllerOutline } from '@vicons/ionicons5';
import { ref } from 'vue';
import { NForm, NFormItem, NInput, NButton, NIcon, useMessage, FormRules } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../../store/auth';

const message = useMessage();
const loginForm = ref<InstanceType<typeof NForm>>();

const form = ref({
  email: '',
  password: ''
});

const store = useAuthStore();
const { token } = storeToRefs(store);

console.log('token', token);

const rules: FormRules = {
  email: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

function handleSubmit(e: MouseEvent) {
  e.preventDefault();
  loginForm.value?.validate((errors) => {
    console.log('validate', errors);
    if (!errors) {
      message.success('登录成功');
      // 执行你的登录逻辑
      const params = {
        email: form.value.email,
        password: form.value.password
      };
      store.login(params);
    } else {
      message.error('请填写完整的表单');
    }
  });
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
</style>
