<template>
  <template v-if="organizations.length != 0 || categories.length != 0">
    <div class="relative fromTop lg:sticky top-0 bg-neutral w-full rounded-box">
      <div class="flex flex-col md:flex-row items-center justify-between gap-2 p-2">
        <div class="flex gap-2">
          <template v-for="organization in organizations">
            <RouterLink :to="{
              name: 'JournalView',
              query: getOrganizationQuery(organization),
            }" class="btn btn-primary btn-outline" :class="{ 'btn-active': isOrganizationActive(organization) }">
              {{ organization.data.name }}
            </RouterLink>
          </template>
        </div>
        <div class="flex gap-2">
          <template v-for="category in categories">
            <RouterLink :to="{
              name: 'JournalView',
              query: getCategoryQuery(category),
            }" class="btn btn-primary btn-outline" :class="{ 'btn-active': isCategoryActive(category) }">
              {{ category.data.name }}
            </RouterLink>
          </template>
        </div>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import type { URDocument } from '@/types/firebase';
import type { UCategory, UOrganization } from '@/types/main';
import type { PropType } from 'vue';

export default {
  props: {
    organizations: {
      type: Array as PropType<URDocument<UOrganization>[]>,
      required: true
    },
    categories: {
      type: Array as PropType<URDocument<UCategory>[]>,
      required: true
    }
  },
  methods: {

    isOrganizationActive(item: URDocument<UOrganization>) {
      return this.$route.query.organizations?.includes(item.data.codeName);
    },
    isCategoryActive(item: URDocument<UCategory>) {
      return this.$route.query.categories?.includes(item.data.codeName);
    },
    getOrganizationQuery(item: URDocument<UOrganization>) {
      const query = { ...this.$route.query };
      if (!this.isOrganizationActive(item)) {
        const organizations = query.organizations
          ? (query.organizations as string).split(",")
          : [];
        organizations.push(item.data.codeName);
        query.organizations = organizations.join(",");
      } else if (query.organizations != item.data.codeName) {
        const organizations = (query.organizations as string).split(",");
        const index = organizations.indexOf(item.data.codeName);
        if (index !== -1) organizations.splice(index, 1);
        query.organizations = organizations.join(",");
      } else delete query.organizations;
      return query;
    },
    getCategoryQuery(item: URDocument<UCategory>) {
      const query = { ...this.$route.query };
      if (!this.isCategoryActive(item)) {
        const categories = query.categories
          ? (query.categories as string).split(",")
          : [];
        categories.push(item.data.codeName);
        query.categories = categories.join(",");
      } else if (query.categories != item.data.codeName) {
        const categories = (query.categories as string).split(",");
        const index = categories.indexOf(item.data.codeName);
        if (index !== -1) categories.splice(index, 1);
        query.categories = categories.join(",");
      } else delete query.categories;
      return query;
    },
  }
}
</script>


<style>
.fromTop {
  animation-name: fromTop;
  animation-duration: 1s;
}

@keyframes fromTop {
  from {

    transform: translateY(-100px);
  }

  to {
    transform: translateY(0px);
  }
}
</style>