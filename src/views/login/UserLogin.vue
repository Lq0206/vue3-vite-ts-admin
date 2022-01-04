<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2021-12-30 15:07:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-04 11:31:55
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
          <ElInput v-model="formValue.password" placeholder="输入密码：admin" />
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
        <ElButton
          type="primary"
          size="large"
          :loading="loading"
          @click="getUser"
          >获取用户信息</ElButton
        >
      </ElForm>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ElForm, ElFormItem, ElButton, ElInput } from "element-plus";
import { reactive, ref, toRaw } from "vue";
import { useUserStore } from "@/store/modules/user";
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
      console.log("login", res);
    }
  });
};

const getUser = async () => {
  const res = await userStore.getUserInfo();
  console.log(res);
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
