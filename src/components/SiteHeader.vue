<template>
  <header class="site-header" :class="{ scrolled }">
    <div class="scroll-progress" :style="{ transform: `scaleX(${progress})` }"></div>
    <div class="header-inner container">
      <RouterLink to="/" class="brand" aria-label="OmicsSuite Home">
        <span class="brand-mark"><img :src="`${base}assets/images/logo-mark.png`" alt="OmicsSuite" /></span>
        <span class="brand-word">Omics<span>Suite</span></span>
      </RouterLink>
      <nav class="desktop-nav" :aria-label="t('nav.menu')">
        <RouterLink to="/"><GlassIcon name="house" :size="16" /><span>{{ t('nav.home') }}</span></RouterLink>
        <RouterLink to="/documents"><GlassIcon name="book-open" :size="16" /><span>{{ t('nav.docs') }}</span></RouterLink>
        <RouterLink to="/publication"><GlassIcon name="award" :size="16" /><span>{{ t('nav.publication') }}</span></RouterLink>
      </nav>
      <div class="header-actions">
        <PreferenceControls class="desktop-preferences" />
        <RouterLink to="/download" class="header-download"><GlassIcon name="download" :size="18" /><span>{{ t('nav.download') }}</span></RouterLink>
        <button class="mobile-menu-button" type="button" :aria-label="t('nav.menu')" @click="drawer = true"><GlassIcon name="menu" :size="23" /></button>
      </div>
    </div>
    <el-drawer v-model="drawer" direction="rtl" :size="drawerSize" :title="t('nav.menu')" class="mobile-drawer" append-to-body>
      <nav class="mobile-nav">
        <RouterLink to="/" @click="drawer = false"><GlassIcon name="house" :size="20" />{{ t('nav.home') }}</RouterLink>
        
        
        <RouterLink to="/documents" @click="drawer = false"><GlassIcon name="book-open" :size="20" />{{ t('nav.docs') }}</RouterLink>
        <RouterLink to="/publication" @click="drawer = false"><GlassIcon name="award" :size="20" />{{ t('nav.publication') }}</RouterLink>
        <RouterLink to="/download" @click="drawer = false"><GlassIcon name="download" :size="20" />{{ t('nav.download') }}</RouterLink>
      </nav>
      <div class="drawer-preferences"><PreferenceControls /></div>
      <a class="drawer-github" href="https://github.com/OmicsSuite/" target="_blank" rel="noreferrer"><GlassIcon name="github" :size="21" />{{ t('common.github') }}<GlassIcon name="external-link" :size="16" /></a>
    </el-drawer>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import GlassIcon from './GlassIcon.vue'
import PreferenceControls from './PreferenceControls.vue'
import { useI18n } from '../i18n.js'
const { t } = useI18n()
const route = useRoute()
const base = import.meta.env.BASE_URL
const drawer = ref(false)
const scrolled = ref(false)
const progress = ref(0)
const drawerSize = ref('340px')
function onScroll() {
  scrolled.value = window.scrollY > 18
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0
}
function onResize() { drawerSize.value = window.innerWidth < 560 ? '100%' : '340px' }
watch(() => route.fullPath, () => { drawer.value = false })
onMounted(() => { onScroll(); onResize(); window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onResize) })
onUnmounted(() => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize) })
</script>

