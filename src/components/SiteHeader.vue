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
        <RouterLink to="/updates"><GlassIcon name="clock" :size="16" /><span>Updates</span></RouterLink>
      </nav>
      <div class="header-actions">
        <PreferenceControls class="desktop-preferences" />
        <RouterLink to="/download" class="header-download"><GlassIcon name="download" :size="18" /><span>{{ t('nav.download') }}</span></RouterLink>
        <button class="mobile-menu-button" type="button" :aria-label="t('nav.menu')" :aria-expanded="drawer" aria-controls="mobile-navigation" @click="drawer = true"><GlassIcon name="menu" :size="23" /></button>
      </div>
    </div>
    <el-drawer v-model="drawer" direction="rtl" :size="drawerSize" :with-header="false" class="mobile-drawer" append-to-body>
      <div class="drawer-heading">
        <div class="drawer-brand">
          <span class="drawer-brand-mark"><img :src="`${base}assets/images/logo-mark.png`" alt="" /></span>
          <span><strong>OmicsSuite</strong><small>Explore your omics workflow</small></span>
        </div>
        <button class="drawer-close" type="button" :aria-label="t('common.close')" @click="drawer = false"><GlassIcon name="x" :size="20" /></button>
      </div>
      <nav id="mobile-navigation" class="mobile-nav" :aria-label="t('nav.menu')">
        <RouterLink to="/" @click="drawer = false"><span class="nav-icon"><GlassIcon name="house" :size="20" /></span><span class="nav-label">{{ t('nav.home') }}</span><GlassIcon name="arrow-right" :size="17" class="nav-arrow" /></RouterLink>
        <RouterLink to="/documents" @click="drawer = false"><span class="nav-icon"><GlassIcon name="book-open" :size="20" /></span><span class="nav-label">{{ t('nav.docs') }}</span><GlassIcon name="arrow-right" :size="17" class="nav-arrow" /></RouterLink>
        <RouterLink to="/publication" @click="drawer = false"><span class="nav-icon"><GlassIcon name="award" :size="20" /></span><span class="nav-label">{{ t('nav.publication') }}</span><GlassIcon name="arrow-right" :size="17" class="nav-arrow" /></RouterLink>
        <RouterLink to="/updates" @click="drawer = false"><span class="nav-icon"><GlassIcon name="clock" :size="20" /></span><span class="nav-label">Updates</span><GlassIcon name="arrow-right" :size="17" class="nav-arrow" /></RouterLink>
        <RouterLink to="/download" class="download-nav-link" @click="drawer = false"><span class="nav-icon"><GlassIcon name="download" :size="20" /></span><span class="nav-label">{{ t('nav.download') }}</span><GlassIcon name="arrow-right" :size="17" class="nav-arrow" /></RouterLink>
      </nav>
      <div class="drawer-preferences"><span class="drawer-section-title">PREFERENCES</span><PreferenceControls /></div>
      <a class="drawer-github" href="https://github.com/OmicsSuite/" target="_blank" rel="noreferrer"><span class="github-icon"><GlassIcon name="github" :size="19" /></span><span>{{ t('common.github') }}</span><GlassIcon name="external-link" :size="16" class="github-arrow" /></a>
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
.mobile-menu-button { display: none; place-items: center; width: 42px; height: 42px; border: 1px solid var(--border); border-radius: 14px; color: var(--ink); background: color-mix(in srgb, var(--surface) 88%, var(--accent)); box-shadow: 0 5px 16px color-mix(in srgb, var(--ink) 8%, transparent); cursor: pointer; transition: transform .3s var(--ease-soft), color .3s, border-color .3s, box-shadow .3s; }
.mobile-menu-button:hover { color: var(--accent); border-color: color-mix(in srgb, var(--accent) 40%, var(--border)); box-shadow: 0 8px 20px color-mix(in srgb, var(--accent) 13%, transparent); transform: translateY(-1px); }
.mobile-menu-button:active { transform: scale(.96); }
.drawer-heading { display: flex; align-items: center; justify-content: space-between; gap: 18px; margin: 0 0 28px; padding-bottom: 22px; border-bottom: 1px solid var(--border); }
.drawer-brand { display: flex; align-items: center; gap: 12px; min-width: 0; }
.drawer-brand-mark { display: grid; place-items: center; flex: none; width: 46px; height: 46px; padding: 5px; border: 1px solid color-mix(in srgb, var(--accent) 22%, var(--border)); border-radius: 15px; background: color-mix(in srgb, var(--accent) 8%, var(--surface)); box-shadow: 0 8px 22px color-mix(in srgb, var(--accent) 12%, transparent); }
.drawer-brand-mark img { display: block; width: 100%; height: 100%; object-fit: contain; }
.drawer-brand > span:last-child { display: grid; gap: 3px; }
.drawer-brand strong { color: var(--ink); font-size: 16px; letter-spacing: -.02em; }
.drawer-brand small { color: var(--muted); font-size: 11px; }
.drawer-close { display: grid; place-items: center; flex: none; width: 40px; height: 40px; border: 1px solid var(--border); border-radius: 13px; color: var(--muted); background: var(--surface-2); cursor: pointer; transition: color .25s, background .25s, transform .25s; }
.drawer-close:hover { color: var(--accent); background: color-mix(in srgb, var(--accent) 9%, var(--surface)); transform: rotate(4deg); }
.mobile-nav { display: grid; gap: 9px; }
.mobile-nav a { display: grid; grid-template-columns: 46px minmax(0, 1fr) 20px; align-items: center; gap: 12px; min-height: 62px; padding: 7px 13px 7px 8px; border: 1px solid var(--border); border-radius: 17px; color: var(--ink); background: color-mix(in srgb, var(--surface) 92%, transparent); font-weight: 650; text-decoration: none; box-shadow: 0 5px 16px color-mix(in srgb, var(--ink) 4%, transparent); transition: color .3s var(--ease-soft), background .3s var(--ease-soft), border-color .3s var(--ease-soft), transform .3s var(--ease-soft), box-shadow .3s var(--ease-soft); }
.nav-icon { display: grid; place-items: center; width: 44px; height: 44px; border: 1px solid color-mix(in srgb, var(--accent) 12%, var(--border)); border-radius: 14px; color: var(--accent); background: color-mix(in srgb, var(--accent) 8%, var(--surface-2)); transition: color .3s, background .3s, transform .3s; }
.nav-label { font-size: 14px; }
.nav-arrow { color: var(--muted); opacity: .45; transition: opacity .3s, transform .3s, color .3s; }
.mobile-nav a:hover { border-color: color-mix(in srgb, var(--accent) 28%, var(--border)); color: var(--accent); background: color-mix(in srgb, var(--accent) 7%, var(--surface)); box-shadow: 0 10px 25px color-mix(in srgb, var(--accent) 10%, transparent); transform: translateX(-3px); }
.mobile-nav a:hover .nav-icon, .mobile-nav a.router-link-exact-active .nav-icon { color: var(--button-text); background: var(--accent); transform: scale(1.03); }
.mobile-nav a:hover .nav-arrow, .mobile-nav a.router-link-exact-active .nav-arrow { color: var(--accent); opacity: 1; transform: translateX(-2px); }
.mobile-nav a.router-link-exact-active { color: var(--accent); border-color: color-mix(in srgb, var(--accent) 30%, var(--border)); background: color-mix(in srgb, var(--accent) 8%, var(--surface)); box-shadow: inset 3px 0 0 var(--accent), 0 8px 22px color-mix(in srgb, var(--accent) 9%, transparent); }
.mobile-nav a.download-nav-link { margin-top: 5px; border-color: color-mix(in srgb, var(--accent) 24%, var(--border)); background: linear-gradient(110deg, color-mix(in srgb, var(--accent) 11%, var(--surface)), var(--surface)); }
.drawer-preferences { display: grid; gap: 12px; margin-top: 27px; padding-top: 22px; border-top: 1px solid var(--border); }
.drawer-section-title { color: var(--muted); font-size: 10px; font-weight: 750; letter-spacing: .14em; }
.drawer-preferences :deep(.preference-controls) { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }
.drawer-preferences :deep(.el-dropdown) { min-width: 0; }
.drawer-preferences :deep(.pref-trigger) { justify-content: flex-start; width: 100%; height: 44px; padding-inline: 12px; border-radius: 13px; }
.drawer-preferences :deep(.pref-label) { display: inline; }
.drawer-github { display: flex; align-items: center; gap: 11px; min-height: 52px; margin-top: 21px; padding: 0 9px; border: 1px solid transparent; border-radius: 14px; color: var(--muted); text-decoration: none; transition: color .25s, background .25s, border-color .25s; }
.drawer-github:hover { color: var(--accent); border-color: var(--border); background: color-mix(in srgb, var(--surface-2) 80%, transparent); }
.github-icon { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 11px; color: var(--ink); background: var(--surface-2); }
.drawer-github :deep(.github-arrow) { margin-left: auto; opacity: .6; }
:global(.mobile-drawer.el-drawer) { border-left: 1px solid var(--border); background: linear-gradient(155deg, color-mix(in srgb, var(--surface) 98%, var(--accent)), var(--surface) 58%, color-mix(in srgb, var(--surface-2) 86%, var(--accent))); }
:global(.mobile-drawer .el-drawer__body) { padding: 26px clamp(20px, 5vw, 30px) max(28px, env(safe-area-inset-bottom)); }
@media (max-width: 1060px) { .desktop-nav { gap: 0; } .desktop-nav a { padding: 0 10px; font-size: 12px; } }
@media (max-width: 920px) { .desktop-nav, .desktop-preferences { display: none; } .mobile-menu-button { display: grid; } }
@media (max-width: 560px) { .site-header { height: 66px; } .brand-word { font-size: 19px; } .brand-mark { width: 36px; height: 36px; border-radius: 12px; } .header-actions { gap: 7px; } .header-download { display: none; } :global(.mobile-drawer.el-drawer) { width: 100% !important; max-width: 440px; } :global(.mobile-drawer .el-drawer__body) { padding-top: max(22px, env(safe-area-inset-top)); } }
</style>
