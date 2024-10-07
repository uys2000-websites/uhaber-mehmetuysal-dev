<template>
  <div class="collapse">
    <input class="min-h-0" type="radio" :name="name" :checked="checked" />
    <div class="collapse-title min-h-0 p-0 flex justify-center items-center" style="padding-inline-end: 0;">
      <slot name="title" />
    </div>
    <div class="collapse-content">
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    name: {
      type: String,
      default: "accordion"
    },
    checked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.collapse:has(input[type="radio"]:checked) {
  @apply flex-shrink;
}

.collapse:has(>input[type="radio"]:not(:checked)) {
  @apply flex-shrink-0;
}
</style>