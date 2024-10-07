<template>
  <div>
    <template v-for="log in logs">
      <Collapse>
        <template #title>
          <div class="flex justify-between">
            <div>
              {{ log.data.name }} {{ log.data.status }}
            </div>
            <div>
              {{ log.data.type }} {{ new Date(log.timestamp).toLocaleString() }}
            </div>
          </div>
        </template>
        <template #content>
          <div class="flex justify-between">
            {{ log.data.args }}
          </div>
        </template>
      </Collapse>
    </template>
  </div>
</template>

<script lang="ts">
import { getorderedURDocuments, listener } from '@/services/firebase/db';
import Collapse from '../daisy/Collapse.vue';
import type { ULog } from '@/types/main';
import type { URDocument } from '@/types/firebase';
import type { Unsubscribe } from 'firebase/firestore';

export default {
  components: { Collapse },
  data() {
    return {
      listener: null as null | Unsubscribe,
      logs: [] as URDocument<ULog>[]
    }
  },
  async mounted() {
    const now = Date.now();
    this.logs = await getorderedURDocuments<ULog>("log")
    this.listener = listener<ULog>("log", now, (data) => {
      this.logs = this.logs.concat(data)
    })
  }
}
</script>