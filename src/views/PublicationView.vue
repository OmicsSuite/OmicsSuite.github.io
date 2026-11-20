<template>
  <div class="publication-page container">
    <section class="paper-hero">
      <div class="paper-copy">
        <span class="peer-badge"><GlassIcon name="award" :size="16" />{{ c.peerReviewed }}</span>
        <h1>OmicsSuite: a customized and pipelined suite for analysis and visualization of <span class="nowrap">multi-omics</span> big data</h1>
        <p class="journal-line">Horticulture Research · 2023 · uhad195</p>
        <p class="author-line">Ben-ben Miao, Wei Dong, Yi-xin Gu, Zhao-fang Han, Xuan Luo, Cai-huan Ke, Wei-wei You</p>
        <p class="abstract" v-html="c.abstract"></p>
        <div class="paper-actions">
          <a href="https://doi.org/10.1093/hr/uhad195" target="_blank" rel="noreferrer" class="button button-primary"><GlassIcon name="globe" :size="17" />{{ c.readOnline }}<GlassIcon name="external-link" :size="17" /></a>
          <a :href="pdf" target="_blank" rel="noreferrer" class="button button-secondary"><GlassIcon name="file-text" :size="18" />{{ c.readPdf }}</a>
        </div>
      </div>
      <figure class="paper-visual media-frame" v-reveal>
        <el-image :src="`${base}assets/images/publication-figure1.jpg`" :alt="c.figureAlt" fit="contain" lazy :preview-src-list="[`${base}assets/images/publication-figure1.jpg`]" preview-teleported hide-on-click-modal />
        <span class="paper-zoom"><GlassIcon name="maximize" :size="14" />{{ c.zoomHint }}</span>
        <figcaption>{{ c.figureCaption }}</figcaption>
      </figure>
    </section>

    <section class="highlight-band">
      <div v-for="item in highlights" :key="item.value" class="highlight-item" v-reveal>
        <strong>{{ item.value }}</strong>
        <span>{{ pick(item.labelZh, item.labelEn) }}</span>
        <small>{{ pick(item.noteZh, item.noteEn) }}</small>
      </div>
    </section>

    <section class="figure-section">
      <header class="figure-heading">
        <div>
          <span>{{ c.figureKicker }}</span>
          <h2>{{ c.figureTitle }}</h2>
        </div>
        <p>{{ c.figureDescription }}</p>
      </header>
      <div class="figure-grid">
        <figure v-for="figure in figures" :key="figure.src" class="figure-card media-frame" v-reveal>
          <div class="figure-media"><el-image :src="`${base}assets/images/${figure.src}`" :alt="pick(figure.altZh, figure.altEn)" fit="contain" lazy :preview-src-list="[`${base}assets/images/${figure.src}`]" preview-teleported hide-on-click-modal /><span class="zoom-hint"><GlassIcon name="maximize" :size="14" />{{ c.zoomHint }}</span></div>
          <figcaption>
            <span class="figure-label"><GlassIcon :name="figure.icon" :size="15" />{{ pick(figure.labelZh, figure.labelEn) }}</span>
            <h3>{{ pick(figure.titleZh, figure.titleEn) }}</h3>
            <p>{{ pick(figure.descZh, figure.descEn) }}</p>
          </figcaption>
        </figure>
      </div>
      <p class="figure-credit">{{ c.figureCredit }}</p>
    </section>

    <section class="reading-section">
      <div class="reading-copy">
        <span class="section-kicker"><GlassIcon name="book-open-text" :size="16" />{{ c.readingKicker }}</span>
        <h2>{{ c.readingTitle }}</h2>
        <p>{{ c.readingDescription }}</p>
        <div class="reading-mark" aria-hidden="true"><GlassIcon name="quote" :size="28" /></div>
      </div>
      <ul class="reading-list">
        <li v-for="(point, index) in readingPoints" :key="point.zh" v-reveal>
          <span class="reading-icon"><GlassIcon :name="point.icon" :size="18" /></span>
          <div class="reading-text"><strong>{{ pick(point.zhTitle, point.enTitle) }}</strong><p>{{ pick(point.zh, point.en) }}</p></div>
          <em class="reading-num">{{ String(index + 1).padStart(2, '0') }}</em>
        </li>
      </ul>
    </section>

    <section class="citation-section">
      <div class="citation-copy">
        <span class="section-kicker"><GlassIcon name="quote" :size="16" />{{ c.citationKicker }}</span>
        <h2>{{ c.citationTitle }}</h2>
        <p>{{ c.citationDescription }}</p>
        <div class="author-list">Ben-ben Miao · Wei Dong · Yi-xin Gu · Zhao-fang Han · Xuan Luo · Cai-huan Ke · Wei-wei You</div>
      </div>
      <div class="citation-box">
        <div class="citation-head">
          <span class="citation-mark"><GlassIcon name="quote" :size="17" /></span>
          <strong>{{ c.citation }}</strong>
          <button @click="copyCitation"><GlassIcon :name="copied ? 'check' : 'copy'" :size="17" />{{ copied ? t('common.copied') : t('common.copy') }}</button>
        </div>
        <p>{{ citation }}</p>
      </div>
    </section>

  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import GlassIcon from '../components/GlassIcon.vue'
