<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2022-01-05 15:30:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-05 15:31:17
-->
<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { isExternal } from "@/utils/validate";
import { computed } from "vue";
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});

const _isExternal = computed(() => isExternal(props.to));
const type = computed(() => {
  if (_isExternal.value) {
    return "a";
  }
  return "router-link";
});

/* methods */
const linkProps = (to: string) => {
  try {
    if (_isExternal.value) {
      return {
        href: to,
        target: "_blank",
        rel: "noopener",
      };
    }
    return {
      to: to,
    };
  } catch (e) {
    console.log(e);
  }
};
</script>
<style lang="scss" scoped></style>
