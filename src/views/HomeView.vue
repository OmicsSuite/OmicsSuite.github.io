<template>
  <div class="home-view">
    <section class="hero container">
      <div class="hero-copy">
        <a class="paper-pill" href="https://doi.org/10.1093/hr/uhad195" target="_blank" rel="noreferrer"><span><GlassIcon name="award" :size="16" /></span>{{ c.paper }}<GlassIcon name="external-link" :size="14" /></a>
        <h1><span class="hero-line hero-line-a">{{ c.heroTitleA }}</span><span class="hero-line hero-line-b">{{ c.heroTitleB }}</span></h1>
        <p class="hero-description">{{ c.heroDescription }}</p>
        <div class="hero-actions">
          <RouterLink to="/download" class="button button-primary"><GlassIcon name="download" :size="20" />{{ t('common.download') }}<GlassIcon name="arrow-right" :size="17" /></RouterLink>
          <RouterLink to="/documents" class="button button-secondary"><GlassIcon name="book-open" :size="20" />{{ t('common.learn') }}</RouterLink>
        </div>
        <div class="hero-note">
          <span class="os-tag"><GlassIcon name="monitor" :size="15" />Windows</span>
          <span class="os-tag"><GlassIcon name="apple" :size="15" />macOS</span>
          <span class="os-tag"><GlassIcon name="terminal" :size="15" />Linux</span>
          <span class="version-tag">v2.0.0</span>
        </div>
      </div>
      <div class="hero-visual"><SoftwareShowcase /></div>
      <a class="scroll-cue" href="#features"><span>{{ c.scroll }}</span><i></i></a>
    </section>

    <section id="features" class="section coverage-section">
      <div class="container">
        <div class="section-heading coverage-heading" v-reveal>
          <span class="section-kicker"><GlassIcon name="layers" :size="26" />{{ c.featuresKicker }}</span>
        </div>
        <div class="coverage-layout">
          <div class="coverage-cards" v-reveal>
            <button
              v-for="(category, index) in homeCategories"
              :key="category.id"
              type="button"
              class="coverage-card"
              :class="{ active: category.id === activeCategory }"
              @mouseenter="activeCategory = category.id"
              @focus="activeCategory = category.id"
              @click="activeCategory = category.id"
            >
              <span class="coverage-icon"><GlassIcon :name="category.icon" :size="26" /></span>
              <span class="coverage-text"><strong>{{ category.en }}</strong><small>{{ category.tools }}</small></span>
              <span class="coverage-index">{{ String(index + 1).padStart(2, '0') }}</span>
            </button>
          </div>
          <div class="coverage-stage" v-reveal>
            <Transition name="shot" mode="out-in">
              <div :key="activeCategory" class="shot-stack">
                <figure v-for="(image, i) in activeShots" :key="image" class="shot" :class="`shot-${i + 1}`">
                  <img :src="asset(image)" :alt="activeCategoryLabel" loading="lazy" />
                </figure>
              </div>
            </Transition>
            <div class="stage-caption"><strong>{{ activeCategoryLabel }}</strong><small>{{ activeShots.length }} figures · actual software output</small></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section container workflow-section">
      <div class="section-heading" v-reveal>
        <span class="section-kicker"><GlassIcon name="workflow" :size="26" />{{ c.workflowKicker }}</span>
      </div>
      <ol class="workflow-grid">
        <li v-for="(step, index) in workflow" :key="step.titleZh" v-reveal="index * 80">
          <div class="workflow-icon"><GlassIcon :name="step.icon" :size="29" /></div>
          <span class="workflow-step">{{ pick('步骤', 'Step') }} {{ index + 1 }}</span>
          <h3>{{ pick(step.titleZh, step.titleEn) }}</h3>
          <p>{{ fill(pick(step.descZh, step.descEn)) }}</p>
          <GlassIcon v-if="index < workflow.length - 1" name="arrow-right" :size="20" class="workflow-arrow" />
        </li>
      </ol>
      <div class="dataset-banner" v-reveal>
        <span class="dataset-icon"><GlassIcon name="database" :size="32" /></span>
        <div><strong>{{ c.datasetTitle }}</strong><p>{{ c.datasetDescription }}</p></div>
        <a href="https://github.com/OmicsSuite/Datasets/" target="_blank" rel="noreferrer" class="button button-secondary"><GlassIcon name="database" :size="17" />{{ c.datasetAction }}<GlassIcon name="external-link" :size="16" /></a>
      </div>
    </section>

    <StoryFilm />


  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import SoftwareShowcase from '../components/SoftwareShowcase.vue'
import StoryFilm from '../components/StoryFilm.vue'
import GlassIcon from '../components/GlassIcon.vue'
import { categories, stats } from '../data/content.js'

