<template>
  <span class="glass-icon" :class="[`gi-${name}`, { 'gi-anim': animated }]" :style="{ width: px + 'px', height: px + 'px' }" aria-hidden="true">
    <component v-if="icon" :is="icon" :size="px" :shadow="shadow" :animated="animated" />
    <span v-else class="glass-icon-raw" v-html="rawSvg"></span>
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { glassIcons } from '../icons.js'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
  shadow: { type: [Boolean, Number], default: 0 },
  animated: { type: [Boolean, String], default: false },
})

const px = computed(() => Number(props.size) || 24)

const aliases = { 'app-store': 'layout-grid', 'cloud-download': 'file-down' }
const icon = computed(() => glassIcons[props.name] || glassIcons[aliases[props.name]] || null)

// Domain-specific icons that the thesvg UI set does not cover keep their local glass SVGs.
const localIcons = import.meta.glob('../assets/icons/*.svg', { eager: true, query: '?raw', import: 'default' })
const uid = `glass-${Math.random().toString(36).slice(2, 10)}`
const rawSvg = computed(() => {
  let source = localIcons[`../assets/icons/${props.name}.svg`] || localIcons['../assets/icons/circle-question-mark.svg'] || ''
  const ids = []
  source = source.replace(/id="([^"]+)"/g, (_, id) => { ids.push(id); return `id="${uid}-${id}"` })
  ids.forEach(id => { source = source.replaceAll(`url(#${id})`, `url(#${uid}-${id})`).replaceAll(`href="#${id}"`, `href="#${uid}-${id}"`) })
  return source
})
</script>

<style scoped>
.glass-icon { display: inline-flex; flex: 0 0 auto; vertical-align: middle; transition: transform .45s var(--ease-soft), filter .45s var(--ease-soft); }
.glass-icon :deep(svg), .glass-icon-raw :deep(svg) { display: block; width: 100%; height: 100%; overflow: visible; }
.glass-icon-raw :deep(svg) { filter: drop-shadow(0 1px 2px color-mix(in srgb, currentColor 18%, transparent)); }
</style>
