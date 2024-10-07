<template>
  <div>
    <CategoryForm v-on:submit="add" />
    <CategoryList :model-value="items" @update:model-value="update" />
  </div>
</template>

<script lang="ts">
import type { UCategory } from '@/types/main';
import type { URDocument } from '@/types/firebase';
import { addUDocument, getURDocuments } from '@/services/firebase/db';
import { CATEGORY } from '@/constant';
import CategoryForm from './CategoryForm.vue';
import CategoryList from './CategoryList.vue';

export default {
  components: { CategoryForm, CategoryList },
  emits: ["update:items"],
  data() {
    return {
      items: [] as URDocument<UCategory>[],
    }
  },
  methods: {
    async update(value: URDocument<UCategory>[]) {
      this.items = value
      this.$emit("update:items", this.items)
    },
    async add(value: UCategory) {
      const result = await addUDocument(CATEGORY, { data: value, timestamp: Date.now(), utimestamp: Date.now() })
      this.items.unshift({ ...result, data: { ...result.data } });
      this.$emit("update:items", this.items)
    },
    async loadItems() {
      this.items = await getURDocuments(CATEGORY)
      this.$emit("update:items", this.items)
    }
  },
  mounted() {
    this.loadItems()
  }
}
</script>