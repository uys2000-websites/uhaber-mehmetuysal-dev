<template>
  <div class="w-full flex flex-col gap-4 p-4">
    <Accordion class="bg-neutral text-neutral-content">
      <template #title>
        <div class="w-full text-left p-4">Organization</div>
      </template>
      <template #content>
        <Organization @update:items="setOrganizations" />
      </template>
    </Accordion>
    <Accordion class="bg-neutral text-neutral-content">
      <template #title>
        <div class="w-full text-left p-4">Categories</div>
      </template>
      <template #content>
        <Category @update:items=setCategories />
      </template>
    </Accordion>
    <Accordion class="bg-neutral text-neutral-content">
      <template #title>
        <div class="w-full text-left p-4">Soruces</div>
      </template>
      <template #content>
        <Source :organizations="organizations" :categories="categories" />
      </template>
    </Accordion>
    <Accordion class="bg-neutral text-neutral-content">
      <template #title>
        <div class="w-full text-left p-4">Logs</div>
      </template>
      <template #content>
        <Logs />
      </template>
    </Accordion>
  </div>
</template>
<script lang="ts">
import type { URDocument } from '@/types/firebase';
import type { UCategory, UOrganization, USource } from '@/types/main';
import Accordion from '@/components/daisy/Accordion.vue';
import Organization from '@/components/admin/Organization.vue';
import Category from '@/components/admin/Category.vue';
import Source from '@/components/admin/Source.vue';
import Logs from '@/components/admin/Logs.vue';


export default {
  components: {
    Accordion,
    Organization,
    Category,
    Source,
    Logs
  },
  data() {
    return {
      organizations: [] as URDocument<UOrganization>[],
      categories: [] as URDocument<UCategory>[],
    }
  },
  methods: {
    async setOrganizations(value: URDocument<UOrganization>[]) {
      this.organizations = value
    },
    async setCategories(value: URDocument<UCategory>[]) {
      this.categories = value
    },
  },
  async beforeMount() {
  },
}
</script>
