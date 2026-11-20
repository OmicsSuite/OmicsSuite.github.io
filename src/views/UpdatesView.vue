<template>
  <div class="updates-page container">
    <section class="updates-hero" v-reveal>
      <span class="updates-kicker"><GlassIcon name="clock" :size="17" /> RELEASE NOTES</span>
      <h1>A record of what changed.</h1>
      <p>Follow OmicsSuite from its first desktop prototype to the current cross-platform workspace. Browse releases by date, area, or keyword.</p>
      <div class="updates-meta">
        <span><strong>{{ releases.length - 1 }}</strong> archived versions</span>
        <span class="meta-divider"></span>
        <span>Apr 2022 — Jan 2024</span>
      </div>
    </section>

    <section class="current-release" v-reveal aria-labelledby="current-release-title">
      <div class="current-orbit" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="current-copy">
        <span class="current-kicker"><i></i> CURRENT RELEASE</span>
        <h2 id="current-release-title">OmicsSuite <span>v2.0.0</span></h2>
        <p>The current website release brings OmicsSuite to Windows, macOS, and Linux, with 181 analysis and visualization applications across 13 categories.</p>
        <div class="current-tags">
          <span class="platform-tag"><GlassIcon name="monitor" :size="16" />Windows</span>
          <span class="platform-tag"><Apple class="platform-brand-icon platform-brand-icon--apple" aria-hidden="true" />macOS</span>
          <span class="platform-tag"><GlassIcon name="terminal" :size="16" />Linux</span>
          <span class="platform-tag"><GlassIcon name="layout-grid" :size="15" />181 applications</span>
        </div>
        <div class="current-actions">
          <RouterLink to="/download" class="button button-primary"><GlassIcon name="download" :size="17" />Download v2.0.0</RouterLink>
          <a href="https://github.com/OmicsSuite/OmicsSuite.github.io/releases" target="_blank" rel="noreferrer" class="current-release-link">GitHub releases<GlassIcon name="external-link" :size="15" /></a>
        </div>
      </div>
      <div class="current-mark" aria-hidden="true"><GlassIcon name="layers" :size="39" /><span>v2.0.0</span></div>
    </section>

    <section class="history-section" aria-labelledby="history-title">
      <div class="history-heading">
        <div>
          <span class="history-eyebrow">THE ARCHIVE</span>
          <h2 id="history-title">Release history</h2>
        </div>
        <span class="history-count">{{ filteredReleases.length }} {{ filteredReleases.length === 1 ? 'release' : 'releases' }}</span>
      </div>

      <div class="history-tools">
        <div class="history-filters" role="group" aria-label="Filter release notes">
          <button v-for="filter in filters" :key="filter" type="button" :aria-pressed="activeFilter === filter" :class="{ active: activeFilter === filter }" @click="activeFilter = filter"><GlassIcon :name="filterIcon(filter)" :size="15" />{{ filter }}</button>
        </div>
        <label class="history-search">
          <GlassIcon name="search" :size="17" />
          <input v-model="query" type="search" placeholder="Search versions or changes" aria-label="Search versions or changes" />
          <button v-if="query" type="button" aria-label="Clear search" @click="query = ''"><GlassIcon name="x" :size="15" /></button>
        </label>
      </div>

      <ol v-if="filteredReleases.length" class="release-timeline">
        <li v-for="(release, index) in filteredReleases" :key="release.version" class="timeline-item">
          <span class="timeline-node" :class="{ latest: index === 0 }"><i></i></span>
          <article class="release-card" :class="{ expanded: index === 0 }">
            <details :open="index === 0">
              <summary>
                <span class="release-heading">
                  <span class="release-version"><GlassIcon name="git-branch" :size="17" />v{{ release.version }}</span>
                  <span v-if="release.version === '1.4.0'" class="latest-tag">LATEST ARCHIVED</span>
                </span>
                <span class="release-summary-meta"><time :datetime="release.date">{{ formatDate(release.date) }}</time><span class="release-change-count">{{ release.highlights.length }} updates</span><GlassIcon name="chevron-right" :size="17" class="release-chevron" /></span>
              </summary>
              <ul class="release-highlights">
                <li v-for="item in groupedHighlights(release)" :key="`${release.version}-${item.type}`">
                  <span class="change-type" :class="`type-${slug(item.type)}`"><GlassIcon :name="changeIcon(item.type)" :size="13" />{{ item.type }}</span>
                  <p>{{ item.text }}</p>
                </li>
              </ul>
            </details>
          </article>
        </li>
      </ol>
      <div v-else class="history-empty"><GlassIcon name="file-search" :size="24" /><strong>No matching releases</strong><span>Try another keyword or filter.</span></div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import GlassIcon from '../components/GlassIcon.vue'