const homeCategories = categories.filter((category) => category.id !== 'table')
import { useI18n } from '../i18n.js'
const { t, locale, pick } = useI18n()
const copy = {
  zh: {
    paper: 'Horticulture Research · 2023 同行评议论文', heroTitleA: '从组学数据，', heroTitleB: '到清晰发现。',
    heroDescription: 'OmicsSuite 将 {apps} 个分析与可视化应用整合进一个桌面工作空间。无需在工具之间反复迁移，让序列、单细胞、空间转录组与多组学探索连贯发生。',
    heroNote: 'Windows · macOS · Linux · v2.0.0', statApps: '分析与可视化应用', statCategories: '组学与工具类别', statWorkspace: '连贯桌面工作空间', scroll: '向下探索',
    featuresKicker: '一个套件，完整覆盖', featuresTitle: '不是更多工具，而是更短的分析路径。', featuresDescription: '围绕真实研究问题组织功能。每一类应用都能独立使用，也能成为多组学流程中的清晰一步。',
    storyKicker: '从数据到生物学解释', storyTitle: '看见模式，也看见模式所在的位置。', storyDescription: '不止生成图片。OmicsSuite 让数据检查、方法选择和结果阅读紧密相连。', storyLink: '查看对应教学', realOutput: '软件真实输出',
    workflowKicker: '清晰的工作流程', workflowTitle: '把重复操作留给软件，把判断留给研究者。', workflowDescription: '从原始表格到可发表图件，每一步都有明确的输入、参数和输出。',
    datasetTitle: '先从示例数据开始，不必等待自己的数据。', datasetDescription: '使用公开示例快速熟悉输入格式、参数设置与结果导出。', datasetAction: '获取示例数据',
    galleryKicker: '真实分析图库', galleryTitle: '每一张图，都是研究叙事的一部分。', galleryDescription: '浏览 OmicsSuite 的真实结果图。按研究领域筛选，点击可放大查看细节。',
    learningKicker: 'Documents · 为学习而设计', learningTitle: '从第一张表格，到第一条完整分析流程。', learningDescription: '通过快速开始、数据格式说明、分步教程和常见问题，建立可复用的分析习惯。', videoCourses: '观看视频课程',
    published: 'Peer-reviewed research', publicationTitle: '方法公开，结果有据可查。', readPaper: '阅读论文与引用',
    ctaTitle: '下一次组学探索，从这里开始。', ctaDescription: '下载 OmicsSuite，用一套连贯的工具完成分析、可视化与结果整理。',
  },
  en: {
    paper: 'Peer-reviewed in Horticulture Research · 2023', heroTitleA: 'From omics data', heroTitleB: 'to clear discovery.',
    heroDescription: 'OmicsSuite brings {apps} analysis and visualization applications into one desktop workspace. Move through sequences, single cells, spatial transcriptomics and multi-omics without constantly switching tools.',
    heroNote: 'Windows · macOS · Linux · v2.0.0', statApps: 'analysis & visualization apps', statCategories: 'omics and utility categories', statWorkspace: 'connected desktop workspace', scroll: 'Scroll to explore',
    featuresKicker: 'One suite, broad coverage', featuresTitle: 'Not more tools. A shorter path to answers.', featuresDescription: 'Features are organized around real research questions. Use each application on its own or as a clear step in a multi-omics workflow.',
    storyKicker: 'From data to biological interpretation', storyTitle: 'See the pattern—and where the pattern lives.', storyDescription: 'OmicsSuite connects data inspection, method selection and result interpretation, rather than stopping at image generation.', storyLink: 'Open the related tutorial', realOutput: 'Actual software output',
    workflowKicker: 'A clear workflow', workflowTitle: 'Let software handle repetition. Keep scientific judgment with you.', workflowDescription: 'From source tables to publication-ready figures, every step has explicit inputs, parameters and outputs.',
    datasetTitle: 'Start with example data—no need to wait for your own.', datasetDescription: 'Learn input formats, parameter settings and exports with public examples.', datasetAction: 'Get example datasets',
    galleryKicker: 'Real analysis gallery', galleryTitle: 'Every figure is part of a research story.', galleryDescription: 'Browse actual OmicsSuite outputs. Filter by research area and open any figure to inspect the details.',
    learningKicker: 'Documents · Designed for learning', learningTitle: 'From your first table to a complete analysis workflow.', learningDescription: 'Build reusable analysis habits with a quick start, data-format guides, step-by-step tutorials and practical answers.', videoCourses: 'Watch video courses',
    published: 'Peer-reviewed research', publicationTitle: 'Open methods. Traceable results.', readPaper: 'Read paper & citation',
    ctaTitle: 'Start your next omics exploration here.', ctaDescription: 'Download OmicsSuite and bring analysis, visualization and result organization into one connected toolkit.',
  },
}
const fill = value => value.replaceAll('{apps}', String(stats.apps))
const c = computed(() => {
  const base = copy[locale.value]
  return Object.fromEntries(Object.entries(base).map(([key, value]) => [key, value.replaceAll('{apps}', String(stats.apps))]))
})
const showcaseImages = {
  sequence: ['ToolSeqMotif.png', 'ToolSeqsGC.png', 'ToolSeqsLength.png', 'ToolBundleMSA.png', 'ToolPairwiseAlignment.png'],
  statistics: ['ToolPCAPlot.png', 'ToolCorPlot.png', 'ToolHistogramNormal.png', 'ToolViolinStat.png', 'ToolQQMultiTraits.png'],
  algorithm: ['ToolWGCNA.png', 'ToolClusterDendro.png', 'ToolNetworkPlot.png', 'ToolHeatmapTrends.png', 'ToolClusterTrends.png'],
  genomics: ['ToolCircosManhattan.png', 'ToolMitoGenome.png', 'ToolSNPdensity.png', 'ToolDiGenomeSynteny.png', 'ToolChromosomeDensity.png'],
  transcriptomics: ['ToolVolcanoPlot.png', 'ToolHeatmap.png', 'ToolGroupedHeatmap.png', 'ToolExpressionTrend.png', 'ToolUpSet.png'],
  enrichment: ['ToolGOenrichBubble.png', 'ToolKEGGenrichBar.png', 'ToolGOenrichNet.png', 'ToolKEGGenrichMap.png', 'ToolGOenrichTree.png'],
  proteomics: ['ToolVennPlot.png', 'ToolHeatmap.png', 'ToolHeatmapTrends.png', 'ToolClusterPlot.png', 'ToolMversusA.png'],
  metabolomics: ['ToolMetaboMzHeatmap.png', 'ToolMetaboPeakRT.png', 'ToolMetaboBasePeakIon.png', 'ToolLoadingOPLS.png', 'ToolScorePLS.png'],
  clinical: ['ToolSurvivalAnalysis.png', 'ToolTimeROC.png', 'ToolSensitivityROC.png', 'ShinyForest.png', 'ToolBetweenStats.png'],
  microorganisms: ['ToolCommunityPlot.png', 'ToolOTUtree.png', 'ToolRibo16SDNA.png', 'ShinyNMDS.png', 'ShinyPCoA.png'],
  singlecell: ['ToolCellUMAP.png', 'ToolCellTSNE.png', 'ToolMarkerHeatmap.png', 'ToolMonocleTrajectories.png', 'ToolSpatialFeature.png'],
  mathematics: ['ToolTernaryDiagram.png', 'ToolSinCosTan.png', 'ToolFourierFormula.png', 'ToolDensityContour.png', 'ToolHexbinHive.png'],
}
const activeCategory = ref('sequence')
const activeCategoryLabel = computed(() => homeCategories.find((category) => category.id === activeCategory.value)?.en || '')
const activeShots = computed(() => showcaseImages[activeCategory.value] || [])
const workflow = [
  { icon: 'folder-input', titleZh: '导入数据', titleEn: 'Import data', descZh: '读取常见表格与组学数据格式，先检查结构再开始分析。', descEn: 'Read common tables and omics formats, then inspect the structure before analysis.' },
  { icon: 'layers', titleZh: '选择应用', titleEn: 'Choose an app', descZh: '按研究领域和分析目标，从 {apps} 个应用中找到合适方法。', descEn: 'Find the right method among {apps} applications by field and research goal.' },
  { icon: 'settings', titleZh: '设置并运行', titleEn: 'Configure & run', descZh: '明确输入、分组与参数，让每次运行都有可复现的依据。', descEn: 'Define inputs, groups and parameters so every run has a reproducible basis.' },
  { icon: 'chart-line', titleZh: '阅读与导出', titleEn: 'Interpret & export', descZh: '检查结果图和统计数据，导出图件用于下一步研究。', descEn: 'Inspect figures and statistics, then export results for the next research step.' },
]
const asset = name => `${import.meta.env.BASE_URL}assets/images/${name}`
function tilt(event) {
  if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return
  const card = event.currentTarget, rect = card.getBoundingClientRect()
  card.style.setProperty('--ry', `${((event.clientX - rect.left) / rect.width - .5) * 5}deg`)
  card.style.setProperty('--rx', `${-((event.clientY - rect.top) / rect.height - .5) * 5}deg`)
}
function resetTilt(event) { event.currentTarget.style.setProperty('--rx', '0deg'); event.currentTarget.style.setProperty('--ry', '0deg') }
</script>

