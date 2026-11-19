<template>
  <section class="promo-section container" v-reveal>
    <header class="promo-heading">
      <span class="promo-kicker"><GlassIcon name="palette" :size="26" />{{ c.kicker }}</span>
    </header>

    <div class="promo-grid">
      <figure class="promo-figure promo-main">
        <el-image :src="`${base}assets/images/promo-brand.jpg`" :alt="c.mainAlt" fit="cover" :preview-src-list="[`${base}assets/images/promo-brand.jpg`]" preview-teleported hide-on-click-modal />
        <figcaption>{{ c.mainCaption }}</figcaption>
      </figure>

      <div class="promo-side">
        <figure class="promo-figure promo-small">
          <el-image :src="`${base}assets/images/promo-data.jpg`" :alt="c.dataAlt" fit="cover" :preview-src-list="[`${base}assets/images/promo-data.jpg`]" preview-teleported hide-on-click-modal />
          <figcaption>{{ c.dataCaption }}</figcaption>
        </figure>
      </div>
    </div>

    <figure class="promo-video" v-reveal>
      <video ref="videoEl" :poster="`${base}assets/media/omicssuite-promo-poster.jpg`" preload="metadata" playsinline loop @click="togglePlay">
        <source :src="`${base}assets/media/omicssuite-promo.mp4`" type="video/mp4" />
      </video>
      <button v-if="!playing" class="video-overlay" type="button" :aria-label="c.play" @click="togglePlay">
        <span class="play-triangle"></span>
        <span class="video-label">{{ c.play }}</span>
      </button>
      <span class="video-tag">1080p · 00:08</span>
      <figcaption>{{ c.videoCaption }}</figcaption>
    </figure>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import GlassIcon from './GlassIcon.vue'
import { useI18n } from '../i18n.js'
const { pick } = useI18n()
const base = import.meta.env.BASE_URL
const videoEl = ref(null)
const playing = ref(false)
function togglePlay() {
  const el = videoEl.value
  if (!el) return
  if (el.paused) { el.play(); playing.value = true }
  else { el.pause(); playing.value = false }
}

const copy = {
  zh: {
    kicker: '品牌与视觉',
    title: '一次探索，完整呈现。',
    description: '从界面到图表，从论文到日常分析。这组视觉取自 OmicsSuite 的真实工作场景，用同一套颜色与材质语言贯穿网站。',
    mainAlt: 'OmicsSuite 品牌主视觉：深色玻璃工作台与多组学图表',
    mainCaption: 'Brand visual · 181 个应用，一个工作空间',
    dataAlt: 'OmicsSuite 数据主视觉：浅色玻璃图表卡片',
    dataCaption: 'From data to discovery · 散点图、热图与系统发育树',
    note: '所有宣传图均为 1920 × 1080，可直接用于展示、汇报与投稿附页。',
    action: '下载 v2.0.0',
    play: '播放宣传片',
    videoCaption: '宣传片 · 8 秒，从深色品牌主视觉缓慢推进，全片无旁白。',
  },
  en: {
    kicker: 'Brand and visual',
    title: 'One exploration, fully framed.',
    description: 'From interface to figures, from paper to daily analysis. These visuals come from real OmicsSuite workflows and share one color and material language across the site.',
    mainAlt: 'OmicsSuite brand visual: dark glass workspace with multi-omics charts',
    mainCaption: 'Brand visual · 181 applications, one workspace',
    dataAlt: 'OmicsSuite data visual: light glass chart cards',
    dataCaption: 'From data to discovery · scatter, heatmap and phylogenetic tree',
    note: 'Both visuals are 1920 × 1080 and ready for presentations, reports and paper appendices.',
    action: 'Download v2.0.0',
    play: 'Play the film',
    videoCaption: 'Promo film · 8 seconds, a slow push-in from the dark brand key visual, no voice-over.',
  },
}
const c = computed(() => copy[pick('zh', 'en')])
</script>

<style scoped>
.promo-section { padding-top: 96px; }
.promo-heading { display: block; margin-bottom: 28px; }
.promo-kicker { display: inline-flex; align-items: center; gap: 13px; color: var(--accent); font-size: clamp(28px, 3.05vw, 44px); font-weight: 760; letter-spacing: -.035em; line-height: 1.16; }
.promo-grid { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); gap: 18px; align-items: start; }
.promo-side { display: grid; gap: 18px; }
.promo-figure { margin: 0; padding: 12px; overflow: hidden; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-card); box-shadow: var(--shadow-soft); transition: transform .5s var(--ease-soft), box-shadow .5s var(--ease-soft), border-color .5s var(--ease-soft); }
.promo-figure:hover { transform: translateY(-5px); box-shadow: var(--shadow-lift); border-color: color-mix(in srgb, var(--accent) 30%, var(--border)); }
.promo-figure :deep(.el-image) { display: block; width: 100%; overflow: hidden; border-radius: 12px; background: var(--surface-2); }
.promo-main :deep(.el-image__inner) { aspect-ratio: 16 / 9; }
.promo-small :deep(.el-image__inner) { aspect-ratio: 4 / 3; }
.promo-figure :deep(.el-image__inner) { transition: transform .8s var(--ease-soft); cursor: zoom-in; }
.promo-figure:hover :deep(.el-image__inner) { transform: scale(1.035); }
.promo-figure figcaption { padding: 12px 4px 2px; color: var(--muted); font-size: 11.5px; line-height: 1.7; }
.promo-video { position: relative; margin: 18px 0 0; padding: 12px; overflow: hidden; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-card); box-shadow: var(--shadow-soft); }
.promo-video video { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 12px; background: #08120f; cursor: pointer; }
.video-overlay { position: absolute; inset: 12px; display: flex; flex-direction: column; gap: 12px; align-items: center; justify-content: center; color: #f2fbf7; background: linear-gradient(180deg, rgba(4, 18, 14, .18), rgba(4, 18, 14, .5)); border: 0; border-radius: 12px; cursor: pointer; transition: background .4s var(--ease-soft); }
.video-overlay:hover { background: linear-gradient(180deg, rgba(4, 18, 14, .1), rgba(4, 18, 14, .42)); }
.play-triangle { width: 0; height: 0; border-top: 15px solid transparent; border-bottom: 15px solid transparent; border-left: 24px solid color-mix(in srgb, var(--accent) 62%, #ffffff); filter: drop-shadow(0 6px 18px rgba(0, 0, 0, .4)); transition: transform .4s var(--ease-spring); }
.video-overlay:hover .play-triangle { transform: scale(1.12); }
.video-label { font-size: 12px; font-weight: 700; letter-spacing: .04em; }
.video-tag { position: absolute; right: 24px; top: 24px; padding: 5px 10px; color: #eaf7f2; background: rgba(6, 20, 16, .55); border: 1px solid rgba(255, 255, 255, .18); border-radius: 999px; font-size: 10px; font-weight: 700; backdrop-filter: blur(8px); }
.promo-video figcaption { padding: 12px 4px 2px; color: var(--muted); font-size: 11.5px; line-height: 1.7; }
@media (max-width: 920px) { .promo-grid { grid-template-columns: 1fr; } .promo-small :deep(.el-image__inner) { aspect-ratio: 4 / 3; } }
@media (max-width: 520px) { .promo-section { padding-top: 72px; } .promo-figure { padding: 9px; } }
</style>
