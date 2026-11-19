<template>
  <footer class="site-footer">
    <div class="container footer-main">
      <div class="footer-brand">
        <span class="footer-eyebrow"><GlassIcon name="sparkles" :size="15" />{{ t('footer.eyebrow') }}</span>
        <RouterLink to="/" class="brand"><span class="brand-mark"><img :src="`${base}assets/images/logo-mark.png`" alt="OmicsSuite" /></span><span>OmicsSuite</span></RouterLink>
        <p>{{ t('footer.tagline') }}</p>
        <div class="footer-badges">
          <a class="footer-chip" :href="links.paper" target="_blank" rel="noreferrer"><GlassIcon name="quote" :size="15" />{{ t('footer.cite') }}</a>
          <RouterLink class="footer-chip" to="/download"><GlassIcon name="download" :size="15" />{{ t('footer.version') }}</RouterLink>
        </div>
        <span class="footer-note"><GlassIcon name="shield-check" :size="15" />{{ t('footer.note') }}</span>
      </div>

      <nav class="footer-nav" :aria-label="t('footer.menu')">
        <div v-for="group in groups" :key="group.title" class="footer-column">
          <h3><GlassIcon :name="group.icon" :size="18" />{{ group.title }}</h3>
          <component
            :is="link.to ? RouterLink : 'a'"
            v-for="link in group.links"
            :key="link.label"
            :to="link.to"
            :href="link.href"
            :target="link.href ? '_blank' : undefined"
            :rel="link.href ? 'noreferrer' : undefined"
            class="footer-link"
          >
            <span class="link-icon"><GlassIcon :name="link.icon" :size="21" /></span>
            <span class="link-copy"><strong>{{ link.label }}</strong><em>{{ link.desc }}</em></span>
            <GlassIcon :name="link.href ? 'arrow-up-right' : 'arrow-right'" :size="15" class="link-arrow" />
          </component>
        </div>
      </nav>
    </div>

    <div class="container footer-bottom">
      <span>© {{ year }} {{ t('footer.rights') }}</span>
      <a class="footer-credit" href="https://thesvg.org/ui" target="_blank" rel="noreferrer"><GlassIcon name="sparkles" :size="14" />{{ t('footer.iconsCredit') }}<GlassIcon name="external-link" :size="13" /></a>
      <button class="footer-top" type="button" @click="toTop"><GlassIcon name="arrow-up" :size="15" />{{ t('action.top') }}</button>
    </div>
  </footer>
</template>
<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import GlassIcon from './GlassIcon.vue'
import { useI18n } from '../i18n.js'
const { t } = useI18n(); const year = new Date().getFullYear()
const base = import.meta.env.BASE_URL

const links = {
  paper: 'https://doi.org/10.1093/hr/uhad195',
  datasets: 'https://github.com/OmicsSuite/Datasets/',
  courses: 'https://space.bilibili.com/34105515_',
  releases: 'https://github.com/OmicsSuite/OmicsSuite.github.io/releases',
  github: 'https://github.com/OmicsSuite/',
  issues: 'https://github.com/OmicsSuite/OmicsSuite.github.io/issues',
}

const groups = computed(() => [
  {
    title: t('footer.product'), icon: 'layers', links: [
      { to: '/download', icon: 'download', label: t('nav.download'), desc: t('footer.downloadDesc') },
      { to: '/documents', icon: 'book-open-text', label: t('nav.docs'), desc: t('footer.docsDesc') },
      { to: '/publication', icon: 'newspaper', label: t('nav.publication'), desc: t('footer.publicationDesc') },
    ],
  },
  {
    title: t('footer.resources'), icon: 'database', links: [
      { href: links.datasets, icon: 'database', label: t('footer.datasets'), desc: t('footer.datasetsDesc') },
      { href: links.courses, icon: 'play', label: t('footer.courses'), desc: t('footer.coursesDesc') },
      { href: links.releases, icon: 'release-tag', label: t('footer.updates'), desc: t('footer.updatesDesc') },
    ],
  },
  {
    title: t('footer.community'), icon: 'users', links: [
      { href: links.github, icon: 'github', label: t('common.github'), desc: t('footer.githubDesc') },
      { href: links.issues, icon: 'message-circle', label: t('footer.issues'), desc: t('footer.issuesDesc') },
      { href: links.paper, icon: 'newspaper', label: t('footer.paper'), desc: t('footer.paperDesc') },
    ],
  },
])

