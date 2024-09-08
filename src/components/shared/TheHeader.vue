<template>
  <header class="px-4 pt-4 sticky top-0 z-10">
    <div class="bg-neutral text-neutral-content flex justify-between items-center p-4 rounded-box">
      <RouterLink class="btn btn-sm btn-ghost" :to="{ name: 'HomeView' }">
        UHaber
      </RouterLink>
      <div class="flex gap-2">
        <RouterLink class="btn btn-sm btn-ghost" :to="{ name: 'AboutView' }">
          Hakkimizda
        </RouterLink>
        <Dropdown class="dropdown-end">
          <template #title>
            <div class="btn btn-sm btn-ghost">
              Menu
            </div>
          </template>
          <template #content>
            <DropdownContent class="bg-neutral rounded-btn w-max mt-1">
              <div class="flex flex-col">
                <RouterLink class="btn btn-sm btn-ghost" :to="{ name: 'NewsView' }">
                  Tum haberler
                </RouterLink>
                <template v-for="source in sources">
                  <Accordion>
                    <template #title>
                      <span class="text-center w-full inline-block">
                        {{ source.name }}
                      </span>
                    </template>
                    <template #content>
                      <div class="flex flex-col gap-1 max-h-96">
                        <RouterLink class="btn btn-sm btn-ghost"
                          :to="{ name: 'SourceView', params: { id: source.id } }">
                          Tumu
                        </RouterLink>
                        <template v-for="category in source.categories">
                          <RouterLink class="btn btn-sm btn-ghost"
                            :to="{ name: 'CategoryView', params: { id: source.id, category: category.name.replace(/ /g, '-').toLowerCase() } }">
                            {{ category.name }}
                          </RouterLink>
                        </template>
                      </div>
                    </template>
                  </Accordion>
                </template>
              </div>
            </DropdownContent>
          </template>
        </Dropdown>
        <ThemeBtn />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import Dropdown from '../daisy/Dropdown.vue';
import DropdownContent from '../daisy/DropdownContent.vue';
import ThemeBtn from '../daisy/ThemeBtn.vue';
import { useAuthStore } from '@/stores/auth';
import { getSources } from '@/services/firebase/db';
import Accordion from '../daisy/Accordion.vue';

export default {
  components: { RouterLink, Dropdown, DropdownContent, ThemeBtn, Accordion },
  data() {
    return {
      authStore: useAuthStore(),
      sources: [] as USource[]
    }
  },
  methods: {
    async getSources() {
      this.sources = await getSources()
    }
  },
  mounted() {
    this.getSources()
  }
}
</script>