<template>
  <a class="skip-link" href="#main-content">{{ pick('跳至正文', 'Skip to content') }}</a>
  <SiteHeader />
  <main id="main-content">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in"><component :is="Component" /></Transition>
    </RouterView>
  </main>
  <SiteFooter />
  <el-backtop :right="24" :bottom="24" :visibility-height="650">
    <span class="backtop" :title="t('action.top')"><GlassIcon name="arrow-up" :size="20" /></span>
  </el-backtop>
</template>
<script setup>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import GlassIcon from './components/GlassIcon.vue'
import { useI18n } from './i18n.js'
const { t, pick } = useI18n()
</script>
<style scoped>
.backtop { display: grid; place-items: center; width: 44px; height: 44px; border: 1px solid var(--border); border-radius: 15px; color: var(--accent); background: var(--surface); box-shadow: var(--shadow); }
.backtop :deep(svg) { transform: none; }
.page-enter-active, .page-leave-active { transition: opacity .45s var(--ease-soft), transform .45s var(--ease-soft); }
.page-enter-from { opacity: 0; transform: translate3d(0, 10px, 0); }
.page-leave-to { opacity: 0; transform: translate3d(0, -6px, 0); }
</style>
