<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2022-01-05 11:10:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-11 11:13:56
-->
<template>
  <div
    ref="rightPanel"
    :class="{ show: state.show }"
    class="rightPanel-container"
  >
    <div class="rightPanel-background" />
    <div class="rightPanel">
      <div
        class="handle-button"
        :style="{ top: props.buttonTop + 'px' }"
        @click="state.show = !state.show"
      >
        <i :class="['iconfont', state.show ? 'icon-close' : 'icon-setting']" />
      </div>
      <div class="rightPanel-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { addClass, removeClass } from "@/utils";
import { onMounted, onBeforeUnmount, reactive, watch, ref } from "vue";
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

const state = reactive({
  show: false,
});
const rightPanel = ref(null);

// const theme = computed(() => store.state.settings.theme);

watch(
  () => state.show,
  (value) => {
    if (value && !props.clickNotClose) {
      addEventClick();
    }
    if (value) {
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
  const elx = rightPanel.value as any;
  elx.remove();
});

const addEventClick = () => {
  window.addEventListener("click", closeSidebar);
};

const closeSidebar = (evt: any) => {
  const parent = evt.target.closest(".rightPanel");
  if (!parent) {
    state.show = false;
    window.removeEventListener("click", closeSidebar);
  }
};

const insertToBody = () => {
  const elx = rightPanel.value as any;
  const body = document.querySelector("body") as HTMLBodyElement;
  body.insertBefore(elx, body.firstChild);
};
</script>
<style>
.showRightPanel {
  overflow: hidden;
  position: relative;
  width: calc(100% - 15px);
}
</style>

<style lang="scss">
@import "@/styles/variables.scss";
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
  z-index: 5001;
}

.show {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

  .rightPanel-background {
    z-index: 5000;
    opacity: 1;
    width: 100%;
    height: 100%;
  }

  .rightPanel {
    transform: translate(0);
  }
}

.handle-button {
  background: $gradual-bg;
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
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
  }
}
</style>