import { useI18n } from '../i18n.js'
const { pick, t } = useI18n()
const copied = ref(false)
const base = import.meta.env.BASE_URL
const pdf = `${base}assets/OmicsSuite-Horticulture-Research-2023.pdf`
const citation = 'Ben-ben Miao, Wei Dong, Yi-xin Gu, Zhao-fang Han, Xuan Luo, Cai-huan Ke, Wei-wei You, OmicsSuite: a customized and pipelined suite for analysis and visualization of multi-omics big data, Horticulture Research, 2023;, uhad195, https://doi.org/10.1093/hr/uhad195.'

const copy = {
  zh: {
    peerReviewed: '同行评议论文 · Open Access',
    abstract: 'OmicsSuite 将统计与多组学分析整合进一个桌面套件：论文发表时包含 12 个类别、175 个子应用，覆盖序列、统计、算法、基因组、转录组、富集、蛋白组、代谢组、临床、微生物、单细胞与表格操作，并提供 300 多个可调参数接口。软件可直接读取 FASTA、FastQ、MAF、mzML、HDF5 等格式，输出可发表的图形与表格。',
    readOnline: '在线阅读论文',
    readPdf: '打开本地 PDF',
    journal: '期刊',
    year: '发表年份',
    figureAlt: '论文图 1：OmicsSuite 原生创新框架架构，以及与 Posit Shiny 框架的集成',
    figureCaption: 'Figure 1 · OmicsSuite 原生创新框架架构，以及与 Posit Shiny 框架的集成；箭头标识执行步骤、数据输入与结果输出。',
    figureKicker: '论文图解',
    figureTitle: '把论文里的图，放在能看清的地方。',
    figureDescription: '从界面架构到应用全景，再到基因组与变异分析的真实输出。每张图都可对照正文阅读，也可直接打开原论文查看完整图注。',
    figureCredit: '图片取自 Miao et al., Horticulture Research 2023, uhad195，遵循 CC BY 4.0 许可。',
    zoomHint: '点击放大',
    readingKicker: '论文速读',
    readingTitle: '四件论文真正解决的事。',
    readingDescription: '不只看结论，也看方法如何被组织成一条可执行的分析路径。',
    citationKicker: '引用与可追溯性',
    citationTitle: '引用方法，也引用支撑方法的研究。',
    citationDescription: '在论文、报告或分析记录中引用 OmicsSuite 时，可使用以下文献信息。软件内各程序的 References 信息栏还提供对应方法与工具的参考文献。',
    citation: '推荐引用格式',
    noteTitle: '从论文方法，回到可操作的软件教程。',
    noteDescription: 'Documents 按研究分类组织学习路径，并提供当前程序信息栏与真实示例图。',
    noteAction: '查看分类教程',
  },
  en: {
    peerReviewed: 'Peer-reviewed · Open Access',
    abstract: 'OmicsSuite integrates <strong>statistics and multi-omics analysis</strong> into one desktop suite: at publication it shipped <strong>12 categories and 175 sub-applications</strong> spanning sequence, statistics, algorithms, genomics, transcriptomics, enrichment, proteomics, metabolomics, clinical, microorganism, single-cell and table operations, with <strong>over 300 adjustable parameter interfaces</strong>. It reads <strong>FASTA, FastQ, MAF, mzML and HDF5</strong> directly, and produces publication-ready figures and tables.',
    readOnline: 'Read the paper online',
    readPdf: 'Open local PDF',
    journal: 'Journal',
    year: 'Publication year',
    figureAlt: 'Figure 1: the OmicsSuite native innovation framework architecture and its integration with the Posit Shiny framework',
    figureCaption: 'Figure 1 · The OmicsSuite native innovation framework architecture and its integration with the Posit Shiny framework; arrows mark execution steps, dataset inputs and result outputs.',
    figureKicker: 'Figures, up close',
    figureTitle: 'The figures, where you can actually read them.',
    figureDescription: 'From interface architecture to the full application map, and real outputs for genome and variation analysis. Each figure sits beside the paper, and the original captions remain one click away.',
    figureCredit: 'Figures from Miao et al., Horticulture Research 2023, uhad195, licensed under CC BY 4.0.',
    zoomHint: 'Click to zoom',
    readingKicker: 'Paper in brief',
    readingTitle: 'Four things the paper actually settles.',
    readingDescription: 'Not just the conclusion — how the methods are arranged into an executable analysis path.',
    citationKicker: 'Citation and traceability',
    citationTitle: 'Cite the method and the research behind it.',
    citationDescription: 'Use the reference below when citing OmicsSuite in papers, reports or analysis records. Each program’s References panel also provides method- and tool-specific literature.',
    citation: 'Suggested citation',
    noteTitle: 'Move from paper methods to hands-on tutorials.',
    noteDescription: 'Documents organizes learning paths by research category with current program information and real examples.',
    noteAction: 'View category guides',
  },
}
const c = computed(() => copy[pick('zh', 'en')])

