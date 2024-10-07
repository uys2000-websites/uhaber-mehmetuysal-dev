<template>
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item, index in items">
          <tr>
            <td>{{ index }}</td>
            <td>
              <div>Code Name: <span class="font-bold">{{ item.data.codeName }}</span></div>
              <div>{{ item.id }}</div>
            </td>
            <td>{{ item.data.name }}</td>
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
import { CATEGORY } from '@/constant';
import { removeDocument } from '@/services/firebase/db';
import type { URDocument } from '@/types/firebase';
import type { UCategory } from '@/types/main';
import type { PropType } from 'vue';

export default {
  emits: ["update:modelValue"],
  props: {
    modelValue: Array as PropType<URDocument<UCategory>[]>,
    default: []
  },
  methods: {
    async remove(id: string) {
      await removeDocument(CATEGORY, id)
      this.items = this.items.filter(item => item.id !== id);
    }
  },
  computed: {
    items: {
      get() {
        return this.modelValue ?? [];
      },
      set(value: URDocument<UCategory>[]) {
        this.$emit("update:modelValue", value);
      }
    }
  }
}
</script>