import { Apple } from '@thesvg/vue'
import { releases } from '../data/releases.js'

const filters = ['All', 'NewApps', 'Features', 'FixBugs']
const activeFilter = ref('All')
const query = ref('')
const filteredReleases = computed(() => {
  const term = query.value.trim().toLowerCase()
  return releases.filter((release) => {
    if (release.current) return false
    const matchesType = activeFilter.value === 'All' || release.highlights.some((item) => changeGroup(item.type) === activeFilter.value)
    const searchable = `${release.version} ${release.date || ''} ${release.highlights.map((item) => `${changeGroup(item.type)} ${item.text}`).join(' ')}`.toLowerCase()
    return matchesType && (!term || searchable.includes(term))
  })
})
function formatDate(value) {
  if (!value) return 'Current release'
  return new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`))
}
function changeGroup(type) {
  if (type === 'Apps' || type === 'NewApps') return 'NewApps'
  if (type === 'Fixes' || type === 'FixBugs') return 'FixBugs'
  return 'Features'
}
function changeIcon(type) {
  const group = changeGroup(type)
  if (group === 'NewApps') return 'package'
  if (group === 'FixBugs') return 'bug'
  return 'sparkles'
}
function groupedHighlights(release) {
  const groups = new Map()
  for (const item of release.highlights) {
    const type = changeGroup(item.type)
    const current = groups.get(type)
    if (current) current.text += `; ${item.text}`
    else groups.set(type, { type, text: item.text })
  }
  return [...groups.values()]
}
function filterIcon(type) {
  if (type === 'NewApps') return 'package'
  if (type === 'FixBugs') return 'bug'
  if (type === 'Features') return 'sparkles'
  return 'layers'
}
function slug(value) { return value.toLowerCase().replace(/[^a-z0-9]+/g, '-') }
</script>

<style scoped>
.updates-page { padding-top: 78px; padding-bottom: 110px; }
.updates-hero { max-width: 850px; margin: 0 auto 44px; text-align: center; }
.updates-kicker { display: inline-flex; align-items: center; gap: 8px; padding: 7px 12px; border: 1px solid color-mix(in srgb, var(--accent) 22%, var(--border)); border-radius: 999px; color: var(--accent); background: color-mix(in srgb, var(--accent) 7%, var(--surface)); font-size: 10px; font-weight: 750; letter-spacing: .13em; }
.updates-hero h1 { margin: 20px 0 14px; color: var(--ink); font-size: clamp(38px, 5.2vw, 62px); font-weight: 750; letter-spacing: -.055em; line-height: 1.08; }
.updates-hero > p { max-width: 670px; margin: 0 auto; color: var(--muted); font-size: 15px; line-height: 1.85; }
.updates-meta { display: flex; align-items: center; justify-content: center; gap: 13px; margin-top: 20px; color: var(--muted); font-size: 11px; letter-spacing: .03em; }
.updates-meta strong { color: var(--ink); font-size: 13px; }
.meta-divider { width: 4px; height: 4px; border-radius: 50%; background: var(--accent); }
.current-release { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 34px; min-height: 260px; padding: clamp(28px, 5vw, 56px); overflow: hidden; border: 1px solid color-mix(in srgb, var(--accent) 30%, var(--border)); border-radius: 28px; color: var(--ink); background: linear-gradient(118deg, color-mix(in srgb, var(--accent) 11%, var(--surface)), var(--surface) 54%, color-mix(in srgb, var(--accent) 5%, var(--surface-2))); box-shadow: var(--shadow-soft); isolation: isolate; }
.current-copy { position: relative; z-index: 2; max-width: 720px; }
.current-kicker { display: inline-flex; align-items: center; gap: 8px; color: var(--accent); font-size: 10px; font-weight: 760; letter-spacing: .14em; }
.current-kicker i { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 5px color-mix(in srgb, var(--accent) 14%, transparent); }
.current-copy h2 { margin: 13px 0 9px; color: var(--ink); font-size: clamp(27px, 3.5vw, 40px); line-height: 1.2; letter-spacing: -.04em; }
.current-copy h2 span { color: var(--accent); }
.current-copy > p { max-width: 680px; margin: 0; color: var(--muted); font-size: 13px; line-height: 1.8; }
.current-tags { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 17px; }
.current-tags span { display: inline-flex; align-items: center; gap: 6px; padding: 5px 9px; border: 1px solid var(--border); border-radius: 999px; color: var(--muted); background: color-mix(in srgb, var(--surface) 80%, transparent); font-size: 10px; font-weight: 650; }
.platform-tag { transition: color .25s var(--ease-soft), border-color .25s var(--ease-soft), background .25s var(--ease-soft), transform .25s var(--ease-soft); }
.platform-tag:hover { color: var(--ink) !important; border-color: color-mix(in srgb, var(--accent) 38%, var(--border)) !important; background: color-mix(in srgb, var(--accent) 7%, var(--surface)) !important; transform: translateY(-2px); }
.platform-brand-icon { display: block; width: 16px; height: 16px; flex: none; }
.platform-tag:hover :deep(svg) { transform: scale(1.12) rotate(-4deg); }
.platform-tag :deep(svg) { transition: transform .3s var(--ease-soft); }
.platform-brand-icon--apple { box-sizing: border-box; padding: 3px; border-radius: 50%; background: #2a302e; }
.platform-tag :deep(.glass-icon) { color: var(--accent); }
.current-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 16px; margin-top: 22px; }
.current-actions .button { min-height: 42px; border-radius: 12px; }
.current-release-link { display: inline-flex; align-items: center; gap: 7px; color: var(--muted); font-size: 11px; font-weight: 650; text-decoration: none; transition: color .2s; }
.current-release-link:hover { color: var(--accent); }
.current-mark { position: relative; z-index: 1; display: grid; place-items: center; flex: none; width: 148px; height: 148px; border: 1px solid color-mix(in srgb, var(--accent) 24%, var(--border)); border-radius: 42px; color: var(--accent); background: color-mix(in srgb, var(--surface) 56%, transparent); box-shadow: inset 0 1px 0 color-mix(in srgb, #ffffff 70%, transparent), 0 28px 60px color-mix(in srgb, var(--accent) 16%, transparent); transform: rotate(8deg); backdrop-filter: blur(12px); }
.current-mark .glass-icon { position: absolute; top: 20px; right: 20px; opacity: .7; }
.current-mark span { font-size: 30px; font-weight: 780; letter-spacing: -.07em; white-space: nowrap; }
.current-orbit { position: absolute; z-index: 0; top: -110px; right: -85px; width: 350px; height: 350px; border: 1px solid color-mix(in srgb, var(--accent) 12%, transparent); border-radius: 50%; }
.current-orbit::before, .current-orbit::after { content: ''; position: absolute; inset: 22px; border: 1px solid color-mix(in srgb, var(--accent) 9%, transparent); border-radius: 50%; }
.current-orbit::after { inset: 52px; }
.current-orbit span { position: absolute; width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 7px color-mix(in srgb, var(--accent) 10%, transparent); }
.current-orbit span:nth-child(1) { top: 52px; left: 58px; }.current-orbit span:nth-child(2) { right: 38px; top: 180px; width: 5px; height: 5px; }.current-orbit span:nth-child(3) { bottom: 28px; left: 130px; width: 6px; height: 6px; }
.history-section { max-width: 980px; margin: 96px auto 0; }
.history-heading { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 22px; }
.history-eyebrow { color: var(--accent); font-size: 10px; font-weight: 750; letter-spacing: .14em; }
.history-heading h2 { margin: 7px 0 0; color: var(--ink); font-size: clamp(26px, 3vw, 35px); letter-spacing: -.04em; }
.history-count { padding: 6px 10px; border: 1px solid var(--border); border-radius: 999px; color: var(--muted); background: var(--surface); font-size: 10px; }
.history-tools { display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-bottom: 26px; }
.history-filters { display: flex; gap: 6px; overflow-x: auto; padding: 2px 1px 6px; scrollbar-width: none; }.history-filters::-webkit-scrollbar { display: none; }
.history-filters button { display: inline-flex; align-items: center; justify-content: center; gap: 7px; flex: none; min-height: 34px; padding: 0 12px; border: 1px solid var(--border); border-radius: 999px; color: var(--muted); background: var(--surface); font: inherit; font-size: 10.5px; font-weight: 650; cursor: pointer; transition: color .25s, background .25s, border-color .25s, transform .25s var(--ease-soft); }
.history-filters button:hover { transform: translateY(-1px); }
.history-filters button :deep(.glass-icon) { color: currentColor; }
.history-filters button:hover, .history-filters button.active { color: var(--accent); border-color: color-mix(in srgb, var(--accent) 35%, var(--border)); background: color-mix(in srgb, var(--accent) 8%, var(--surface)); }
.history-search { display: flex; align-items: center; gap: 8px; flex: 0 1 270px; min-width: 190px; height: 38px; padding: 0 11px; border: 1px solid var(--border); border-radius: 12px; color: var(--muted); background: var(--surface); box-shadow: 0 4px 14px color-mix(in srgb, var(--ink) 4%, transparent); }
.history-search:focus-within { border-color: color-mix(in srgb, var(--accent) 50%, var(--border)); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 11%, transparent); }
.history-search input { width: 100%; min-width: 0; border: 0; outline: 0; color: var(--ink); background: transparent; font: inherit; font-size: 11px; }.history-search input::placeholder { color: var(--muted); opacity: .8; }
.history-search button { display: grid; place-items: center; flex: none; width: 24px; height: 24px; border: 0; border-radius: 7px; color: var(--muted); background: var(--surface-2); cursor: pointer; }
.release-timeline { position: relative; display: grid; gap: 14px; margin: 0; padding: 0 0 0 24px; list-style: none; }
.release-timeline::before { content: ''; position: absolute; top: 8px; bottom: 22px; left: 7px; width: 1px; background: linear-gradient(var(--accent), var(--border) 18%, var(--border)); }
.timeline-item { position: relative; min-width: 0; }
.timeline-node { position: absolute; top: 23px; left: -22px; display: grid; place-items: center; width: 14px; height: 14px; border: 1px solid var(--border); border-radius: 50%; background: var(--bg); }
.timeline-node i { width: 5px; height: 5px; border-radius: 50%; background: var(--muted); opacity: .65; }.timeline-node.latest { border-color: color-mix(in srgb, var(--accent) 50%, var(--border)); }.timeline-node.latest i { background: var(--accent); opacity: 1; box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 13%, transparent); }
.release-card { overflow: hidden; border: 1px solid var(--border); border-radius: 17px; background: color-mix(in srgb, var(--surface) 94%, transparent); box-shadow: 0 8px 24px color-mix(in srgb, var(--ink) 5%, transparent); transition: border-color .25s, box-shadow .25s, background .25s; }
.release-card:has(details[open]) { border-color: color-mix(in srgb, var(--accent) 27%, var(--border)); box-shadow: 0 13px 30px color-mix(in srgb, var(--accent) 8%, transparent); }
.release-card summary { display: flex; align-items: center; justify-content: space-between; gap: 18px; min-height: 62px; padding: 13px 18px; color: var(--ink); cursor: pointer; list-style: none; }
.release-card summary::-webkit-details-marker { display: none; }
.release-heading, .release-summary-meta { display: inline-flex; align-items: center; gap: 10px; min-width: 0; }
.release-version { display: inline-flex; align-items: center; gap: 8px; color: var(--ink); font-size: 16px; font-weight: 760; letter-spacing: -.03em; font-variant-numeric: tabular-nums; }
.release-version :deep(.glass-icon) { color: var(--accent); transition: transform .3s var(--ease-soft); }
.release-card summary:hover .release-version :deep(.glass-icon) { transform: translateX(2px) rotate(-12deg); }
.latest-tag { padding: 4px 7px; border-radius: 999px; color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, var(--surface)); font-size: 8px; font-weight: 760; letter-spacing: .09em; }
.release-summary-meta { color: var(--muted); font-size: 10.5px; white-space: nowrap; }
.release-change-count { padding-left: 10px; border-left: 1px solid var(--border); }
.release-chevron { color: var(--muted); transition: transform .25s; }.release-card details[open] .release-chevron { transform: rotate(90deg); }
.release-highlights { display: grid; gap: 0; margin: 0; padding: 0 18px 13px; list-style: none; }
.release-highlights li { display: grid; grid-template-columns: 86px minmax(0, 1fr); gap: 13px; align-items: start; padding: 13px 0; border-top: 1px solid var(--border); }
.change-type { display: inline-flex; align-items: center; gap: 5px; justify-self: start; padding: 4px 7px; border: 1px solid color-mix(in srgb, var(--accent) 16%, var(--border)); border-radius: 7px; color: var(--accent); background: color-mix(in srgb, var(--accent) 7%, var(--surface)); font-size: 9px; font-weight: 700; }
.type-fixbugs { color: color-mix(in srgb, var(--accent) 70%, var(--ink)); }
.change-type :deep(.glass-icon) { color: currentColor; }
.release-highlights p { margin: 0; color: var(--muted); font-size: 12px; line-height: 1.75; }
.history-empty { display: grid; justify-items: center; gap: 7px; padding: 54px 20px; border: 1px dashed var(--border); border-radius: 18px; color: var(--muted); background: var(--surface); text-align: center; }.history-empty strong { color: var(--ink); font-size: 14px; }.history-empty span { font-size: 11px; }
@media (max-width: 760px) { .updates-page { padding-top: 55px; padding-bottom: 78px; }.current-mark { width: 108px; height: 108px; border-radius: 32px; }.current-mark span { font-size: 23px; }.current-mark .glass-icon { top: 12px; right: 12px; }.current-orbit { right: -190px; }.history-section { margin-top: 70px; }.history-tools { align-items: stretch; flex-direction: column; }.history-search { flex-basis: auto; width: 100%; }.history-filters { order: 2; }.history-search { order: 1; } }
@media (max-width: 540px) { .current-mark span { font-size: 18px; } }
@media (max-width: 540px) { .updates-hero { margin-bottom: 30px; }.updates-hero h1 { font-size: 38px; }.updates-meta { gap: 9px; font-size: 10px; }.current-release { align-items: flex-start; min-height: 0; padding: 26px 20px; border-radius: 22px; }.current-mark { position: absolute; right: -22px; bottom: -20px; width: 92px; height: 92px; opacity: .3; }.current-copy { max-width: 100%; }.current-copy > p { max-width: 100%; }.current-actions { align-items: flex-start; flex-direction: column; gap: 13px; }.history-section { margin-top: 60px; }.history-heading { align-items: flex-start; }.release-timeline { padding-left: 20px; }.timeline-node { left: -18px; }.release-card summary { align-items: flex-start; flex-direction: column; gap: 6px; padding: 13px 14px; }.release-summary-meta { width: 100%; justify-content: space-between; }.release-highlights { padding-inline: 14px; }.release-highlights li { grid-template-columns: 1fr; gap: 7px; }.updates-page { width: calc(100% - 32px); } }
</style>
