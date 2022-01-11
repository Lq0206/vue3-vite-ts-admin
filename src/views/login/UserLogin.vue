<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2021-12-30 15:07:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-11 15:31:15
-->
<template>
  <div class="login">
    <div class="login-form">
      <ElForm ref="formRef" :model="formValue" :rules="rules">
        <ElFormItem label="姓名" prop="username">
          <ElInput
            v-model="formValue.username"
            placeholder="输入用户名：admin"
          />
        </ElFormItem>
        <ElFormItem label="密码" prop="password">
          <ElInput
            v-model="formValue.password"
            type="password"
            placeholder="输入密码：admin"
            show-password
          />
        </ElFormItem>
        <ElFormItem>
          <ElButton
            type="primary"
            size="large"
            block
            :loading="loading"
            @click="handleSubmit"
            >登 录</ElButton
          >
        </ElFormItem>
      </ElForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useUserStore } from "@/store/modules/user";
import router from "@/router";
const formValue = reactive({
  username: "admin",
  password: "admin",
});
const formRef = ref();
const loading = ref(false);
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
  .login-form {
    width: 400px;
    border: 1px solid #d9d9d9;
    padding: 20px;
  }
}
</style>
