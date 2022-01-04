<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2021-12-31 15:46:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-31 15:47:41
-->
<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="slide-fade">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped></style>