function toTop() { window.scrollTo({ top: 0, behavior: 'smooth' }) }
</script>
<style scoped>
.site-footer { position: relative; overflow: hidden; margin-top: 0; background: var(--footer-bg); color: var(--footer-ink); isolation: isolate; }
.site-footer::before { content: ''; position: absolute; inset: 0; z-index: 0; pointer-events: none; background: radial-gradient(86% 120% at 12% 0%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 62%), linear-gradient(180deg, color-mix(in srgb, var(--accent) 5%, var(--footer-bg)), var(--footer-bg) 44%); }
.site-footer::after { content: ''; position: absolute; top: 0; right: 0; left: 0; z-index: 0; height: 1px; background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 55%, transparent), transparent); }
.footer-main { position: relative; z-index: 1; display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 2.1fr); gap: clamp(48px, 7vw, 96px); padding-block: 72px 52px; }
.footer-brand { max-width: 360px; }
.footer-eyebrow { display: inline-flex; align-items: center; gap: 7px; margin-bottom: 18px; color: var(--footer-accent); font-size: 10.5px; font-weight: 650; letter-spacing: .14em; text-transform: uppercase; }
.brand { display: inline-flex; align-items: center; gap: 11px; color: var(--footer-ink); font-size: 22px; font-weight: 760; text-decoration: none; }
.brand-mark { display: grid; place-items: center; width: 42px; height: 42px; border: 1px solid var(--footer-border); border-radius: 12px; background: color-mix(in srgb, var(--footer-ink) 5%, transparent); box-shadow: inset 0 1px 0 rgba(255,255,255,.08); }
.brand-mark img { display: block; width: 100%; height: 100%; border-radius: 12px; object-fit: contain; }
.footer-brand p { max-width: 330px; margin: 19px 0 22px; color: var(--footer-muted); line-height: 1.8; }
.footer-badges { display: flex; flex-wrap: wrap; gap: 8px; }
.footer-chip { display: inline-flex; align-items: center; gap: 7px; padding: 7px 10px 7px 8px; border: 1px solid var(--footer-border); border-radius: 999px; color: var(--footer-muted); background: color-mix(in srgb, var(--footer-ink) 4%, transparent); font-size: 11px; text-decoration: none; transition: color .3s var(--ease-soft), border-color .3s var(--ease-soft), background .3s var(--ease-soft), transform .3s var(--ease-soft); }
.footer-chip:hover { color: var(--footer-ink); border-color: color-mix(in srgb, var(--accent) 48%, transparent); background: color-mix(in srgb, var(--accent) 13%, transparent); transform: translateY(-2px); }
.footer-note { display: flex; align-items: center; gap: 7px; margin-top: 20px; color: var(--footer-muted); font-size: 10px; letter-spacing: .055em; text-transform: uppercase; }
.footer-nav { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 30px; }
.footer-column { display: flex; min-width: 0; flex-direction: column; }
.footer-column h3 { display: flex; align-items: center; gap: 8px; margin: 0 0 8px; padding-bottom: 12px; border-bottom: 1px solid var(--footer-border); color: var(--footer-ink); font-size: 11px; font-weight: 650; letter-spacing: .1em; text-transform: uppercase; }
.footer-column h3 :deep(.glass-icon) { color: var(--footer-accent); }
.footer-link { display: grid; grid-template-columns: 36px minmax(0, 1fr) 16px; align-items: center; gap: 11px; margin: 0 -8px; padding: 8px 8px 8px 6px; border-radius: 11px; color: var(--footer-muted); text-decoration: none; transition: color .3s var(--ease-soft), background .3s var(--ease-soft), transform .3s var(--ease-soft); }
.footer-link:hover { color: var(--footer-ink); background: color-mix(in srgb, var(--footer-ink) 5%, transparent); transform: translateX(3px); }
.link-icon { display: grid; place-items: center; width: 36px; height: 36px; border: 1px solid var(--footer-border); border-radius: 10px; color: var(--footer-accent); background: linear-gradient(145deg, color-mix(in srgb, var(--footer-ink) 8%, transparent), transparent 68%); box-shadow: inset 0 1px 0 rgba(255,255,255,.07); transition: border-color .3s var(--ease-soft), background .3s var(--ease-soft), color .3s var(--ease-soft), transform .3s var(--ease-soft); }
.footer-link:hover .link-icon { border-color: color-mix(in srgb, var(--accent) 50%, transparent); color: var(--footer-ink); background: color-mix(in srgb, var(--accent) 18%, transparent); transform: translateY(-1px) scale(1.035); }
.link-copy { min-width: 0; }
.link-copy strong { display: block; color: var(--footer-ink); font-size: 12.5px; font-weight: 620; line-height: 1.35; transition: color .3s var(--ease-soft); }
.link-copy em { display: block; margin-top: 2px; color: var(--footer-muted); font-size: 10.5px; font-style: normal; line-height: 1.45; }
.footer-link:hover .link-copy strong { color: var(--footer-accent); }
.link-arrow { color: var(--footer-muted); opacity: .5; transition: color .3s var(--ease-soft), opacity .3s var(--ease-soft), transform .3s var(--ease-soft); }
.footer-link:hover .link-arrow { color: var(--footer-accent); opacity: 1; transform: translate(1px, -1px); }
.footer-bottom { position: relative; z-index: 1; display: flex; align-items: center; justify-content: space-between; gap: 18px; padding-block: 20px 24px; border-top: 1px solid var(--footer-border); color: var(--footer-muted); font-size: 11px; }
.footer-credit { display: inline-flex; align-items: center; gap: 6px; color: var(--footer-muted); text-decoration: none; transition: color .3s var(--ease-soft); }
.footer-credit:hover { color: var(--footer-accent); }
.footer-top { display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; border: 1px solid var(--footer-border); border-radius: 999px; color: var(--footer-muted); background: transparent; font: inherit; cursor: pointer; transition: color .3s var(--ease-soft), border-color .3s var(--ease-soft), transform .3s var(--ease-soft); }
.footer-top:hover { color: var(--footer-ink); border-color: color-mix(in srgb, var(--accent) 46%, transparent); transform: translateY(-2px); }
@media (min-width: 521px) { .footer-top { display: none; } }
@media (max-width: 1080px) { .footer-main { grid-template-columns: 1fr; gap: 44px; padding-block: 60px 44px; } .footer-brand { max-width: 560px; } }
@media (max-width: 820px) { .footer-nav { grid-template-columns: 1fr 1fr; gap: 28px; } .footer-column:last-child { grid-column: 1 / -1; } }
@media (max-width: 520px) { .site-footer { margin-top: 0; } .footer-main { gap: 34px; padding-block: 48px 34px; } .footer-nav { grid-template-columns: 1fr; } .footer-column:last-child { grid-column: auto; } .footer-bottom { flex-direction: column; align-items: flex-start; gap: 10px; } }
</style>