const highlights = [
  { value: '175', labelZh: '论文中的子应用', labelEn: 'sub-applications', noteZh: '12 个类别，现已扩展到 181 个应用', noteEn: '12 categories, now expanded to 181 apps' },
  { value: '300+', labelZh: '可调参数接口', labelEn: 'parameter interfaces', noteZh: '统一主题、配色与图像尺寸', noteEn: 'Unified themes, palettes and figure sizes' },
  { value: '8+', labelZh: '直接读取的数据格式', labelEn: 'native input formats', noteZh: 'FASTA、FastQ、MAF、mzML、HDF5 等', noteEn: 'FASTA, FastQ, MAF, mzML, HDF5 and more' },
]
const figures = [
  {
    src: 'publication-ui.jpg', icon: 'panel-left', labelZh: 'Figure 2', labelEn: 'Figure 2',
    titleZh: '一次运行，三段式界面。', titleEn: 'One run, a three-part interface.',
    descZh: '上方是主菜单与类别导航，中间是数据表与参数区，下方是结果预览与下载；子程序界面沿用同一套结构。',
    descEn: 'Menus and category navigation on top, data table and parameters in the middle, results and downloads below — the same structure across every sub-application.',
    altZh: '论文图 2：软件主界面与子程序界面的布局', altEn: 'Figure 2: layout of the main and sub-application interfaces',
  },
  {
    src: 'publication-categories.jpg', icon: 'network', labelZh: 'Figure 3', labelEn: 'Figure 3',
    titleZh: '175 个应用，一张可读的地图。', titleEn: '175 applications on one readable map.',
    descZh: '按 12 个类别展开的应用全景：序列、统计、算法、基因组、转录组、富集、蛋白组、代谢组、临床、微生物、单细胞、表格操作。',
    descEn: 'The full application map across 12 categories: sequence, statistics, algorithms, genomics, transcriptomics, enrichment, proteomics, metabolomics, clinical, microorganism, single-cell and table operations.',
    altZh: '论文图 3：OmicsSuite 12 个类别与子应用全景图', altEn: 'Figure 3: overview of 12 categories and sub-applications',
  },
  {
    src: 'publication-genome.jpg', icon: 'scatter-plot', labelZh: 'Figure 4', labelEn: 'Figure 4',
    titleZh: '从基因组到 GWAS 的真实输出。', titleEn: 'Real output, from genome to GWAS.',
    descZh: '核基因组、线粒体与叶绿体环状图，染色体层级共线性，MAF 突变谱与 SNP 曼哈顿图，均由软件直接产出。',
    descEn: 'Circular plots for nuclear, mitochondrial and chloroplast genomes, chromosome-level collinearity, MAF mutation spectra and SNP Manhattan plots — all produced directly by the suite.',
    altZh: '论文图 4：基因组与变异分析的真实输出', altEn: 'Figure 4: genome and variation analysis outputs',
  },
]
const readingPoints = [
  {
    icon: 'app-window-mac',
    zhTitle: '一个工作空间，而不是一堆命令行。', enTitle: 'One workspace instead of a pile of command lines.',
    zh: 'JavaFX 负责界面与交互，R 负责分析与绘图，两者通过进程间通信协同，用户只需安装二进制文件。',
    en: 'JavaFX handles the interface, R handles analysis and plotting, and the two cooperate over inter-process messaging — users install a binary, not a toolchain.',
  },
  {
    icon: 'sliders-horizontal',
    zhTitle: '参数是界面的一部分。', enTitle: 'Parameters are part of the interface.',
    zh: '300 多个参数接口统一了主题、字体、配色与图像尺寸，让同一份结果在不同期刊格式下都能直接使用。',
    en: 'More than 300 parameter interfaces unify themes, fonts, palettes and figure sizes, so one result can meet different journal formats.',
  },
  {
    icon: 'files',
    zhTitle: '格式转换发生在流程里。', enTitle: 'Format conversion lives inside the pipeline.',
    zh: 'FASTA、FastQ、MAF、mzML、HDF5 等格式可直接读入，并在程序之间传递正确的数据方向与参数。',
    en: 'FASTA, FastQ, MAF, mzML and HDF5 are read directly, with the right data direction and parameters passed between programs.',
  },
  {
    icon: 'sprout',
    zhTitle: '面向植物育种与分子机制研究。', enTitle: 'Built for plant breeding and molecular mechanism studies.',
    zh: '论文以园艺植物为主要场景，给出从原始数据到可发表图表的逐步流程，让没有编程背景的研究者也能完成多组学分析。',
    en: 'Framed around horticultural plants, the paper lays out a step-by-step path from raw data to publishable figures, so researchers without a programming background can complete multi-omics analyses.',
  },
]
async function copyCitation() {
  await navigator.clipboard.writeText(citation)
  copied.value = true
  window.setTimeout(() => { copied.value = false }, 1800)
}
</script>

