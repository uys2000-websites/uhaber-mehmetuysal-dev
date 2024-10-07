<template>
  <form class="flex flex-col gap-2" @submit.prevent="submit">
    <div class="flex flex-col md:flex-row flex-nowrap gap-2">
      <select class="select w-full" v-model="item.organization">
        <template v-for="organization in organizations">
          <option :value="organization.id">{{ organization.data.name }}</option>
        </template>
      </select>
      <select class="select w-full" v-model="item.category">
        <template v-for="category in categories">
          <option :value="category.id">{{ category.data.name }}</option>
        </template>
      </select>
    </div>
    <label class="input input-bordered flex items-center gap-2">
      <span class="material-symbols-outlined">http</span>
      <input type="text" class="grow" placeholder="URL" v-model="item.url" />
    </label>
    <input class="btn" type="submit" value="Add">
  </form>
</template>

<script lang="ts">
import type { URDocument } from '@/types/firebase';
import type { UCategory, UOrganization, USource } from '@/types/main';
import type { PropType } from 'vue';

export default {
  emits: ["submit"],
  props: {
    form: {
      type: Object as PropType<USource>,
    },
    organizations: {
      type: Array as PropType<URDocument<UOrganization>[]>,
      default: []
    },
    categories: {
      type: Array as PropType<URDocument<UCategory>[]>,
      default: []
    }
  },
  data() {
    return {
      item: {
        url: "",
        category: "",
        organization: ""
      }
    }
  },
  methods: {
    submit() {
      this.$emit("submit", { ...this.item })
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