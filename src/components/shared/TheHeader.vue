<<template>
  <header class="px-4 pt-4 sticky top-0 z-10">
    <div class="bg-neutral text-neutral-content flex justify-between items-center p-4 rounded-box">
      <RouterLink class="btn btn-sm btn-ghost" :to="{ name: 'HomeView' }">
        UHaber
      </RouterLink>
      <div class="flex gap-2">
        <RouterLink class="btn btn-sm btn-ghost" :to="{ name: 'AboutView' }">
          Hakkimizda
        </RouterLink>
        <RouterLink class="btn btn-sm btn-ghost" :to="{ name: 'JournalView' }">
          Haberler
        </RouterLink>
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
  import Accordion from '../daisy/Accordion.vue';
  import type { UCategory, UOrganization } from '@/types/main';
  import { useAppStore } from '@/stores/app';
  import { getURDocuments } from '@/services/firebase/db';
  import { CATEGORY, ORGANIZATION } from '@/constant';

  export default {
    components: { RouterLink, Dropdown, DropdownContent, ThemeBtn, Accordion },
    data() {
      return {
        authStore: useAuthStore(),
        appStore: useAppStore(),
      }
    },
    methods: {
      async getCategories() {
      },
    },
    async beforeMount() {
      getURDocuments<UOrganization>(ORGANIZATION).then(organizations => this.appStore.organizations = organizations)
      getURDocuments<UCategory>(CATEGORY).then(categories => this.appStore.categories = categories)
    }
  }
</script>