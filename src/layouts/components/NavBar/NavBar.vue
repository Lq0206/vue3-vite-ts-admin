<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2022-01-07 10:48:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-20 15:21:08
-->
<template>
  <div :class="['navbar', { 'is-border': props.isTag }]">
    <Breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <NavBarMessage></NavBarMessage>
      <el-tooltip content="全屏" placement="bottom">
        <Screenfull class="right-menu-item hover-effect" />
      </el-tooltip>
      <size-select class="right-menu-item hover-effect" />
      <el-dropdown
        popper-class="user-dropdown"
        class="avatar-container"
        @command="handleCommand"
      >
        <span class="el-dropdown-link">
          <div class="avatar-wrapper">
            <img :src="avatar" class="user-avatar" alt="用户头像" />
          </div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="setting"> 个人设置 </el-dropdown-item>
            <el-dropdown-item command="logout"> 退出登录 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBarMessage from "@/components/NavbarMessage/NavbarMessage.vue";
import Breadcrumb from "@/components/Breadcrumb/GlobalBreadcrumb.vue";
import Screenfull from "@/components/ScreenFull/ScreenFull.vue";
import SizeSelect from "@/components/SizeSelect/SizeSelect.vue";
import { useUserStore } from "@/store/modules/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { resetRouter } from "@/router";
const useUser = useUserStore();
const router = useRouter();
const props = defineProps({
  isTag: {
    type: Boolean,
    default: false,
  },
});
const avatar = computed(() => useUser.getAvatar);
const handleCommand = async (command: string) => {
  switch (command) {
    case "setting":
      break;
    case "logout":
      await useUser.loginOut();
      resetRouter();
      router.push(`/login`);
      break;
    default:
      break;
  }
};
</script>
<style lang="scss">
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: var(--container-bg-color-2);
  &.is-border {
    border: 1px solid var(--border-color);
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    padding: 0 20px;
    line-height: 50px;
    display: flex;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      .avatar-wrapper {
        margin-top: 5px;
        margin-left: 12px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .navbar-icon {
    font-size: 18px;
    color: var(--el-text-color-primary);
  }
}
</style>
<style>
.user-dropdown {
  width: auto;
  white-space: nowrap;
}
</style>
