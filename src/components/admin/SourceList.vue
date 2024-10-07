<template>
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Organization</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item, index in items">
          <tr>
            <td>{{ index }}</td>
            <td>
              <div>{{ item.id }}</div>
            </td>
            <td>
              <div>{{ organization(item.data.organization)?.data.name }}</div>
              <div>{{ item.data.organization }}</div>
            </td>
            <td>
              <div>{{ category(item.data.category)?.data.name }}</div>
              <div>{{ item.data.category }}</div>
            </td>
            <td>{{ item.data.url }}</td>
            <td class="text-center">
              <span class="material-symbols-outlined text-error cursor-pointer" @click="() => remove(item.id)">
                delete
              </span>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { SOURCE } from '@/constant';
import { removeDocument } from '@/services/firebase/db';
import type { URDocument } from '@/types/firebase';
import type { UCategory, UOrganization, USource } from '@/types/main';
import type { PropType } from 'vue';

export default {
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: Array as PropType<URDocument<USource>[]>,
      default: []
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
  methods: {
    organization(id: string) {
      return this.organizations.find(o => o.id == id)
    },
    category(id: string) {
      return this.categories.find(o => o.id == id)
    },
    async remove(id: string) {
      await removeDocument(SOURCE, id)
      this.items = this.items.filter(item => item.id !== id);
    }
  },
  computed: {
    items: {
      get() {
        return this.modelValue;
      },
      set(value: URDocument<USource>[]) {
        this.$emit("update:modelValue", value);
      }
    }
  }
}
</script>