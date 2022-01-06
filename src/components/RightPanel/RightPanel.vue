<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2022-01-05 11:10:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-05 14:21:14
-->
<template>
  <div ref="rightPanel" :class="{ show: show }" class="rightPanel-container">
    <div class="rightPanel-background" />
    <div class="rightPanel">
      <div
        class="handle-button"
        :style="{ top: buttonTop + 'px' }"
        @click="showToggle"
      >
        <el-icon v-if="!show"><Setting /></el-icon>
        <el-icon v-else><Close /></el-icon>
      </div>
      <div class="rightPanel-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Setting, Close } from "@element-plus/icons-vue";
import { addClass, removeClass } from "@/utils";
import { onMounted, onBeforeUnmount, reactive, watch, ref, Ref } from "vue";

// props
const props = defineProps({
  clickNotClose: {
    default: false,
    type: Boolean,
  },
  buttonTop: {
    default: 250,
    type: Number,
  },
});

// state
const show = ref(false);
const rightPanel = ref(null);

//watch
watch(
  () => show,
  (value) => {
    console.log(props);
    if (value && !props.clickNotClose) {
      addEventClick();
    }
    if (value) {
      console.log("showRightPanel", value);
      addClass(document.body, "showRightPanel");
    } else {
      removeClass(document.body, "showRightPanel");
    }
  }
);

onMounted(() => {
  insertToBody();
});

onBeforeUnmount(() => {
  const elx = rightPanel.value;
  (elx as any).remove();
});

// methods
const addEventClick = () => {
  window.addEventListener("click", closeSidebar);
};

const closeSidebar = (evt: any) => {
  const parent = evt.target.closest(".rightPanel");
  if (!parent) {
    show.value = false;
    window.removeEventListener("click", closeSidebar);
  }
};

const insertToBody = () => {
  const elx = rightPanel.value;
  const body = document.querySelector("body");
  body.insertBefore(elx, body.firstChild);
};

const showToggle = (e: any) => {
  e.preventDefault();
  show.value = !show.value;
  console.log("showToggle", show.value);
};
</script>
<style lang="scss">
.showRightPanel {
  overflow: hidden;
  position: relative;
  width: calc(100% - 15px);
}
</style>

<style lang="scss">
.rightPanel-container.show {
}
.rightPanel-background {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  background: rgba(0, 0, 0, 0.2);
  z-index: -1;
}

.rightPanel {
  width: 100%;
  max-width: 260px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(100%);
  background: #fff;
  z-index: 1001;
}

.show {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

  .rightPanel-background {
    z-index: 1000;
    opacity: 1;
    width: 100%;
    height: 100%;
  }

  .rightPanel {
    transform: translate(0);
  }
}

.handle-button {
  background: aqua;
  width: 48px;
  height: 48px;
  position: absolute;
  left: -48px;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  line-height: 48px;
  i {
    font-size: 24px;
    line-height: 48px;
  }
}
</style>
