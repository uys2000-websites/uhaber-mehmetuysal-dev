<template>
  <div class="h-full w-full overflow-hidden p-4">
    <div class="h-full w-full flex justify-center overflow-auto rounded-box" @scroll="onScroll">
      <div class="prose h-max flex flex-col py-4 gap-4">
        <template v-for="unew in news">
          <div class="bg-neutral text-neutral-content p-2 rounded-box">
            <h2 class="my-2 text-neutral-content" v-html="unew.title"></h2>
            <p v-html="unew.summary"></p>
            <div>
              <template v-if="!source">
                <span>Site: <span>{{ unew.site }}</span></span><br />
              </template>
              <template v-if="!category">
                <span>Kategori: <span>{{ unew.category }}</span></span><br />
              </template>
              <span>Ozet Tarihi: {{ new Date(unew.timestamp).toLocaleString() }}</span><br />
              <span>Kaynak: <a class="link link-info break-all" :href="unew.url" target="_blank">{{ unew.url
                  }}</a></span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getNews } from '@/services/firebase/db';
import { useAppStore } from '@/stores/app';

export default {
  data() {
    return {
      source: "",
      category: "",
      news: [] as UNews[],
      onloading: false,
      appStore: useAppStore()
    }
  },
  methods: {
    async onScroll(e: Event) {
      if (this.onloading) return;
      const div = e.target as HTMLDivElement
      if (div.offsetHeight + div.scrollTop >= div.scrollHeight - 200) {
        this.onloading = true
        await this.loadNews()
        this.onloading = false
      }
    },
    async loadNews() {
      const lastNews = this.news[this.news.length - 1]
      this.news = this.news.concat(await getNews(this.source, this.category, lastNews?.timestamp))
    }
  },
  async beforeMount() {
    this.appStore.hide = false
    this.source = this.$route.params.id as string
    this.category = this.$route.params.category as string
    this.loadNews()
  },
  beforeUnmount() {
    this.appStore.hide = false
  }
}
</script>