<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { NForm, NFormItem, NInput, NButton, useMessage, FormRules, useNotification } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/auth';

const message = useMessage();
const loginForm = ref<InstanceType<typeof NForm>>();

const form = ref({
  email: '',
  password: ''
});

const notification = useNotification()

const initNotification = () => {
  notification.create({
    title: "通知",
    description: '测试账号',
    content: `账号：test@qq.com
密码：123456`,
    // avatar: () =>
    //   h(NAvatar, {
    //     size: 'small',
    //     round: true,
    //     src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
    //   }),
    onAfterLeave: () => {
      // message.success("Wouldn't it be Nice")
    }
  })
}

onMounted(() => {
  initNotification()
})

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

<template>
  <div class="login-page">
    <div class="left-box enter-x">
      <div class="title-box">
        <div>
          Admin
        </div>
      </div>
      <div class="my-auto">
        <img src="@/assets/svg/login-box-bg.svg" alt="">
        <div class="mt-10 font-medium text-white -enter-x">
          <span class="inline-block mt-4 text-3xl"> 开箱即用的中后台管理系统</span>
        </div>
        <div class="mt-5 font-normal text-white dark:text-gray-500 -enter-x">
          输入您的个人详细信息开始使用！
        </div>
      </div>
    </div>
    <div class="right-box enter-y">
      <div class="login-box">
        <h1>登录</h1>
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
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column; // 修改为列方向
  padding: 20px 30px;
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url('@/assets/svg/login-bg.svg');
    background-repeat: no-repeat;
    background-position: 100%;
    background-size: auto 100%;
  }

  @media (min-width: 768px) {
    flex-direction: row; // 屏幕宽度大于768px时，修改为行方向

    &::before {
      margin-left: -48%;
    }
  }

  @media (max-width: 768px) {
    &::before {
      display: none;
    }

    .left-box {
      display: none !important;
    }

    .right-box {
      width: 100%;
    }
  }

  .left-box {
    position: relative;
    width: 100%;
    height: auto;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column; // 列方向

    @media (min-width: 768px) {
      width: 50%;
      height: 100%;
      flex-direction: row; // 屏幕宽度大于768px时，修改为行方向

      .left-box {
        display: none;
      }
    }

    .title-box {
      position: absolute;
      width: 120px;
      justify-content: space-between;
      top: 0;
      left: 0;
      font-size: 25px;
      color: #fff;
      font-weight: bold;
      display: flex;
      align-items: center;
    }

    .my-auto {
      text-align: left;
      margin-right: 300px;

      @media (min-width: 768px) {
        margin-left: 87px;
      }

      img {
        margin-top: -4rem;
        width: 50%;
        min-width: 300px;
      }

      .mt-10 {
        margin-top: 2.5rem;
      }

      .mt-5 {
        margin-top: 1.25rem;
      }

      .text-white {
        color: #fff;
      }

      .text-3xl {
        font-size: 1.875rem;
        line-height: 2.25rem;
      }
    }
  }

  .right-box {
    position: relative;
    width: 100%;
    height: auto;
    margin: 0 auto;
    display: flex;
    align-items: center;

    @media (min-width: 768px) {
      width: 50%;
      height: 100%;
    }

    .login-box {
      width: 100%;
      margin-left: 0;
      padding: 0 20px;
      min-width: 200px;

      @media (min-width: 768px) {
        width: 400px;
        margin-left: 200px;
      }

      button {
        width: 100%;
      }
    }
  }

  .enter-x {
    animation: enter-x 0.5s ease-in-out forwards;
  }

  .enter-y {
    animation: enter-y 0.5s ease-in-out forwards;
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

  @keyframes enter-y {
    from {
      transform: translateX(100%);
      opacity: 0;
    }

    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
}
</style>
