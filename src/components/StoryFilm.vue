<template>
  <section id="film" class="story-film container" v-reveal>
    <header class="film-heading">
      <span class="film-kicker"><GlassIcon name="sparkles" :size="26" />{{ c.kicker }}</span>
    </header>

    <figure class="film-frame">
      <div class="film-stage">
        <video
          ref="videoEl"
          :poster="`${base}assets/media/omicssuite-vibe-poster.jpg`"
          preload="metadata"
          playsinline
          @click="togglePlay"
          @timeupdate="onTime"
          @ended="playing = false"
        >
          <source :src="`${base}assets/media/omicssuite-vibe.mp4`" type="video/mp4" />
        </video>
        <button v-if="!playing" class="film-overlay" type="button" :aria-label="c.play" @click="togglePlay">
          <span class="film-play"><i></i></span>
          <span class="film-cta">{{ c.play }}</span>
          <span class="film-sub">{{ c.playSub }}</span>
        </button>
        <div class="film-badges">
          <span>1080p</span>
          <span>2:14</span>
          <span>{{ c.sound }}</span>
        </div>
        <div class="film-progress"><i :style="{ width: `${Math.min(100, (time / 134) * 100)}%` }"></i></div>
      </div>

      <div class="film-chapters">
        <button
          v-for="chapter in chapters"
          :key="chapter.at"
          type="button"
          :class="['film-chapter', { active: time >= chapter.at && time < chapter.at + 9 }]"
          @click="seek(chapter.at)"
        >
          <span class="chapter-time">{{ chapter.label }}</span>
          <span class="chapter-title">{{ chapter.title }}</span>
          <GlassIcon name="arrow-right" :size="15" />
        </button>
      </div>

      <figcaption>{{ c.caption }}</figcaption>
    </figure>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import GlassIcon from './GlassIcon.vue'
import { useI18n } from '../i18n.js'

const base = import.meta.env.BASE_URL
const { pick } = useI18n()
const videoEl = ref(null)
const playing = ref(false)
const time = ref(0)

function togglePlay() {
  const el = videoEl.value
  if (!el) return
  if (el.paused) {
    el.play()
    playing.value = true
  } else {
    el.pause()
    playing.value = false
  }
}

function seek(at) {
  const el = videoEl.value
  if (!el) return
  el.currentTime = at
  el.play()
  playing.value = true
}

function onTime() {
  time.value = videoEl.value?.currentTime || 0
}

const copy = {
  zh: {
    kicker: 'VIBE 知识大赏',
    title: '两分十四秒，看完 OmicsSuite 的来路与去处。',
    description: '用 Remotion 逐帧编排的科学短片：从论文与四层架构，到软件首页、子程序、13 个分类与 181 个应用的树状全貌，最后落在 v2.0.0 的三平台下载。原声配乐，无旁白。',
    play: '播放正片',
    playSub: 'Vibe 知识大赏 · 2 分 14 秒',
    sound: '原声',
    caption: 'Remotion 逐帧渲染 · 1920 × 1080 · 原创电子氛围配乐 · 画面取自 OmicsSuite 真实界面与论文图表',
  },
  en: {
    kicker: 'Vibe knowledge show',
    title: 'Two minutes through where OmicsSuite came from — and where it is going.',
    description: 'A frame-by-frame Remotion film: the paper and the four-layer architecture, the real workspace and a sub-program, all 13 categories and 181 applications, then v2.0.0 on Windows, macOS and Linux. Original score, no voice-over.',
    play: 'Play the film',
    playSub: 'Vibe knowledge show · 2 min 14 s',
    sound: 'Sound on',
    caption: 'Rendered frame by frame in Remotion · 1920 × 1080 · original ambient score · real interfaces, glass icons and paper figures',
  },
}

const chapters = computed(() => {
  const zh = [
    { at: 0, label: '00:00', title: '为什么做' },
    { at: 20, label: '00:20', title: '论文与架构' },
    { at: 49, label: '00:49', title: '真实界面' },
    { at: 77, label: '01:17', title: '分类与树' },
    { at: 119, label: '01:59', title: 'v2.0.0' },
  ]
  const en = [
    { at: 0, label: '00:00', title: 'Why it exists' },
    { at: 20, label: '00:20', title: 'Paper & stack' },
    { at: 49, label: '00:49', title: 'Inside the app' },
    { at: 77, label: '01:17', title: 'Categories & tree' },
    { at: 119, label: '01:59', title: 'v2.0.0' },
  ]
  return pick('zh', 'en') === 'zh' ? zh : en
})

const c = computed(() => copy[pick('zh', 'en')])
</script>

