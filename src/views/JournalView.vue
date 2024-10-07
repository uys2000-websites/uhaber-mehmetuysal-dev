<template>
  <div class="h-full w-full overflow-hidden p-4 flex-shrink flex flex-col flex-nowrap">
    <div class="w-full h-max overflow-hidden flex flex-col">
      <Filter :organizations="appStore.organizations" :categories="appStore.categories" />
      <div class="h-full w-full flex flex-col items-center overflow-auto rounded-box gap-2 p-4" @scroll="onScroll">
        <template v-for="unew in news">
          <div class="prose bg-neutral text-neutral-content p-2 rounded-box flex-shrink-0">
            <h2 class="my-2 text-neutral-content" v-html="unew.data.result.title"></h2>
            <p v-html="unew.data.result.summary"></p>
            <div>
              <span>
                Yayin:
                <span>
                  {{
                    appStore.organizations.find(
                      (o) => o.id == unew.data.organization
                    )
                  }}
                </span>
              </span>
              <span>
                Kategori:
                <span>
                  {{
                    appStore.categories.find(
                      (c) => c.id == unew.data.category
                    )
                  }}
                </span>
              </span>
              <span>
                Ozet Tarihi:
                <span>
                  {{ new Date(unew.utimestamp).toLocaleString() }}
                </span>
              </span>
              <span>
                Kaynak:
                <a class="link link-info break-all" :href="unew.data.rss.url" target="_blank">
                  {{ unew.data.rss.url }}
                </a>
              </span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Collapse from "@/components/daisy/Collapse.vue";
import Filter from "@/components/Journal/Filter.vue";
import { NEWS } from "@/constant";
import { getURDocumentsQuery } from "@/services/firebase/db";
import { useAppStore } from "@/stores/app";
import type { URDocument } from "@/types/firebase";
import type { UCategory, UJournal, UOrganization } from "@/types/main";
import type { WhereFilterOp } from "firebase/firestore";
import { RouterLink } from "vue-router";

export default {
  components: { Collapse, Filter, RouterLink },
  data() {
    return {
      source: "",
      category: "",
      news: [] as URDocument<UJournal>[],
      onloading: false,
      appStore: useAppStore(),
    };
  },
  methods: {
    getCategoryId(category: string) {
      return this.appStore.categories.find((c) => c.data.codeName == category)?.id ?? ""
    },
    getOrganizationId(organization: string) {
      return this.appStore.organizations.find((c) => c.data.codeName == organization)?.id ?? ""
    },
    async onScroll(e: Event) {
      if (this.onloading) return;
      const div = e.target as HTMLDivElement;
      if (div.offsetHeight + div.scrollTop >= div.scrollHeight - 200) {
        this.onloading = true;
        await this.loadNews();
        this.onloading = false;
      }
    },
    getCategoryConditons() {
      return this.categories.map(
        (category) =>
          [
            "data.category",
            "==",
            this.getCategoryId(category),
          ] as [string, WhereFilterOp, string]
      );
    },
    getOrganizationConditons() {
      return this.organizations.map(
        (organization) =>
          [
            "data.source.organization",
            "==",
            this.getOrganizationId(organization),
          ] as [string, WhereFilterOp, string]
      );
    },
    async loadNews() {
      const lastNews = this.news[this.news.length - 1];
      const news = await getURDocumentsQuery<UJournal>(
        NEWS,
        [...this.getCategoryConditons(), ...this.getOrganizationConditons()],
        lastNews?.timestamp ?? Date.now()
      );
      this.news = this.news.concat(news)
    },
  },
  computed: {
    categories() {
      if (!this.$route.query.categories) return [];
      return (this.$route.query.categories as string).split(",");
    },
    organizations() {
      if (!this.$route.query.organizations) return [];
      return (this.$route.query.organizations as string).split(",");
    }
  },
  async beforeMount() {
    this.appStore.hide = true;
    this.source = this.$route.params.id as string;
    this.category = this.$route.params.category as string;
    this.loadNews();
  },
  beforeUnmount() {
    this.appStore.hide = false;
  },
};
</script>
