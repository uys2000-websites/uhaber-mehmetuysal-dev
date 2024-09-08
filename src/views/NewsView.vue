<template>
  <div ref="page" class="h-full w-full flex flex-col flex-none items-center overflow-auto pb-8 flex-shrink"
    @scroll="onScroll">
    <div class="prose">
      <template v-for="unew in news">
        <div class="p-4">
          <h2 v-html="unew.title"></h2>
          <p v-html="unew.summary"></p>
          <div>
            <template v-if="!source">
              <span>Site: <span>{{ unew.site }}</span></span><br />
            </template>
            <template v-if="!category">
              <span>Kategori: <span>{{ unew.category }}</span></span><br />
            </template>
            <span>Ozet Tarihi: {{ new Date(unew.timestamp).toLocaleString() }}</span><br />
            <span>Kaynak: <a :href="unew.url" target="_blank">{{ unew.url }}</a></span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { getNews } from '@/services/firebase/db';

export default {
  data() {
    return {
      source: "",
      category: "",
      news: [] as UNews[],
      onloading: false,
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
    this.source = this.$route.params.id as string
    this.category = this.$route.params.category as string
    this.loadNews()
  },
  mounted() {
  }
}
</script>