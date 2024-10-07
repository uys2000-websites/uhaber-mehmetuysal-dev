<template>
  <div class="fixed w-screen h-screen flex justify-center items-center">
    <span class="loading loading-infinity loading-lg"></span>
  </div>
</template>

<script lang="ts">
import { auth } from '@/services/firebase/auth';
import { useAuthStore } from '@/stores/auth';

export default {
  data() {
    return {
      authStore: useAuthStore()
    }
  },
  async mounted() {
    await auth.authStateReady()
    if (auth.currentUser) {
      if (this.$route.redirectedFrom?.name) {
        this.$router.push({ name: this.$route.redirectedFrom.name })
        return;
      }
    }
    this.$router.push({ name: 'LoginView' })
  }
}
</script>