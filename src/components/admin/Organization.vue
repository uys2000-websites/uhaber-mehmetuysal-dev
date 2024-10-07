<template>
  <div>
    <OrganizationForm v-on:submit="add" />
    <OrganizationList :model-value="items" @update:model-value="update" />
  </div>
</template>

<script lang="ts">
import type { UOrganization } from '@/types/main';
import OrganizationForm from './OrganizationForm.vue';
import type { URDocument } from '@/types/firebase';
import { addUDocument, getURDocuments } from '@/services/firebase/db';
import { ORGANIZATION } from '@/constant';
import OrganizationList from './OrganizationList.vue';

export default {
  components: { OrganizationForm, OrganizationList },
  data() {
    return {
      items: [] as URDocument<UOrganization>[],
    }
  },
  methods: {
    async update(value: URDocument<UOrganization>[]) {
      this.items = value
      this.$emit("update:items", this.items)
    },
    async add(value: UOrganization) {
      const result = await addUDocument(ORGANIZATION, { data: value, timestamp: Date.now(), utimestamp: Date.now() })
      this.items.unshift({ ...result, data: { ...result.data } });
      this.$emit("update:items", this.items)
    },
    async loadItems() {
      this.items = await getURDocuments(ORGANIZATION)
      this.$emit("update:items", this.items)
    }
  },
  mounted() {
    this.loadItems()
  }
}
</script>