<template>
  <router-view v-slot="{ Component }">
    <transition name="layout">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { RouterView } from 'vue-router'
import { auth } from './services/firebase/auth';
import { useAuthStore } from './stores/auth';
export default {
  components: {
    RouterView
  },
  beforeMount() {
    const authStore = useAuthStore()
    auth.onAuthStateChanged((user) => {
      if (user) authStore.id = user.uid
      else authStore.id = null;
      if (!authStore.id && this.$route.meta.authRequired) this.$router.push({ name: "LoaderView" })
    })
  }
}
</script>


<style>
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s ease;
  position: absolute;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>