<style scoped>
.hero { position: relative; display: grid; grid-template-columns: minmax(0, .94fr) minmax(470px, 1.06fr); gap: clamp(24px, 3.4vw, 52px); align-items: center; min-height: 0; padding-top: 30px; padding-bottom: 36px; }
.hero::before { content: ''; position: absolute; top: 5%; left: -15%; width: 45%; height: 70%; background: radial-gradient(ellipse, color-mix(in srgb, var(--accent) 7%, transparent), transparent 70%); pointer-events: none; }
.hero-copy { position: relative; z-index: 2; max-width: 650px; }
.hero-copy > * { animation: hero-in 1.05s var(--ease-soft) both; }
.hero-copy > :nth-child(2) { animation-delay: .1s; }
.hero-copy > :nth-child(3) { animation-delay: .18s; }
.hero-copy > :nth-child(4) { animation-delay: .26s; }
.hero-copy > :nth-child(5) { animation-delay: .34s; }
.hero-copy > :nth-child(6) { animation-delay: .42s; }
@keyframes hero-in { from { opacity: 0; transform: translate3d(0, 20px, 0); } to { opacity: 1; transform: none; } }
.paper-pill { display: inline-flex; align-items: center; gap: 8px; min-height: 34px; padding: 4px 11px 4px 5px; border: 1px solid var(--border); border-radius: 999px; color: var(--muted); background: color-mix(in srgb, var(--surface) 70%, transparent); font-size: 11px; font-weight: 600; text-decoration: none; }
.paper-pill > span { display: grid; place-items: center; width: 25px; height: 25px; border-radius: 50%; color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, transparent); }
.paper-pill > :deep(.glass-icon:last-child) { margin-left: 3px; }
h1 { margin: 27px 0 24px; color: var(--ink); font-size: clamp(34px, 4.15vw, 68px); font-weight: 760; line-height: 1.1; letter-spacing: -.055em; text-align: left; }
h1 .hero-line { display: block; white-space: nowrap; }
h1 .hero-line-b { color: var(--accent); font-family: 'Iowan Old Style', 'Palatino Linotype', 'Songti SC', serif; font-weight: 500; letter-spacing: -.05em; }
.hero-description { max-width: 610px; margin: 0; color: var(--muted); font-size: 16px; line-height: 1.85; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
.hero-note { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 18px; font-size: 11px; }
.os-tag { display: inline-flex; align-items: center; gap: 7px; min-height: 30px; padding: 3px 11px 3px 6px; border: 1px solid color-mix(in srgb, var(--ink) 12%, transparent); border-radius: 999px; color: var(--ink); background: linear-gradient(155deg, color-mix(in srgb, var(--surface) 92%, transparent), color-mix(in srgb, var(--surface-2) 78%, transparent)); box-shadow: inset 0 1px 0 color-mix(in srgb, #fff 60%, transparent), 0 8px 18px color-mix(in srgb, var(--ink) 9%, transparent); backdrop-filter: blur(10px); font-weight: 650; letter-spacing: .01em; transition: transform .45s var(--ease-soft), border-color .45s var(--ease-soft), box-shadow .45s var(--ease-soft); }
.os-tag:hover { transform: translateY(-2px); border-color: color-mix(in srgb, var(--accent) 34%, transparent); box-shadow: inset 0 1px 0 color-mix(in srgb, #fff 65%, transparent), 0 12px 26px color-mix(in srgb, var(--accent) 16%, transparent); }
.os-tag :deep(.glass-icon) { filter: drop-shadow(0 1px 2px color-mix(in srgb, var(--accent) 22%, transparent)); }
.version-tag { display: inline-flex; align-items: center; min-height: 30px; padding: 3px 12px; border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent); border-radius: 999px; color: var(--accent); background: color-mix(in srgb, var(--accent) 9%, var(--surface)); font-family: 'SF Mono', ui-monospace, monospace; font-size: 10.5px; font-weight: 700; letter-spacing: .04em; }
.hero-visual { min-width: 0; }
.scroll-cue { grid-column: 1 / -1; justify-self: center; display: flex; align-items: center; gap: 13px; margin-top: 20px; color: color-mix(in srgb, var(--ink) 62%, var(--muted)); font-size: 13.5px; font-weight: 650; letter-spacing: .12em; text-transform: uppercase; text-decoration: none; }
.scroll-cue i { display: block; width: 56px; height: 2px; overflow: hidden; background: color-mix(in srgb, var(--accent) 22%, var(--border)); }
.scroll-cue i::after { content: ''; display: block; width: 50%; height: 100%; background: var(--accent); animation: scroll-line 2s ease-in-out infinite; }
.coverage-section { position: relative; margin-top: 30px; padding: 74px 0 80px; color: var(--on-dark-ink); background-color: #081310; background-image: radial-gradient(120% 130% at 12% 0%, color-mix(in srgb, var(--accent) 26%, #081512) 0%, #081310 62%); overflow: hidden; }
.coverage-section::before { content: ''; position: absolute; inset: 0; background: radial-gradient(52% 48% at 82% 18%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 70%); pointer-events: none; }
.coverage-section > .container { position: relative; z-index: 1; }
.coverage-heading .section-kicker { color: var(--on-dark-accent); }
.coverage-layout { display: grid; grid-template-columns: minmax(220px, 268px) minmax(0, 1fr); align-items: start; gap: clamp(34px, 3.6vw, 54px); }
.coverage-cards { display: grid; grid-template-columns: 1fr; gap: 14px; }
.coverage-card { display: flex; align-items: center; gap: 10px; min-height: 46px; padding: 7px 11px; border: 1px solid #ffffff1c; border-radius: 12px; color: color-mix(in srgb, var(--on-dark-ink) 94%, var(--on-dark-accent)); background: #ffffff08; text-align: left; cursor: pointer; transition: transform .5s var(--ease-soft), background .5s var(--ease-soft), border-color .5s var(--ease-soft), box-shadow .5s var(--ease-soft); }
.coverage-card:hover { transform: translateY(-2px); background: color-mix(in srgb, var(--accent) 9%, transparent); border-color: color-mix(in srgb, var(--accent) 34%, transparent); }
.coverage-card.active { background: color-mix(in srgb, var(--accent) 18%, transparent); border-color: color-mix(in srgb, var(--accent) 56%, transparent); box-shadow: inset 0 1px 0 #ffffff2e, 0 12px 26px color-mix(in srgb, var(--accent) 20%, transparent); }
.coverage-icon { display: grid; place-items: center; flex: none; width: 31px; height: 31px; border: 1px solid color-mix(in srgb, var(--accent) 26%, transparent); border-radius: 9px; color: var(--accent); background: color-mix(in srgb, var(--accent) 14%, transparent); }
.coverage-text { display: grid; gap: 4px; min-width: 0; }
.coverage-text strong { color: var(--on-dark-ink); font-size: 12.5px; font-weight: 640; letter-spacing: -.015em; }
.coverage-text small { overflow: hidden; color: color-mix(in srgb, var(--accent) 40%, #9db4ab); font-size: 8.5px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; text-overflow: ellipsis; white-space: nowrap; }
.coverage-index { margin-left: auto; color: color-mix(in srgb, var(--accent) 46%, transparent); font-family: 'Iowan Old Style', serif; font-size: 10px; }
.coverage-stage { position: relative; }
.shot-stack { position: relative; height: 642px; }
.shot-stack::before { content: ''; position: absolute; left: 7%; right: 5%; top: 9%; bottom: 8%; border-radius: 50%; background: radial-gradient(ellipse at center, color-mix(in srgb, var(--accent) 26%, transparent), transparent 68%); filter: blur(40px); pointer-events: none; }
.shot-stack::after { content: ''; position: absolute; inset: 0; z-index: 0; background-image: linear-gradient(color-mix(in srgb, var(--on-dark-ink) 6%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--on-dark-ink) 6%, transparent) 1px, transparent 1px); background-size: 64px 64px; -webkit-mask-image: radial-gradient(ellipse at 52% 48%, #000 18%, transparent 72%); mask-image: radial-gradient(ellipse at 52% 48%, #000 18%, transparent 72%); opacity: .55; pointer-events: none; }
.shot { position: absolute; margin: 0; padding: 6px; overflow: hidden; border: 1px solid #ffffffd6; border-radius: 14px; background: linear-gradient(180deg, #ffffff, #f7fbf8); box-shadow: 0 30px 62px color-mix(in srgb, #000000 62%, var(--accent)), 0 5px 14px color-mix(in srgb, #000000 80%, var(--accent)), 0 0 0 1px color-mix(in srgb, var(--accent) 22%, transparent), inset 0 1px 0 #ffffff; transform-origin: 50% 60%; transition: transform .6s var(--ease-soft), box-shadow .6s var(--ease-soft); animation: shot-drift 11s ease-in-out infinite alternate; }
.shot::after { content: ''; position: absolute; inset: 0; border-radius: 14px; background: linear-gradient(142deg, #ffffff24, transparent 26%, transparent 76%, #ffffff10); pointer-events: none; }
.shot img { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: contain; object-position: center; border-radius: 10px; background: #fbfbf8; }
.shot-1 { width: 57%; left: 0; top: 0; z-index: 1; transform: perspective(1500px) rotateX(.8deg) rotateY(1.8deg) rotateZ(-1.5deg); animation-delay: -2s; }
.shot-2 { width: 42%; right: 0; top: 1%; z-index: 2; transform: perspective(1500px) rotateX(.4deg) rotateY(-2.2deg) rotateZ(1.8deg); opacity: .96; animation-delay: -6s; }
.shot-3 { width: 44%; right: 4%; top: 35%; z-index: 3; transform: perspective(1500px) rotateX(-.6deg) rotateY(-1.6deg) rotateZ(-1.2deg); animation-delay: -4s; }
.shot-4 { width: 39%; left: 1%; bottom: 4%; z-index: 4; transform: perspective(1500px) rotateX(-.4deg) rotateY(1.4deg) rotateZ(1.2deg); animation-delay: -8s; }
.shot-5 { width: 35%; right: 8%; bottom: 0; z-index: 5; transform: perspective(1500px) rotateX(.6deg) rotateY(-1.4deg) rotateZ(-1.6deg); animation-delay: -10s; }
.shot:hover { z-index: 9; opacity: 1; transform: perspective(1500px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateY(-10px) scale(1.035); box-shadow: 0 42px 84px color-mix(in srgb, #000000 60%, var(--accent)), 0 8px 18px color-mix(in srgb, #000000 80%, var(--accent)), 0 0 0 1px color-mix(in srgb, var(--accent) 38%, transparent); animation-play-state: paused; }
@keyframes shot-drift { from { margin-top: 0; } to { margin-top: -6px; } }
.stage-caption { display: flex; align-items: baseline; gap: 12px; margin-top: 18px; color: #ffffff; }
.stage-caption strong { font-size: 15px; font-weight: 650; letter-spacing: -.02em; }
.stage-caption small { color: color-mix(in srgb, var(--accent) 42%, #9db4ab); font-size: 10px; letter-spacing: .05em; text-transform: uppercase; }
.shot-enter-active, .shot-leave-active { transition: opacity .45s var(--ease-soft), transform .45s var(--ease-soft); }
.shot-enter-from { opacity: 0; transform: translateY(10px) scale(.985); }
.shot-leave-to { opacity: 0; transform: translateY(-8px) scale(.99); }

.section { padding-top: 115px; }
.section-heading { display: block; margin-bottom: 36px; scroll-margin-top: 90px; }
.section-kicker { display: inline-flex; align-items: center; gap: 13px; margin-bottom: 0; color: var(--accent); font-size: clamp(28px, 3.05vw, 44px); font-weight: 760; letter-spacing: -.035em; line-height: 1.16; }
.section-kicker :deep(.glass-icon) { opacity: .9; }
.section-heading h2, .learning-copy h2 { max-width: 750px; margin: 0; color: var(--ink); font-size: clamp(31px, 3.3vw, 48px); font-weight: 700; line-height: 1.18; letter-spacing: -.045em; }
.section-heading > p { margin: 0 0 4px; color: var(--muted); font-size: 14px; line-height: 1.85; }
.category-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
.category-card { position: relative; min-height: 196px; padding: 18px; border: 1px solid var(--border); border-radius: var(--radius-card); background: var(--surface); transition: border-color .5s var(--ease-soft), box-shadow .5s var(--ease-soft), background .5s var(--ease-soft), transform .5s var(--ease-soft); }
.category-card:hover { transform: translateY(-6px); border-color: color-mix(in srgb, var(--accent) 35%, var(--border)); box-shadow: var(--shadow-lift); background: color-mix(in srgb, var(--surface) 94%, var(--accent)); }
.category-top { display: flex; align-items: flex-start; justify-content: space-between; }
.category-icon { display: grid; place-items: center; width: 46px; height: 46px; border: 1px solid color-mix(in srgb, var(--accent) 13%, var(--border)); border-radius: 15px; color: var(--accent); background: color-mix(in srgb, var(--accent) 8%, var(--surface)); transition: transform .3s; }
.category-card:hover .category-icon { transform: rotate(-6deg) scale(1.07); }
.category-index { color: color-mix(in srgb, var(--muted) 45%, transparent); font-size: 11px; }
.category-card h3 { margin: 14px 0 6px; color: var(--ink); font-size: 17px; }
.category-card p { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin: 0; color: var(--muted); font-size: 11.5px; line-height: 1.6; }
.category-tools { display: block; margin-top: 12px; color: var(--accent); font-size: 10px; font-weight: 650; }
.story-section { margin-top: 120px; padding: 95px 0 80px; background: color-mix(in srgb, var(--accent) 24%, #091512); color: #eef8f3; }
:global(html[data-theme='dark'] .story-section) { background: color-mix(in srgb, var(--accent) 13%, #0a1311); }
.light-heading h2 { color: var(--on-dark-ink); }
.light-heading > p { color: color-mix(in srgb, var(--accent) 18%, #cfdfd8); }
.light-heading .section-kicker { color: var(--on-dark-accent); }
.story-groups { display: grid; gap: clamp(56px, 7vw, 86px); }
.story-group { display: grid; grid-template-columns: minmax(0, 1fr) minmax(400px, 590px); align-items: center; gap: clamp(38px, 5vw, 74px); }
.story-copy { max-width: 540px; }
.story-number { display: inline-block; color: var(--on-dark-accent); font-family: 'Iowan Old Style', serif; font-size: 15px; letter-spacing: .08em; }
.story-copy h3 { margin: 13px 0 15px; color: var(--on-dark-ink); font-size: clamp(26px, 2.45vw, 35px); font-weight: 700; line-height: 1.24; letter-spacing: -.035em; }
.story-copy > p { margin: 0; color: color-mix(in srgb, var(--accent) 16%, #c1d5cd); font-size: 13.5px; line-height: 1.9; }
.story-index { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin: 25px 0 0; padding: 0; list-style: none; }
.story-index li { display: flex; align-items: center; gap: 9px; min-height: 42px; padding: 0 13px; border: 1px solid #ffffff1f; border-radius: 11px; color: var(--on-dark-ink); background: #ffffff08; font-size: 12px; font-weight: 600; }
.story-index li :deep(.glass-icon) { color: var(--on-dark-accent); }
.story-stack { position: relative; height: 372px; --rx: 0deg; --ry: 0deg; transform: perspective(1400px) rotateX(var(--rx)) rotateY(var(--ry)); transition: transform .5s var(--ease-soft); }
.story-shot { position: absolute; margin: 0; padding: 20px 8px 24px; overflow: hidden; border: 1px solid #ffffff70; border-radius: 15px; background: #fff; box-shadow: 0 22px 48px #0006, 0 3px 9px #0003; animation: shot-float 9s ease-in-out infinite alternate; transition: transform .6s var(--ease-soft), box-shadow .6s var(--ease-soft); }
.story-shot small { position: absolute; left: 10px; bottom: 7px; color: #71807a; font-size: 8.5px; font-weight: 650; letter-spacing: .07em; text-transform: uppercase; }
.story-shot img { display: block; width: 100%; border-radius: 8px; }
.story-shot:nth-child(1) { width: 57%; left: 0; top: 2%; z-index: 2; transform: rotate(-2.2deg); animation-delay: -1s; }
.story-shot:nth-child(2) { width: 45%; right: 0; top: 12%; z-index: 4; transform: rotate(2.4deg); animation-delay: -4s; }
.story-shot:nth-child(3) { width: 45%; left: 4%; bottom: 0; z-index: 5; transform: rotate(1.8deg); animation-delay: -6s; }
.story-shot:nth-child(4) { width: 41%; right: 6%; bottom: 3%; z-index: 3; transform: rotate(-2.6deg); animation-delay: -3s; }
.story-shot:hover { z-index: 9; transform: rotate(0deg) translateY(-8px) scale(1.03); box-shadow: 0 34px 66px #0007; animation-play-state: paused; }
@keyframes shot-float { from { margin-top: 0; } to { margin-top: -9px; } }
.text-link { display: inline-flex; align-items: center; gap: 8px; color: var(--accent); font-size: 12px; font-weight: 700; text-decoration: none; }
.workflow-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; margin: 0; padding: 0; list-style: none; }
.workflow-grid li { position: relative; min-width: 0; padding: 26px 28px 26px 0; }
.workflow-grid li + li { padding-left: 28px; border-left: 1px solid var(--border); }
.workflow-icon { display: grid; place-items: center; width: 54px; height: 54px; margin-bottom: 22px; border-radius: 17px; color: var(--accent); background: color-mix(in srgb, var(--accent) 9%, var(--surface)); }
.workflow-step { color: var(--accent); font-size: 10px; font-weight: 700; }
.workflow-grid p { text-align: left; }
.workflow-grid h3 { margin: 8px 0 10px; font-size: 18px; }
.workflow-grid p { margin: 0; color: var(--muted); font-size: 12px; line-height: 1.75; }
.workflow-arrow { position: absolute; right: -10px; top: 43px; z-index: 2; color: var(--muted); background: var(--bg); }
.dataset-banner { display: flex; align-items: center; gap: 18px; margin-top: 40px; padding: 22px 24px; border: 1px solid var(--border); border-radius: 18px; background: color-mix(in srgb, var(--accent) 5%, var(--surface)); }
.dataset-icon { display: grid; place-items: center; flex: none; width: 54px; height: 54px; border-radius: 16px; color: var(--accent); background: var(--surface); }
.dataset-banner > div { flex: 1; }.dataset-banner strong { font-size: 14px; }.dataset-banner p { margin: 5px 0 0; color: var(--muted); font-size: 12px; }
.dataset-banner .button { min-height: 42px; flex: none; }
.learning-card { display: grid; grid-template-columns: 1.05fr .95fr; gap: 70px; padding: clamp(30px, 5vw, 65px); border: 1px solid var(--border); border-radius: 26px; background: var(--surface); }
.learning-copy > p { max-width: 560px; margin: 20px 0 0; color: var(--muted); font-size: 14px; line-height: 1.85; }
.learning-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 22px; margin-top: 28px; }
.learning-roadmap { display: grid; align-content: center; }
.learning-roadmap > div { position: relative; display: grid; grid-template-columns: 32px 1fr auto; align-items: center; gap: 14px; min-height: 73px; }
.learning-roadmap > div:not(:last-child)::after { content: ''; position: absolute; left: 15px; top: 52px; bottom: -9px; width: 1px; background: var(--border); }
.learning-roadmap > div > span { display: grid; place-items: center; width: 31px; height: 31px; border: 1px solid color-mix(in srgb, var(--accent) 25%, var(--border)); border-radius: 50%; color: var(--accent); background: var(--surface); font-size: 11px; font-weight: 700; }
.learning-roadmap p { margin: 0; font-size: 13px; font-weight: 650; }.learning-roadmap :deep(.glass-icon) { color: var(--accent); }
.publication-strip { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 24px; margin-top: 100px; padding-block: 30px; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.publication-mark { display: grid; place-items: center; width: 66px; height: 66px; border-radius: 20px; color: var(--accent); background: color-mix(in srgb, var(--accent) 9%, var(--surface)); }
.publication-strip span { color: var(--accent); font-size: 10px; }.publication-strip h2 { margin: 6px 0; font-size: 23px; letter-spacing: -.025em; }.publication-strip p { margin: 0; color: var(--muted); font-size: 11px; }
.publication-strip .button { min-height: 43px; }
.final-cta { position: relative; margin-top: 100px; padding: 72px 30px; overflow: hidden; border-radius: 28px; color: #eaf7f1; background: color-mix(in srgb, var(--accent) 28%, #0a1613); text-align: center; }
.final-cta > *:not(.cta-orbit) { position: relative; z-index: 2; }
.cta-icon { display: grid; place-items: center; width: 64px; height: 64px; margin: 0 auto 22px; border: 1px solid #ffffff25; border-radius: 20px; color: var(--on-dark-accent); background: #ffffff0e; }
.final-cta h2 { margin: 0; color: #fff; font-size: clamp(30px, 4vw, 49px); letter-spacing: -.045em; }.final-cta > p { max-width: 600px; margin: 17px auto 0; color: color-mix(in srgb, var(--accent) 12%, #c6d8d1); font-size: 14px; line-height: 1.8; }.final-cta .hero-actions { justify-content: center; }
.button-light { color: #143d32; background: #f1faf5; }.button-ghost { color: #e9f5ef; border-color: #ffffff28; background: #ffffff0b; }
.cta-orbit { position: absolute; border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent); border-radius: 50%; }.orbit-one { width: 430px; height: 430px; left: -160px; top: -210px; }.orbit-two { width: 540px; height: 540px; right: -240px; bottom: -370px; }
@keyframes scroll-line { 0% { transform: translateX(-100%); } 100% { transform: translateX(220%); } }
@media (max-width: 1100px) { .hero { grid-template-columns: minmax(0, 1fr) minmax(420px, .92fr); gap: 32px; } .category-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } .story-group { grid-template-columns: minmax(0, 1fr) minmax(340px, 460px); } }
@media (max-width: 920px) { .coverage-layout { grid-template-columns: 1fr; gap: 30px; } .coverage-cards { grid-template-columns: 1fr; } .shot-stack { height: 380px; } .coverage-cards { order: 1; } .coverage-stage { order: 2; } h1 { width: fit-content; margin-inline: auto; text-align: left; } .hero { grid-template-columns: 1fr; min-height: auto; padding-top: 28px; text-align: center; } .hero-copy { max-width: 720px; margin: auto; } .hero-description { margin-inline: auto; text-align: left; } .hero-actions, .hero-note { justify-content: center; } .hero-visual { max-width: 700px; width: 100%; margin: 24px auto 0; } .scroll-cue { display: none; } .section-heading { grid-template-columns: 1fr; gap: 18px; } .section-heading > p { max-width: 650px; } .story-group { grid-template-columns: 1fr; } .story-copy { max-width: 100%; } .story-stack { height: 320px; margin-top: 8px; } .workflow-grid { grid-template-columns: repeat(2, 1fr); gap: 25px 0; } .workflow-grid li:nth-child(3) { padding-left: 0; border-left: 0; } .workflow-grid li:nth-child(2) .workflow-arrow { display: none; } .learning-card { gap: 40px; } }
@media (max-width: 720px) { .section { padding-top: 82px; } .category-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .story-section { margin-top: 85px; padding: 75px 0 90px; } .learning-card { grid-template-columns: 1fr; } .publication-strip { grid-template-columns: auto 1fr; } .publication-strip .button { grid-column: 1 / -1; justify-self: start; } }
@media (max-width: 520px) { .coverage-card { min-height: 44px; padding: 6px 9px; gap: 8px; } .coverage-text small { display: none; } .coverage-icon { width: 28px; height: 28px; } .shot-stack { display: flex; height: auto; gap: 10px; padding: 2px 2px 8px; overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; scrollbar-width: none; } .shot-stack::-webkit-scrollbar { display: none; } .shot { position: relative; flex: 0 0 84%; width: 84%; left: auto; right: auto; top: auto; bottom: auto; margin: 0; transform: none; animation: none; scroll-snap-align: start; border-radius: 13px; } .shot img { aspect-ratio: 16 / 10; } .shot:hover { transform: none; } .stage-caption { margin-top: 12px; } .hero { padding-top: 20px; } h1 { margin-top: 23px; font-size: min(9vw, 46px); } .hero-description { font-size: 14px; } .paper-pill { font-size: 9px; } .hero-actions { display: grid; grid-template-columns: 1fr; }
  .category-card { padding: 22px 20px; }
  .story-section { padding: 60px 0 74px; }
  .final-cta { padding: 46px 20px; } .hero-actions .button { width: 100%; box-sizing: border-box; } .section-heading h2, .learning-copy h2 { font-size: 31px; } .category-grid { grid-template-columns: 1fr; } .category-card { min-height: 0; } .workflow-grid { grid-template-columns: 1fr; } .workflow-grid li, .workflow-grid li + li { padding: 22px 0; border-left: 0; border-bottom: 1px solid var(--border); } .workflow-arrow { display: none; } .dataset-banner { align-items: flex-start; flex-wrap: wrap; } .dataset-banner .button { width: 100%; } .learning-card { padding: 26px 22px; } .learning-actions { align-items: flex-start; flex-direction: column; } .publication-strip { gap: 16px; } .publication-mark { width: 53px; height: 53px; } .publication-strip h2 { font-size: 20px; } .final-cta { margin-top: 75px; padding: 52px 22px; border-radius: 22px; } }
@media (prefers-reduced-motion: reduce) { .scroll-cue i::after { animation: none; } .shot { animation: none; } .shot-enter-active, .shot-leave-active { transition: none; } }
</style>
