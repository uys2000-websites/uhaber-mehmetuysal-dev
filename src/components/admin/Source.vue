<template>
  <div>
    <SourceForm :organizations="organizations" :categories="categories" v-on:submit="add" />
    <SourceList :organizations="organizations" :categories="categories" v-model="items" />
  </div>
</template>

<script lang="ts">
import type { UCategory, UOrganization, USource } from '@/types/main';
import type { URDocument } from '@/types/firebase';
import { addUDocument, getURDocuments } from '@/services/firebase/db';
import { SOURCE } from '@/constant';
import SourceForm from './SourceForm.vue';
import SourceList from './SourceList.vue';
import type { PropType } from 'vue';

export default {
  components: { SourceForm, SourceList },
  props: {
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
      items: [] as URDocument<USource>[],
    }
  },
  methods: {
    async add(value: USource) {
      const result = await addUDocument(SOURCE, { data: value, timestamp: Date.now(), utimestamp: Date.now() })
      this.items.unshift(result);
    },
    async loadItems() {
      this.items = await getURDocuments(SOURCE)
      console.log(this.items);
    }
  },
  mounted() {
    this.loadItems()
  }
}
</script>