<style scoped>
.publication-page { padding-top: 92px; padding-bottom: 80px; }
.paper-hero { display: grid; grid-template-columns: minmax(0, 1fr) minmax(420px, 1fr); gap: clamp(34px, 3.5vw, 54px); align-items: start; }
.paper-copy { min-width: 0; }
.peer-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; color: var(--accent); background: color-mix(in srgb, var(--accent) 9%, var(--surface)); border: 1px solid color-mix(in srgb, var(--accent) 22%, var(--border)); border-radius: 999px; font-size: 12px; font-weight: 700; }
.paper-copy h1 { margin: 22px 0 18px; font-size: clamp(26px, 2.6vw, 34px); line-height: 1.16; letter-spacing: -.035em; text-wrap: balance; }
.paper-copy h1 .nowrap { white-space: nowrap; }
.journal-line { margin: 0; color: var(--accent); font-size: 14px; font-weight: 700; }
.author-line { margin: 12px 0 0; color: var(--muted); font-size: 13px; line-height: 1.8; }
.abstract { margin: 20px 0 0; color: var(--muted); font-size: 14.5px; line-height: 1.85; }
.abstract :deep(strong) { color: var(--ink); font-weight: 720; }
.paper-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 26px; }
.paper-visual { width: 100%; margin: 0; padding: 14px; background: var(--surface); border: 1px solid var(--border); }
.paper-visual :deep(.el-image) { display: block; width: 100%; overflow: hidden; border-radius: 12px; }
.paper-visual :deep(.el-image__inner) { display: block; width: 100%; cursor: zoom-in; border-radius: 12px; }
.paper-zoom { position: absolute; right: 24px; top: 24px; display: inline-flex; align-items: center; gap: 5px; padding: 5px 9px; border: 1px solid color-mix(in srgb, var(--accent) 24%, var(--border)); border-radius: 999px; color: var(--accent); background: color-mix(in srgb, var(--surface) 86%, transparent); font-size: 10px; font-weight: 700; backdrop-filter: blur(8px); opacity: 0; transform: translateY(3px); transition: opacity .3s var(--ease-soft), transform .3s var(--ease-soft); pointer-events: none; }
.paper-visual:hover .paper-zoom { opacity: 1; transform: none; }
.paper-visual figcaption { padding: 12px 4px 2px; color: var(--muted); font-size: 11.5px; line-height: 1.7; }
.highlight-band { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; margin-top: 62px; overflow: hidden; background: var(--border); border: 1px solid var(--border); border-radius: var(--radius-card); box-shadow: var(--shadow-soft); }
.highlight-item { display: grid; gap: 6px; padding: 26px 28px; background: var(--surface); transition: background .4s var(--ease-soft); }
.highlight-item:hover { background: color-mix(in srgb, var(--surface) 92%, var(--accent)); }
.highlight-item strong { font-size: 38px; line-height: 1; letter-spacing: -.04em; color: var(--accent); }
.highlight-item span { color: var(--ink); font-size: 13px; font-weight: 700; }
.highlight-item small { color: var(--muted); font-size: 11.5px; line-height: 1.6; }
.figure-section { padding-top: 96px; }
.figure-heading { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: end; margin-bottom: 30px; }
.figure-heading > div > span, .section-kicker { display: inline-flex; align-items: center; gap: 7px; color: var(--accent); font-size: 12px; font-weight: 700; }
.figure-heading h2 { margin: 10px 0 0; font-size: clamp(29px, 3.2vw, 42px); line-height: 1.18; letter-spacing: -.03em; }
.figure-heading > p { margin: 0; color: var(--muted); font-size: 14px; line-height: 1.8; }
.figure-grid { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr) minmax(0, 1.05fr); gap: 18px; }
.figure-card { position: relative; display: flex; flex-direction: column; margin: 0; padding: 12px 12px 20px; background: var(--surface); border: 1px solid var(--border); border-radius: 22px; transition: transform .5s var(--ease-soft), box-shadow .5s var(--ease-soft), border-color .5s var(--ease-soft); }
.figure-card:hover { transform: translateY(-6px); border-color: color-mix(in srgb, var(--accent) 30%, var(--border)); box-shadow: 0 28px 56px color-mix(in srgb, var(--accent) 16%, rgba(18, 52, 41, .14)), 0 8px 18px color-mix(in srgb, var(--accent) 8%, transparent); z-index: 2; }
.figure-media { position: relative; display: grid; place-items: center; overflow: hidden; aspect-ratio: 1 / 1; background: #ffffff; border-radius: 18px; }
.figure-media :deep(.el-image) { width: 100%; height: 100%; border-radius: 18px; overflow: hidden; }
.figure-media :deep(.el-image__inner) { cursor: zoom-in; border-radius: 18px; }
.figure-card:hover .figure-media :deep(.el-image__inner) { transform: scale(1.045); }
.zoom-hint { position: absolute; right: 10px; bottom: 10px; display: inline-flex; align-items: center; gap: 5px; padding: 5px 9px; color: var(--accent); background: color-mix(in srgb, #ffffff 82%, transparent); border: 1px solid color-mix(in srgb, var(--accent) 24%, var(--border)); border-radius: 999px; font-size: 10px; font-weight: 700; backdrop-filter: blur(8px); opacity: 0; transform: translateY(4px); transition: opacity .35s var(--ease-soft), transform .35s var(--ease-soft); pointer-events: none; }
.figure-card:hover .zoom-hint { opacity: 1; transform: translateY(0); }
.figure-media img { width: 100%; height: 100%; object-fit: contain; }
.figure-card figcaption { padding: 16px 6px 0; }
.figure-card figcaption > span { display: inline-flex; align-items: center; gap: 7px; color: var(--accent); font-size: 11px; font-weight: 700; letter-spacing: .04em; }
.figure-card figcaption > span .glass-icon { animation: title-icon-float 4.6s cubic-bezier(.22, 1, .36, 1) infinite alternate; }
.figure-card h3 { margin: 6px 0 8px; font-size: 19px; line-height: 1.3; }
.figure-card p { margin: 0; color: var(--muted); font-size: 12.5px; line-height: 1.75; }
.figure-credit { margin: 20px 0 0; color: var(--muted); font-size: 11px; text-align: right; }
.reading-section { display: grid; grid-template-columns: .85fr 1.15fr; gap: 60px; padding-top: 96px; align-items: stretch; }
.reading-copy { display: flex; flex-direction: column; min-width: 0; min-height: 100%; }
.reading-copy h2 { margin: 10px 0 14px; font-size: clamp(28px, 3vw, 38px); line-height: 1.2; }
.reading-copy p { margin: 0; color: var(--muted); line-height: 1.8; }
.reading-mark { display: grid; place-items: center; width: 56px; height: 56px; margin-top: auto; color: var(--accent); background: linear-gradient(150deg, color-mix(in srgb, var(--surface) 84%, var(--accent)), var(--surface-2)); border: 1px solid color-mix(in srgb, var(--accent) 18%, var(--border)); border-radius: 16px; box-shadow: 0 14px 30px color-mix(in srgb, var(--accent) 10%, transparent), inset 0 1px 0 #ffffff; opacity: .85; }
.reading-list { display: grid; gap: 12px; padding: 0; margin: 0; list-style: none; }
.reading-list li { position: relative; display: grid; grid-template-columns: 40px minmax(0, 1fr); gap: 14px; align-items: start; padding: 17px 48px 17px 16px; overflow: hidden; background: linear-gradient(150deg, color-mix(in srgb, var(--surface-2) 96%, var(--accent)), var(--surface-2) 58%, color-mix(in srgb, var(--surface-2) 94%, var(--accent))); border: 1px solid color-mix(in srgb, var(--accent) 10%, var(--border)); border-radius: 16px; box-shadow: 0 2px 4px color-mix(in srgb, var(--accent) 4%, transparent); transition: transform .4s var(--ease-soft), border-color .4s var(--ease-soft), box-shadow .4s var(--ease-soft); }
.reading-list li::before { content: ''; position: absolute; left: 0; top: 18px; bottom: 18px; width: 3px; background: var(--accent); border-radius: 0 3px 3px 0; opacity: .4; }
.reading-list li:hover { transform: translateY(-3px); border-color: color-mix(in srgb, var(--accent) 28%, var(--border)); box-shadow: 0 16px 32px color-mix(in srgb, var(--accent) 10%, rgba(18, 52, 41, .08)); }
.reading-icon { display: grid; place-items: center; width: 40px; height: 40px; color: var(--accent); background: color-mix(in srgb, var(--surface) 72%, var(--accent)); border: 1px solid color-mix(in srgb, var(--accent) 18%, var(--border)); border-radius: 12px; box-shadow: inset 0 1px 0 #ffffff; transition: transform .4s var(--ease-soft), background .4s var(--ease-soft), color .4s var(--ease-soft); }
.reading-list li:hover .reading-icon { transform: translateY(-1px) rotate(-4deg); color: #ffffff; background: var(--accent); }
.reading-text strong { font-size: 14px; }
.reading-text p { margin: 5px 0 0; color: var(--muted); font-size: 12.5px; line-height: 1.75; }
.reading-num { position: absolute; top: 14px; right: 16px; color: var(--accent); font-size: 10px; font-weight: 750; letter-spacing: .1em; opacity: .65; }
.citation-section { display: grid; grid-template-columns: .8fr 1.2fr; gap: 55px; align-items: start; padding: 95px 0 0; }
.citation-copy { min-width: 0; }
.citation-copy h2 { margin: 11px 0 16px; font-size: 36px; line-height: 1.2; }
.citation-copy p { color: var(--muted); line-height: 1.8; }
.author-list { margin-top: 25px; padding-top: 0; color: var(--muted); font-size: 13px; line-height: 1.9; }
.citation-box { position: relative; overflow: hidden; padding: 28px; background: linear-gradient(155deg, color-mix(in srgb, var(--surface-2) 92%, var(--accent)), var(--surface-2) 60%, color-mix(in srgb, var(--surface) 90%, var(--accent))); border: 1px solid color-mix(in srgb, var(--accent) 16%, var(--border)); border-radius: 20px; box-shadow: 0 22px 46px color-mix(in srgb, var(--accent) 9%, rgba(18, 52, 41, .10)), inset 0 1px 0 #ffffff; }
.citation-box::after { content: ''; position: absolute; right: -45px; bottom: -70px; width: 210px; height: 210px; background: radial-gradient(circle, color-mix(in srgb, var(--accent) 18%, transparent), transparent 68%); pointer-events: none; }
.citation-head { position: relative; z-index: 1; display: flex; align-items: center; gap: 12px; }
.citation-head strong { margin-right: auto; color: var(--ink); font-size: 13.5px; }
.citation-mark { display: grid; place-items: center; width: 34px; height: 34px; color: var(--accent); background: color-mix(in srgb, var(--surface) 78%, var(--accent)); border: 1px solid color-mix(in srgb, var(--accent) 18%, var(--border)); border-radius: 10px; box-shadow: inset 0 1px 0 #ffffff; }
.citation-box button { position: relative; z-index: 1; display: inline-flex; align-items: center; gap: 6px; padding: 8px 11px; color: var(--accent); background: color-mix(in srgb, var(--surface) 88%, var(--accent)); border: 1px solid color-mix(in srgb, var(--accent) 18%, var(--border)); border-radius: 10px; cursor: pointer; box-shadow: 0 4px 10px color-mix(in srgb, var(--accent) 6%, transparent); transition: border-color .3s var(--ease-soft), background .3s var(--ease-soft), transform .3s var(--ease-soft); }
.citation-box button:hover { transform: translateY(-1px); border-color: color-mix(in srgb, var(--accent) 42%, var(--border)); background: color-mix(in srgb, var(--accent) 9%, var(--surface)); }
.citation-box p { position: relative; z-index: 1; margin: 22px 0 0; padding-top: 20px; color: var(--muted); border-top: 1px solid color-mix(in srgb, var(--accent) 14%, var(--border)); font-size: 13.5px; line-height: 1.95; }
@media (max-width: 1050px) { .paper-hero { display: block; } .paper-visual { width: 100%; max-width: 640px; margin-top: 34px; } .figure-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .figure-grid .figure-card:first-child { grid-column: 1 / -1; } .reading-section { grid-template-columns: 1fr; gap: 28px; } .reading-copy { max-width: 640px; min-height: 0; } .reading-mark { margin-top: 24px; } }
@media (max-width: 850px) { .figure-heading { grid-template-columns: 1fr; gap: 14px; align-items: start; } .highlight-band { grid-template-columns: 1fr; } .highlight-item { grid-template-columns: auto 1fr; align-items: baseline; column-gap: 14px; } .highlight-item small { grid-column: 2; } .citation-section { grid-template-columns: 1fr; gap: 30px; padding-top: 70px; } .citation-copy { min-height: 0; } }
@media (max-width: 620px) { .paper-zoom { opacity: 1; transform: none; right: 22px; top: 22px; } .publication-page { padding-top: 56px; } .figure-grid { grid-template-columns: 1fr; } .figure-grid .figure-card:first-child { grid-column: auto; } .paper-actions { display: grid; grid-template-columns: 1fr; } .paper-actions .button { width: 100%; } .figure-section, .reading-section { padding-top: 70px; } .citation-copy { min-width: 0; }
.citation-copy h2 { font-size: 29px; } }
</style>
