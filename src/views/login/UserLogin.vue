<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2021-12-30 15:07:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-18 09:13:17
-->
<template>
  <div class="login">
    <div class="login-content">
      <div class="logo">LOGO</div>
      <ThemeSwitch></ThemeSwitch>
      <div class="login-img">
        <img src="@/assets/login_form_img.svg" alt="" />
      </div>
      <div class="login-form">
        <h3 class="login-title">Login</h3>
        <p class="login-desc">Welcome to the system</p>
        <ElForm ref="formRef" :model="formValue" :rules="rules" size="large">
          <ElFormItem prop="username">
            <ElInput
              v-model="formValue.username"
              placeholder="输入用户名：admin"
              :prefix-icon="User"
            />
          </ElFormItem>
          <ElFormItem prop="password">
            <ElInput
              v-model="formValue.password"
              type="password"
              placeholder="输入密码：admin"
              show-password
              :prefix-icon="Lock"
            />
          </ElFormItem>
          <ElFormItem>
            <el-checkbox
              v-model="remember"
              label="remember password"
              size="large"
            ></el-checkbox>
          </ElFormItem>
          <ElFormItem>
            <CButton
              class="login-submit"
              :loading="loading"
              @click="handleSubmit"
              >Login In</CButton
            >
          </ElFormItem>
        </ElForm>
        <div class="reg-tips">
          <span>Account not created yet? </span>
          <router-link to="/">Sign Up</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useUserStore } from "@/store/modules/user";
import { User, Lock } from "@element-plus/icons-vue";
import CButton from "@/components/Button/CButton.vue";
import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch.vue";
import router from "@/router";
const formValue = reactive({
  username: "admin",
  password: "admin",
});
const formRef = ref();
const loading = ref(false);
const remember = ref(true);
const rules = ref({
  username: {
    required: true,
    message: "请输入用户名",
    trigger: "blur",
  },
  password: {
    required: true,
    message: "请输入密码",
    trigger: "blur",
  },
});

// actions
const userStore = useUserStore();

interface formState {
  username: string;
  password: string;
}

const handleSubmit = (e: any) => {
  e.preventDefault();
  loading.value = true;
  formRef.value.validate(async (valid: any) => {
    if (valid) {
      const { username, password } = formValue;
      const params: formState = {
        username,
        password,
      };
      const res = await userStore.login(params);
      if (res.code === 200) {
        router.push({ path: "/" });
        loading.value = false;
      }
    }
  });
};
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: var(--login-bg-color);
  background-image: var(--login-bg-image);
  transition: all 0.28s cubic-bezier(0.79, 0.14, 0.15, 0.86);
  .login-content {
    display: flex;
    position: relative;
    height: 600px;
    justify-content: center;
    align-items: center;
    padding: 60px;
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: var(--login-form-bg-color);
    border-radius: 12px;
    border: var(--login-form-border);
    box-shadow: 0.2px 1px 1.1px hsl(var(--shadow-color) / 0.34),
      1.1px 5.8px 6.6px -0.4px hsl(var(--shadow-color) / 0.34),
      2px 10.9px 12.5px -0.7px hsl(var(--shadow-color) / 0.34),
      3.4px 17.9px 20.5px -1.1px hsl(var(--shadow-color) / 0.34),
      5.4px 28.6px 32.7px -1.4px hsl(var(--shadow-color) / 0.34),
      8.4px 44.7px 51.2px -1.8px hsl(var(--shadow-color) / 0.34),
      12.7px 67.9px 77.7px -2.1px hsl(var(--shadow-color) / 0.34),
      18.8px 100px 114.5px -2.5px hsl(var(--shadow-color) / 0.34);
    transition: all border 0.28s cubic-bezier(0.79, 0.14, 0.15, 0.86);
    .logo {
      position: absolute;
      left: 40px;
      top: 20px;
      font-weight: 600;
      font-size: 36px;
      color: #50e3c2;
    }

    .login-img {
      width: 600px;
      min-width: 600px;
      margin-right: 60px;
      img {
        display: block;
        width: 100%;
      }
    }
    .login-form {
      width: 400px;
      padding: 20px;
      .login-title {
        padding: 0 0 8px 0;
        font-size: 32px;
        color: var(--font-color);
      }
      .login-desc {
        color: #8c8c8c;
        font-size: 14px;
        padding-bottom: 24px;
      }
      .login-submit {
        display: block;
        width: 100%;
        outline: 0;
        cursor: pointer;
        border: none;
        padding: 0 56px;
        height: 45px;
        line-height: 45px;
        border-radius: 7px;
        background-color: #0070f3;
        color: white;
        font-weight: 400;
        font-size: 16px;
        box-shadow: 0 4px 14px 0 rgb(0 118 255 / 39%);
        transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
        animation: btnWidth 0.28s ease-in;
        &:hover {
          background: rgba(0, 118, 255, 0.9);
          box-shadow: 0 6px 20px rgb(0 118 255 / 23%);
        }
        @keyframes btnWidth {
          0% {
            transform: scale(0);
          }
          25% {
            transform: scale(0.25);
          }
          50% {
            transform: scale(0.5);
          }
          75% {
            transform: scale(0.75);
          }
          100% {
            transform: scale(1);
          }
        }
      }
    }
    .reg-tips {
      text-align: center;
      font-size: 14px;
      color: var(--font-color);
      a {
        color: #0070f3;
      }
    }
  }
}
</style>
