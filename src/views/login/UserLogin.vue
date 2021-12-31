<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2021-12-30 15:07:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-31 09:28:08
-->
<template>
  <div class="login">
    <div class="login-form">
      <NForm ref="formRef" :label-width="80" :model="formValue" :rules="rules">
        <n-form-item label="姓名" path="username">
          <n-input
            v-model:value="formValue.username"
            placeholder="输入用户名"
          />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input v-model:value="formValue.password" placeholder="输入密码" />
        </n-form-item>
        <NFormItem>
          <NButton
            type="primary"
            size="large"
            block
            :loading="loading"
            @click="handleSubmit"
            >登 录</NButton
          >
        </NFormItem>
        <NButton type="primary" size="large" :loading="loading" @click="getUser"
          >获取用户信息</NButton
        >
      </NForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NForm, NFormItem, NInput, NButton } from "naive-ui";
import { reactive, ref, toRaw } from "vue";
import { useUserStore } from "@/store/modules/user";
import { useMessage } from "naive-ui";
const formValue = reactive({
  username: "",
  password: "",
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

const message = useMessage();

interface formState {
  username: string;
  password: string;
}

const handleSubmit = (e: any) => {
  e.preventDefault();
  formRef.value.validate(async (error: any) => {
    if (!error) {
      const { username, password } = formValue;
      const params: formState = {
        username,
        password,
      };
      const res = await userStore.login(params);
      message.success("成功");
    }
  });
};

const getUser = () => {
  const res = toRaw(userStore.getToken);
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