<style scoped>
.story-film { padding-top: 92px; padding-bottom: 80px; margin-bottom: 56px; }
.film-heading { display: block; margin-bottom: 26px; }
.film-kicker { display: inline-flex; align-items: center; gap: 13px; color: var(--accent); font-size: clamp(28px, 3.05vw, 44px); font-weight: 760; letter-spacing: -.035em; line-height: 1.16; }
.film-kicker :deep(.glass-icon) { color: var(--accent); }
.film-frame { margin: 0; padding: 12px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-card); box-shadow: var(--shadow-soft); transition: box-shadow .5s var(--ease-soft), border-color .5s var(--ease-soft); }
.film-frame:hover { border-color: color-mix(in srgb, var(--accent) 26%, var(--border)); box-shadow: var(--shadow-lift); }
.film-stage { position: relative; overflow: hidden; border-radius: 14px; background: #04100c; }
.film-stage video { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover; cursor: pointer; }
.film-overlay { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-end; gap: 10px; padding: clamp(18px, 2.4vw, 32px); border: 0; color: #f2fbf7; text-align: left; background: linear-gradient(180deg, rgba(3, 14, 10, 0) 0%, rgba(3, 14, 10, .06) 48%, rgba(3, 14, 10, .72) 100%); cursor: pointer; transition: background .45s var(--ease-soft); }
.film-overlay:hover { background: linear-gradient(180deg, rgba(3, 14, 10, 0) 0%, rgba(3, 14, 10, .02) 52%, rgba(3, 14, 10, .56) 100%); }
.film-play { display: grid; place-items: center; width: 62px; height: 62px; border-radius: 50%; border: 1px solid rgba(255, 255, 255, .24); background: rgba(9, 30, 24, .5); backdrop-filter: blur(10px); box-shadow: 0 18px 40px rgba(0, 0, 0, .38); transition: transform .45s var(--ease-spring), background .45s var(--ease-soft); }
.film-overlay:hover .film-play { transform: scale(1.07); background: rgba(21, 70, 56, .55); }
.film-play i { width: 0; height: 0; margin-left: 4px; border-top: 11px solid transparent; border-bottom: 11px solid transparent; border-left: 17px solid #eafff7; }
.film-cta { font-size: 15px; font-weight: 700; letter-spacing: .02em; }
.film-sub { font-size: 11px; color: rgba(242, 251, 247, .6); letter-spacing: .08em; }
.film-badges { position: absolute; top: 16px; right: 16px; display: flex; gap: 7px; }
.film-badges span { padding: 5px 10px; color: #eaf7f2; background: rgba(4, 18, 14, .55); border: 1px solid rgba(255, 255, 255, .16); border-radius: 999px; font-size: 10px; font-weight: 700; backdrop-filter: blur(8px); }
.film-progress { position: absolute; left: 0; right: 0; bottom: 0; height: 3px; background: rgba(255, 255, 255, .1); }
.film-progress i { display: block; height: 3px; background: var(--accent); transition: width .18s linear; }
.film-chapters { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 8px; padding: 12px 2px 2px; }
.film-chapter { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 8px; padding: 10px 11px; border: 1px solid var(--border); border-radius: 12px; background: var(--surface-2); color: var(--muted); cursor: pointer; text-align: left; transition: border-color .4s var(--ease-soft), background .4s var(--ease-soft), color .4s var(--ease-soft), transform .4s var(--ease-soft); }
.film-chapter:hover { transform: translateY(-2px); border-color: color-mix(in srgb, var(--accent) 30%, var(--border)); color: var(--ink); }
.film-chapter.active { color: var(--ink); border-color: color-mix(in srgb, var(--accent) 44%, var(--border)); background: color-mix(in srgb, var(--accent) 8%, var(--surface)); }
.film-chapter.active .chapter-time { color: var(--accent); }
.chapter-time { font-size: 11px; font-weight: 700; font-variant-numeric: tabular-nums; letter-spacing: .03em; }
.chapter-title { font-size: 12.5px; font-weight: 600; }
.film-chapter :deep(.glass-icon) { opacity: .5; }
.film-frame figcaption { padding: 11px 4px 2px; color: var(--muted); font-size: 11.5px; line-height: 1.7; }
@media (max-width: 1120px) {
  .film-chapters { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
@media (max-width: 820px) {
  .film-chapters { grid-template-columns: 1fr; }
  .film-play { width: 52px; height: 52px; }
  .film-overlay { padding: 16px; }
  .film-badges { top: 10px; right: 10px; }
}
@media (max-width: 520px) {
  .film-overlay { align-items: center; justify-content: flex-end; padding: 10px; background: linear-gradient(180deg, transparent 0%, rgba(3,14,10,.04) 62%, rgba(3,14,10,.62) 100%); }
  .film-play { width: 40px; height: 40px; }
  .film-play i { border-top-width: 8px; border-bottom-width: 8px; border-left-width: 12px; }
  .film-cta, .film-sub { display: none; }
  .film-badges span { padding: 4px 7px; font-size: 8px; }
}
</style>