<style scoped>
.site-header { position: sticky; top: 0; z-index: 100; height: 76px; border-bottom: 1px solid transparent; background: color-mix(in srgb, var(--bg) 78%, transparent); backdrop-filter: blur(18px) saturate(1.4); transition: height .25s, border-color .25s, box-shadow .25s; }
.site-header.scrolled { height: 66px; border-color: var(--border); box-shadow: 0 8px 30px rgba(16, 48, 39, .05); }
.scroll-progress { position: absolute; inset: 0 0 auto; height: 2px; background: var(--accent); transform-origin: left; }
.header-inner { height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.brand { display: inline-flex; align-items: center; gap: 10px; color: var(--ink); text-decoration: none; flex: none; }
.brand-mark { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 12px; background: transparent; filter: drop-shadow(0 6px 16px color-mix(in srgb, var(--accent) 30%, transparent)); transition: transform .32s cubic-bezier(.2,.8,.2,1); }
.brand-mark img { display: block; width: 100%; height: 100%; border-radius: 12px; object-fit: contain; }
.brand:hover .brand-mark { transform: translateY(-2px) rotate(-3deg); }
.brand-word { font-size: 21px; font-weight: 780; letter-spacing: -.7px; }
.brand-word span { color: var(--accent); }
.desktop-nav { display: flex; align-items: center; gap: 2px; margin-left: auto; padding: 4px; border: 1px solid color-mix(in srgb, var(--border) 82%, transparent); border-radius: 999px; background: color-mix(in srgb, var(--surface) 72%, transparent); box-shadow: inset 0 1px 0 #ffffffb8, 0 6px 18px color-mix(in srgb, var(--ink) 5%, transparent); backdrop-filter: blur(16px) saturate(1.3); }
.desktop-nav a { display: inline-flex; align-items: center; gap: 6px; height: 34px; padding: 0 14px; border: 1px solid transparent; border-radius: 999px; color: var(--muted); font-size: 12.5px; font-weight: 640; text-decoration: none; white-space: nowrap; transition: color .45s var(--ease-soft), background .45s var(--ease-soft), border-color .45s var(--ease-soft), transform .45s var(--ease-soft), box-shadow .45s var(--ease-soft); }
.desktop-nav a span { line-height: 1; }
.desktop-nav a:hover { color: var(--ink); background: color-mix(in srgb, var(--accent) 7%, var(--surface)); border-color: color-mix(in srgb, var(--accent) 16%, var(--border)); transform: translateY(-1px); }
.desktop-nav a.router-link-exact-active { color: var(--accent); background: color-mix(in srgb, var(--accent) 11%, var(--surface)); border-color: color-mix(in srgb, var(--accent) 26%, var(--border)); box-shadow: inset 0 1px 0 #ffffffd0, 0 3px 10px color-mix(in srgb, var(--accent) 14%, transparent); }
.desktop-nav a.router-link-exact-active :deep(.glass-icon) { opacity: 1; }
.desktop-nav a :deep(.glass-icon) { opacity: .78; transition: opacity .45s var(--ease-soft); }
.desktop-nav a:hover :deep(.glass-icon) { opacity: 1; }
.header-actions { display: flex; align-items: center; gap: 10px; }
.header-download { display: inline-flex; align-items: center; gap: 7px; height: 40px; padding: 0 16px; border: 1px solid color-mix(in srgb, var(--accent) 62%, #fff); border-radius: 999px; color: var(--button-text); background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 88%, #fff), var(--accent)); font-size: 12px; font-weight: 700; text-decoration: none; white-space: nowrap; box-shadow: inset 0 1px 0 #ffffff80, 0 8px 22px color-mix(in srgb, var(--accent) 24%, transparent); transition: transform .45s var(--ease-soft), box-shadow .45s var(--ease-soft), filter .45s var(--ease-soft); }
.header-download:hover { transform: translateY(-1px); filter: saturate(1.08); box-shadow: inset 0 1px 0 #ffffff90, 0 11px 26px color-mix(in srgb, var(--accent) 30%, transparent); }
.mobile-menu-button { display: none; place-items: center; width: 40px; height: 40px; border: 1px solid var(--border); border-radius: 12px; color: var(--ink); background: var(--surface); }
.mobile-nav { display: grid; gap: 6px; }
.mobile-nav a { display: flex; align-items: center; gap: 13px; min-height: 50px; padding: 0 14px; border: 1px solid transparent; border-radius: 14px; color: var(--ink); font-weight: 650; text-decoration: none; transition: background .3s var(--ease-soft), border-color .3s var(--ease-soft), transform .3s var(--ease-soft); }
.mobile-nav a:hover { background: color-mix(in srgb, var(--accent) 6%, var(--surface)); border-color: color-mix(in srgb, var(--accent) 18%, var(--border)); transform: translateX(3px); }
.mobile-nav a.router-link-exact-active { color: var(--accent); background: color-mix(in srgb, var(--accent) 9%, var(--surface)); border-color: color-mix(in srgb, var(--accent) 22%, var(--border)); }
.mobile-nav a:hover, .mobile-nav a.router-link-exact-active { color: var(--accent); background: color-mix(in srgb, var(--accent) 9%, transparent); }
.drawer-preferences { margin-top: 26px; padding-top: 22px; border-top: 1px solid var(--border); }
.drawer-github { display: flex; align-items: center; gap: 10px; margin-top: 24px; color: var(--muted); text-decoration: none; }
.drawer-github :deep(.glass-icon:last-child) { margin-left: auto; }
@media (max-width: 1060px) { .desktop-nav { gap: 0; } .desktop-nav a { padding: 0 10px; font-size: 12px; } }
@media (max-width: 920px) { .desktop-nav, .desktop-preferences { display: none; } .mobile-menu-button { display: grid; } }
@media (max-width: 560px) { .site-header { height: 66px; } .brand-word { font-size: 19px; } .brand-mark { width: 36px; height: 36px; border-radius: 12px; } .header-actions { gap: 7px; } .header-download { display: none; } }
</style>
