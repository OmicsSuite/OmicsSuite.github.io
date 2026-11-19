<template>
  <div class="gallery-wrap">
    <div class="gallery-filters" role="group" :aria-label="pick('图库分类', 'Gallery categories')">
      <button v-for="filter in filters" :key="filter" type="button" :class="{ active: activeFilter === filter }" @click="activeFilter = filter">{{ filterLabel(filter) }}</button>
    </div>
    <TransitionGroup name="gallery" tag="div" class="gallery-grid">
      <button v-for="(item, index) in visibleItems" :key="item.image" class="result-card" type="button" :class="{ featured: index === 0 && activeFilter === 'all' }" @click="open(item)">
        <span class="result-image"><img :src="asset(item.image)" :alt="pick(item.zh, item.en)" loading="lazy" /><span class="zoom-icon"><GlassIcon name="search" :size="21" /></span></span>
        <span class="result-caption"><span><strong>{{ pick(item.zh, item.en) }}</strong><small>{{ categoryLabel(item.category) }}</small></span><GlassIcon name="external-link" :size="18" /></span>
      </button>
    </TransitionGroup>
    <el-dialog v-model="lightbox" :show-close="false" width="92%" class="lightbox-dialog" append-to-body @closed="activeItem = null">
      <template v-if="activeItem">
        <div class="lightbox-header"><div><span>{{ categoryLabel(activeItem.category) }}</span><h3>{{ pick(activeItem.zh, activeItem.en) }}</h3></div><button type="button" :aria-label="t('common.close')" @click="lightbox = false"><GlassIcon name="x" :size="22" /></button></div>
        <div class="lightbox-image"><img :src="asset(activeItem.image)" :alt="pick(activeItem.zh, activeItem.en)" /></div>
        <div class="lightbox-footer"><p>{{ pick(activeItem.descZh, activeItem.descEn) }}</p><div><button type="button" :aria-label="t('common.previous')" @click="step(-1)"><GlassIcon name="arrow-left" :size="20" /></button><span>{{ currentIndex + 1 }} / {{ visibleItems.length }}</span><button type="button" :aria-label="t('common.next')" @click="step(1)"><GlassIcon name="arrow-right" :size="20" /></button></div></div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import GlassIcon from './GlassIcon.vue'
import { useI18n } from '../i18n.js'
const props = defineProps({ items: { type: Array, required: true }, categories: { type: Array, required: true } })
const { t, pick } = useI18n()
const activeFilter = ref('all'), activeItem = ref(null), lightbox = ref(false)
const filters = ['all', 'singlecell', 'transcriptomics', 'genomics', 'enrichment', 'metabolomics', 'clinical']
const visibleItems = computed(() => activeFilter.value === 'all' ? props.items : props.items.filter(item => item.category === activeFilter.value))
const currentIndex = computed(() => activeItem.value ? visibleItems.value.findIndex(item => item.image === activeItem.value.image) : -1)
const asset = name => `${import.meta.env.BASE_URL}assets/images/${name}`
function categoryLabel(id) { const category = props.categories.find(item => item.id === id); return category ? pick(category.zh, category.en) : id }
function filterLabel(id) { return id === 'all' ? pick('全部结果', 'All results') : categoryLabel(id) }
function open(item) { activeItem.value = item; lightbox.value = true }
function step(direction) { const index = (currentIndex.value + direction + visibleItems.value.length) % visibleItems.value.length; activeItem.value = visibleItems.value[index] }
function onKey(event) { if (!lightbox.value) return; if (event.key === 'ArrowLeft') step(-1); if (event.key === 'ArrowRight') step(1) }
onMounted(() => window.addEventListener('keydown', onKey)); onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>
<style scoped>
.gallery-filters { display: flex; gap: 8px; margin-bottom: 30px; overflow-x: auto; padding: 3px 2px 10px; scrollbar-width: thin; }
.gallery-filters button { flex: none; min-height: 38px; padding: 0 15px; border: 1px solid var(--border); border-radius: 999px; color: var(--muted); background: var(--surface); font: inherit; font-size: 12px; cursor: pointer; transition: .2s; }
.gallery-filters button.active { color: var(--button-text); border-color: var(--accent); background: var(--accent); }
.gallery-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
.result-card { min-width: 0; padding: 0; overflow: hidden; border: 1px solid var(--border); border-radius: var(--radius-media); color: var(--ink); background: var(--surface); box-shadow: var(--shadow-soft); text-align: left; cursor: zoom-in; transition: transform .5s var(--ease-soft), box-shadow .5s var(--ease-soft), border-color .5s var(--ease-soft); }
.result-card.featured { grid-column: span 2; }
.result-card:hover { transform: translateY(-6px); border-color: color-mix(in srgb, var(--accent) 35%, var(--border)); box-shadow: var(--shadow); }
.result-image { position: relative; display: block; aspect-ratio: 1.5; overflow: hidden; background: color-mix(in srgb, var(--surface) 86%, #ffffff); }
.result-image img { width: 100%; height: 100%; object-fit: contain; transition: transform .85s var(--ease-soft); }
.result-card:hover img { transform: scale(1.035); }
.zoom-icon { position: absolute; right: 13px; bottom: 13px; display: grid; place-items: center; width: 38px; height: 38px; border-radius: 12px; color: var(--accent); background: #ffffffd9; box-shadow: 0 4px 15px #0002; opacity: 0; transform: translateY(7px); transition: .4s var(--ease-soft); }
.result-card:hover .zoom-icon { opacity: 1; transform: none; }
.result-caption { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 17px 18px 18px; }
.result-caption > span { min-width: 0; }
.result-caption strong { display: block; overflow: hidden; font-size: 14px; text-overflow: ellipsis; white-space: nowrap; }
.result-caption small { display: block; margin-top: 5px; color: var(--muted); font-size: 11px; }
.result-caption > :deep(.glass-icon) { color: var(--muted); }
.gallery-enter-active, .gallery-leave-active { transition: opacity .25s, transform .25s; }
.gallery-enter-from, .gallery-leave-to { opacity: 0; transform: scale(.97); }
.gallery-leave-active { position: absolute; }
.lightbox-header { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 4px 4px 17px; }
.lightbox-header span { color: var(--accent); font-size: 11px; }
.lightbox-header h3 { margin: 4px 0 0; font-size: 20px; }
.lightbox-header button, .lightbox-footer button { display: grid; place-items: center; width: 40px; height: 40px; border: 1px solid var(--border); border-radius: 12px; color: var(--ink); background: var(--surface); cursor: pointer; }
.lightbox-image { display: grid; place-items: center; min-height: 300px; max-height: 67vh; overflow: hidden; border-radius: 16px; background: color-mix(in srgb, var(--surface) 86%, #ffffff); box-shadow: var(--shadow-soft); }
.lightbox-image img { display: block; max-width: 100%; max-height: 67vh; object-fit: contain; }
.lightbox-footer { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 18px 4px 0; }
.lightbox-footer p { max-width: 620px; margin: 0; color: var(--muted); font-size: 13px; }
.lightbox-footer > div { display: flex; align-items: center; gap: 11px; flex: none; }
.lightbox-footer span { color: var(--muted); font-size: 12px; }
@media (max-width: 780px) { .gallery-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .result-card.featured { grid-column: span 2; } }
@media (max-width: 520px) { .gallery-grid { grid-template-columns: 1fr; } .result-card.featured { grid-column: auto; } .lightbox-footer { align-items: flex-start; flex-direction: column; } .lightbox-header h3 { font-size: 17px; } }
</style>
