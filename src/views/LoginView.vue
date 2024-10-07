<template>
  <div class="h-screen w-screen flex justify-center items-center">
    <form class="bg-neutral text-neutral-content p-4 rounded-box flex flex-col gap-2" @submit.prevent="submit">
      <label class="input input-bordered flex items-center gap-2">
        <span class="material-symbols-outlined">mail</span>
        <input type="email" class="grow" placeholder="Email" v-model="email" />
      </label>
      <label class="input input-bordered flex items-center gap-2">
        <span class="material-symbols-outlined">key</span>
        <input type="password" class="grow" placeholder="Passoword" v-model="password" />
      </label>
      <input type="submit" value="SignIn" class="btn">
    </form>
  </div>
</template>

<script lang="ts">
import { auth, signIn } from '@/services/firebase/auth';
import { useAuthStore } from '@/stores/auth';

export default {
  data() {
    return {
      email: "uhaber@mehmetuysal.dev",
      password: "UusGVeP6TUu10PuPtjfeWbzG4cWjDN6cmgxpGc0MFbfmtwuOW2",
      authStore: useAuthStore()
    }
  },
  methods: {
    async submit() {
      const { user } = await signIn(this.email, this.password)
      if (user) {
        this.authStore.id = user.uid
        this.$router.push({ name: "AdminView" })
      }
    }
  },
  beforeMount() {
    auth.authStateReady().then(() => {
      if (this.authStore.id) this.$router.push({ name: "AdminView" })
    })
  }
}
</script>