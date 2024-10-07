<template>
  <div class="toast toast-start toast-bottom">
    <TransitionGroup name="slide">
      <template v-for="notification, index in notificationStore.notifications" :key="index">
        <div class="alert" :class="notification[0]">
          <span>{{ notification[1] }}</span>
        </div>
      </template>
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import { useNotificationStore } from '@/stores/notification';
import { TransitionGroup } from 'vue';

export default {
  components: { TransitionGroup },
  data() {
    return {
      notificationStore: useNotificationStore()
    }
  }
}
</script>

<style>
.slide-enter-active {
  position: relative;
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  position: relative;
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>