<template>
  <form class="flex flex-col gap-2" @submit.prevent="submit">
    <div class="flex flex-col md:flex-row flex-nowrap gap-2">
      <label class="input input-bordered flex items-center gap-2 w-full">
        <span class="material-symbols-outlined">category</span>
        <input type="text" class="grow" placeholder="Name" v-model="item.name" />
      </label>
      <label class="input input-bordered flex items-center gap-2 w-full">
        <span class="material-symbols-outlined">fingerprint</span>
        <input type="text" class="grow" placeholder="code-name" v-model="item.codeName" />
      </label>
    </div>
    <input class="btn" type="submit" value="Add">
  </form>
</template>

<script lang="ts">
import type { UCategory } from '@/types/main';
import type { PropType } from 'vue';

export default {
  emits: ["submit"],
  props: {
    form: {
      type: Object as PropType<UCategory>,
    }
  },
  data() {
    return {
      item: {
        url: "",
        name: "",
        codeName: ""
      } as UCategory
    }
  },
  methods: {
    submit() {
      this.$emit("submit", this.item)
    }
  },
  watch: {
    form(newForm) {
      this.item = { ...newForm }
    }
  },
  mounted() {
    if (this.form) this.item = { ...this.form }
  }
}
</script>