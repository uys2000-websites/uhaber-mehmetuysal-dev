<template>
  <div class="h-screen w-screen bg-base-300 overflow-hidden relative flex flex-col flex-nowrap">
    <TheHeader />
    <div class="h-full w-full flex flex-col flex-shrink relative" :class="{ 'overflow-hidden': appStore.hide }">
      <router-view v-slot="{ Component, route }">
        <transition name="page">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </div>
    <TheToasts />
  </div>
</template>

<script lang="ts">
import TheHeader from '@/components/shared/TheHeader.vue';
import TheToasts from '@/components/shared/TheToasts.vue';
import { useAppStore } from '@/stores/app';
import { RouterView } from 'vue-router'
export default {
  components: {
    TheHeader,
    RouterView,
    TheToasts
  },
  data() {
    return {
      appStore: useAppStore()
    }
  }
}
</script>

<style>
.page-enter-active,
.page-leave-active {
  position: fixed;
  transition: 0.5s ease;
}

.page-enter-from {
  transform: translateY(100vh);
  opacity: 0;
}

.page-leave-to {
  transform: translateY(-100vh);
  opacity: 0;
}
</style>