<template>
  <div class="documents-page">





    <section id="scatterplot-guide" class="docs-section interface-section">
      <div class="container">
        <div class="docs-heading">
          <span class="docs-kicker"><GlassIcon name="panel-left" :size="30" />{{ c.realInterface }}</span>
        </div>
        <div class="interface-layout">
          <span class="depth-orb orb-a" aria-hidden="true"></span>
          <span class="depth-orb orb-b" aria-hidden="true"></span>
          <figure class="interface-figure">
            <el-image
              :src="asset('OmicsSuite-ScatterPlot-UI.png')"
              :preview-src-list="[asset('OmicsSuite-ScatterPlot-UI.png')]"
              preview-teleported
              fit="contain"
              :alt="c.scatterImageAlt"
            />
            <figcaption><span class="live-dot"></span>{{ c.currentSource }}</figcaption>
          </figure>
          <div class="interface-notes">
            <article v-for="(note, index) in interfaceNotes.slice(0, 3)" :key="note.titleZh">
              <span>{{ index + 1 }}</span>
              <div><h3>{{ pick(note.titleZh, note.titleEn) }}</h3><p>{{ pick(note.descZh, note.descEn) }}</p></div>
            </article>
          </div>
        </div>
      </div>
    </section>


    <section id="app-catalog" class="docs-section container catalog-section">
      <div class="docs-heading catalog-heading">
        <div><span class="docs-kicker"><GlassIcon name="database" :size="30" />{{ c.catalogKicker }}</span></div>
        <strong>{{ filteredApplications.length }} {{ c.results }}</strong>
      </div>
      <div class="catalog-body">
        <aside class="catalog-filters" :aria-label="c.filterCategory">
          <div class="catalog-toolbar">
            <el-input v-model="query" clearable :placeholder="c.searchPlaceholder" size="large">
              <template #prefix><GlassIcon name="search" :size="19" /></template>
            </el-input>
            <el-select v-model="activeCategory" size="large" :aria-label="c.filterCategory">
              <el-option :label="c.allCategories" value="all" />
              <el-option v-for="category in applicationCategories" :key="category.id" :label="`${pick(category.zh, category.en)} (${categoryCount(category.id)})`" :value="category.id" />
            </el-select>
          </div>
          <div class="category-chips" role="group" :aria-label="c.filterCategory">
            <button :class="{ active: activeCategory === 'all' }" @click="activeCategory = 'all'"><span class="category-option-label"><GlassIcon name="layers" :size="17" />{{ c.all }}</span></button>
            <button v-for="category in applicationCategories" :key="category.id" :class="{ active: activeCategory === category.id }" @click="activeCategory = category.id"><span class="category-option-label"><GlassIcon :name="categoryIcon(category.id)" :size="17" />{{ pick(category.zh, category.en) }}</span><span class="category-count">{{ categoryCount(category.id) }}</span></button>
          </div>
        </aside>
        <div class="catalog-results">
          <el-empty v-if="!filteredApplications.length" :description="c.noResults" />
          <div v-else class="application-list">
        <article v-for="app in pagedApplications" :key="app.id" class="application-card">
          <div class="application-content">
            <div class="application-title-row">
              <div class="application-heading">
                <span class="application-category"><GlassIcon :name="categoryIcon(app.category)" :size="15" />{{ categoryName(app.category) }}</span>
                <h3 class="application-name"><GlassIcon :name="applicationIcon(app)" :size="24" />{{ app.name }}</h3>
              </div>
              <span class="source-badge">{{ app.source }}</span>
            </div>
            <p class="application-description">{{ pick(app.descriptionZh, app.descriptionEn) }}</p>
            <div class="application-details">
              <p class="application-details-title">{{ c.infoPanel }}</p>
              <dl>
                <div><dt><GlassIcon name="upload" :size="17" />{{ c.input }}</dt><dd>{{ pick(app.inputZh, app.inputEn) }}</dd></div>
                <div><dt><GlassIcon name="download" :size="17" />{{ c.output }}</dt><dd>{{ pick(app.outputZh, app.outputEn) }}</dd></div>
                <div><dt><GlassIcon name="lightbulb" :size="17" />{{ c.tip }}</dt><dd>{{ pick(app.tipZh, app.tipEn) }}</dd></div>
              </dl>
            </div>
          </div>
          <figure class="application-figure" @pointermove="tiltFigure" @pointerleave="resetFigure">
            <el-image :src="asset(app.image)" :preview-src-list="[asset(app.image)]" preview-teleported fit="contain" lazy :alt="`${app.name} ${c.exampleImage}`">
              <template #error><div class="image-error"><GlassIcon name="image" :size="25" />{{ c.imageUnavailable }}</div></template>
            </el-image>
          </figure>
        </article>
          </div>
          <el-pagination
            v-if="filteredApplications.length > pageSize"
            v-model:current-page="currentPage"
            :page-size="pageSize"
            :total="filteredApplications.length"
            layout="prev, pager, next"
            :prev-icon="PrevPageIcon"
            :next-icon="NextPageIcon"
            background
            class="catalog-pagination"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, h, ref, watch } from 'vue'
import GlassIcon from '../components/GlassIcon.vue'
import { applications, applicationCategories } from '../data/applications.js'
import { stats } from '../data/content.js'
import { useI18n } from '../i18n.js'

const { pick } = useI18n()
const query = ref('')
const activeCategory = ref('all')
const activeGuide = ref('sequence')
const currentPage = ref(1)
const pageSize = 5
const PrevPageIcon = { name: 'PrevPageIcon', render: () => h(GlassIcon, { name: 'arrow-left', size: 18 }) }
const NextPageIcon = { name: 'NextPageIcon', render: () => h(GlassIcon, { name: 'arrow-right', size: 18 }) }
const asset = (name) => `${import.meta.env.BASE_URL}assets/images/${name}`
const categoryIcon = (id) => ({ sequence: 'sequence', statistics: 'chart-column', algorithm: 'brain-circuit', genomics: 'dna', transcriptomics: 'rna', enrichment: 'enrichment', proteomics: 'protein', metabolomics: 'metabolite', clinical: 'clinical', microorganisms: 'microorganism', singlecell: 'cell', mathematics: 'mathematics', table: 'spreadsheet' }[id] || 'flask-conical')
const applicationIcon = (app) => {
  const key = `${app.id} ${app.name} ${app.nameZh}`.toLowerCase()
  if (/tutorial|quick.?start/.test(key)) return 'book-open'
  if (/revcom|sequence|fasta|seqs|translate|motif|alignment|\bmsa\b/.test(key)) return 'sequence'
  if (/tree|phylo|dendro/.test(key)) return 'workflow'
  if (/volcano|scatter|umap|tsne|pca/.test(key)) return 'scatter-plot'
  if (/heatmap|matrix/.test(key)) return 'chart-column'
  if (/correlation|trend|lineplot|linechart/.test(key)) return 'chart-line'
  if (/cluster|network|wgcna|ppi/.test(key)) return 'network'
  if (/enrich|kegg|gsea|goanalysis/.test(key)) return 'enrichment'
  if (/genome|variant|synteny|maf/.test(key)) return 'dna'
  if (/protein|peptide/.test(key)) return 'protein'
  if (/metabo|opls|massspect|\bmz\b/.test(key)) return 'metabolite'
  if (/cell|spatial|trajectory|monocle|marker/.test(key)) return 'cell'
  if (/survival|\broc\b|clinical|forest/.test(key)) return 'clinical'
  if (/table|merge|melt|cast|outlier|missing/.test(key)) return 'spreadsheet'
  if (/image|diagram|editor/.test(key)) return 'image'
  return categoryIcon(app.category)
}
const categoryCount = (id) => applications.filter((app) => app.category === id).length
const categoryName = (id) => {
  const category = applicationCategories.find((item) => item.id === id)
  return category ? pick(category.zh, category.en) : id
}
const filteredApplications = computed(() => {
  const term = query.value.trim().toLowerCase()
  return applications.filter((app) => (activeCategory.value === 'all' || app.category === activeCategory.value) && (!term || [app.name, app.nameZh, app.descriptionZh, app.descriptionEn, app.source].join(' ').toLowerCase().includes(term)))
})
const pagedApplications = computed(() => filteredApplications.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize))
watch([query, activeCategory], () => { currentPage.value = 1 })
function tiltFigure(event) {
  if (event.pointerType === 'touch') return
  const el = event.currentTarget
  const rect = el.getBoundingClientRect()
  const px = (event.clientX - rect.left) / rect.width - 0.5
  const py = (event.clientY - rect.top) / rect.height - 0.5
  el.style.setProperty('--ry', `${(px * 9).toFixed(2)}deg`)
  el.style.setProperty('--rx', `${(-py * 7).toFixed(2)}deg`)
}
function resetFigure(event) {
  const el = event.currentTarget
  el.style.setProperty('--ry', '0deg')
  el.style.setProperty('--rx', '0deg')
}
function jumpTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
function filterCategory(id) {
  activeCategory.value = id
  document.querySelector('#app-catalog')?.scrollIntoView({ behavior: 'smooth' })
}

const copy = {
  zh: {
    eyebrow: 'Documents · 从界面到分析', title: '学会一个程序，就能读懂整个工作空间。', description: '先通过 ScatterPlot 认识通用界面，再按研究分类学习方法。完整目录汇集当前源码中的程序说明、输入输出提示与真实示例图，无需在 {apps} 个独立页面之间跳转。', startExample: '从界面示例开始', browseApps: '检索应用目录', appCount: '源码程序条目', categoryCount: '研究与工具分类', sharedPattern: '套通用操作逻辑', pageNav: '文档页内导航', quickstart: '快速开始', interfaceGuide: '界面示例', categoryGuides: '分类教程', appCatalog: '应用目录',
    quickstartKicker: '01 · 快速开始', quickstartTitle: '先验证流程，再运行自己的数据。', quickstartDescription: '多数程序共享“输入—参数—运行—输出”的结构。用示例文件排除格式问题，是更稳妥的第一步。',
    realInterface: '01 · 最新软件真实界面', scatterTitle: '以 ScatterPlot 为例，读懂四个界面区域。', scatterDescription: '以下截图直接来自当前 JavaFX 源码运行窗口。其他表格型程序也沿用相似的布局与操作顺序。', scatterImageAlt: 'OmicsSuite 当前 ScatterPlot 程序界面', currentSource: '当前源码运行截图 · ScatterPlot · 中文界面',
    outputLabel: '运行与下载', outputTitle: '从示例结果，到可保存的图件。', outputDescription: '点击 Submit 后，Progress 显示任务状态，结果图出现在 Output 区域。ScatterPlot 提供 PDF Download 与 JPEG Download；其他程序的结果格式以各自页面按钮为准。', outputPointA: 'PDF 适合保留矢量图并用于后续排版。', outputPointB: 'JPEG 适合快速预览、汇报和共享。', outputPointC: '下载前确认标题、坐标轴、分组、尺寸与 DPI。', outputImageAlt: 'ScatterPlot 程序示例输出图',
    categoryKicker: '03 · 按研究问题学习', categoryTitle: '分类教程，而不是重复的按钮说明。', categoryDescription: '每一类先理解数据和分析目标，再从目录选择具体程序。切换左侧分类查看推荐学习顺序。', viewCategory: '查看此类全部程序',
    catalogKicker: '02 · 完整应用目录', catalogTitle: '名称、说明、输入输出与示例图，在一页查齐。', catalogDescription: '按分类筛选或搜索中英文名称。展开“信息栏”查看使用提示，点击示例图可放大。', results: '个匹配程序', searchPlaceholder: '搜索程序名称、功能或源文件…', filterCategory: '按分类筛选', allCategories: '全部分类', all: '全部', noResults: '没有匹配的程序，请尝试缩短关键词或切换分类。', infoPanel: '信息栏 · 输入 / 输出 / 使用提示', input: '输入', output: '输出', tip: '使用提示', exampleImage: '程序示例图', clickEnlarge: '点击放大', imageUnavailable: '示例图暂不可用',
  },
  en: {
    eyebrow: 'Documents · From interface to analysis', title: 'Learn one program. Understand the whole workspace.', description: 'Start with ScatterPlot to learn the shared interface, then explore methods by research category. The catalog brings current source descriptions, input/output guidance and real example images together—without {apps} separate pages.', startExample: 'Start with the interface', browseApps: 'Browse application catalog', appCount: 'source program entries', categoryCount: 'research and tool categories', sharedPattern: 'shared interaction pattern', pageNav: 'Documentation navigation', quickstart: 'Quick start', interfaceGuide: 'Interface guide', categoryGuides: 'Category guides', appCatalog: 'Application catalog',
    quickstartKicker: '01 · Quick start', quickstartTitle: 'Validate the workflow before running your own data.', quickstartDescription: 'Most programs share an Input–Options–Run–Output structure. Example files help separate data-format issues from analysis questions.',
    realInterface: '01 · Software interface', scatterTitle: 'Read four interface regions through ScatterPlot.', scatterDescription: 'This screenshot comes directly from the current JavaFX source running locally. Other table-based programs follow a similar layout and sequence.', scatterImageAlt: 'Current OmicsSuite ScatterPlot interface', currentSource: 'Current source screenshot · ScatterPlot · software UI',
    outputLabel: 'Run and download', outputTitle: 'From an example result to a saved figure.', outputDescription: 'Select Submit to start. Progress reports task status and the figure appears in Output. ScatterPlot provides PDF Download and JPEG Download; other programs show their own available formats.', outputPointA: 'PDF preserves vector artwork for later layout.', outputPointB: 'JPEG is convenient for previews, talks and sharing.', outputPointC: 'Check title, axes, groups, dimensions and DPI before export.', outputImageAlt: 'ScatterPlot example output',
    categoryKicker: '03 · Learn by research question', categoryTitle: 'Category guides instead of repeated button instructions.', categoryDescription: 'Understand the data and analytical goal for each category before choosing a program from the catalog.', viewCategory: 'View all programs in this category',
    catalogKicker: '02 · Application catalog', catalogTitle: 'Names, descriptions, input/output and examples on one page.', catalogDescription: 'Filter by category or search names and descriptions. Expand the information panel for guidance and select an image to enlarge it.', results: 'matching programs', searchPlaceholder: 'Search name, function or source file…', filterCategory: 'Filter by category', allCategories: 'All categories', all: 'All', noResults: 'No matching programs. Try a shorter query or another category.', infoPanel: 'Information · Input / output / guidance', input: 'Input', output: 'Output', tip: 'Guidance', exampleImage: 'Program example', clickEnlarge: 'Select to enlarge', imageUnavailable: 'Example image unavailable',
  },
}
const c = computed(() => {
  const base = copy[pick('zh', 'en')]
  return Object.fromEntries(Object.entries(base).map(([key, value]) => [key, value.replaceAll('{apps}', String(stats.apps))]))
})

const quickstartSteps = [
  { icon: 'download', titleZh: '安装并打开程序', titleEn: 'Install and open a program', descZh: '从下载页获取桌面版，在左侧分类中浏览或搜索所需程序。', descEn: 'Get the desktop release, then browse or search the category sidebar for a program.' },
  { icon: 'file-text', titleZh: '先加载示例', titleEn: 'Load the example first', descZh: '优先使用 DemoFile 或 Demo，观察示例数据的列名、顺序和分组方式。', descEn: 'Use DemoFile or Demo to inspect example columns, order and group encoding.' },
  { icon: 'sliders-horizontal', titleZh: '设置参数并运行', titleEn: 'Set options and run', descZh: '按研究问题调整参数，点击 Submit，等待 Progress 完成。', descEn: 'Adjust options for the research question, select Submit and wait for Progress to finish.' },
  { icon: 'check-check', titleZh: '检查并下载', titleEn: 'Review and download', descZh: '先核对图件与结果表，再使用结果区提供的下载按钮保存。', descEn: 'Review figures and result tables before saving with the provided download controls.' },
]
const formats = [
  { name: 'TXT / CSV', zh: '常见表格输入。首行通常为列名，注意分隔符、缺失值与分组列。', en: 'Common table inputs. Check the header row, delimiter, missing values and group columns.' },
  { name: 'FASTA', zh: '常见序列输入。确认序列标识与字母表，混合作品前先检查格式。', en: 'Common sequence input. Verify identifiers and alphabet before combining records.' },
  { name: '示例数据', nameEn: 'Example data', zh: '通过 DemoFile 和 Datasets 仓库学习预期结构，不要直接猜测列格式。', en: 'Use DemoFile and the Datasets repository to learn expected structures instead of guessing.' },
]
const interfaceNotes = [
  { titleZh: '输入数据与上传', titleEn: 'Input data and upload', descZh: 'Data Table 用于预览数据。拖拽文件到上传区或点击 Browser 选择本地文件；DemoFile 可加载 Iris 示例，文件名显示在按钮旁。', descEn: 'Preview records in Data Table. Drag a file to the upload area or use Browser; DemoFile loads the Iris example and the selected filename appears nearby.' },
  { titleZh: '参数组件', titleEn: 'Parameter components', descZh: 'Progress、Demo、Clear、Submit 位于参数区起始位置。下方提供字体、主题、配色、图宽、图高和 DPI 等组件；继续滚动可设置散点、坐标轴和图例。', descEn: 'Progress, Demo, Clear and Submit appear first. Controls below cover fonts, themes, colors, width, height and DPI; scroll further for points, axes and legends.' },
  { titleZh: '运行、结果与下载', titleEn: 'Run, results and download', descZh: 'Submit 执行任务，Clear 清理当前设置。向下滚动到 Output 查看图件，并使用 PDF Download 或 JPEG Download 保存；不要只凭缩略图判断结果。', descEn: 'Submit runs the task and Clear resets the current setup. Scroll to Output to inspect the figure and save with PDF Download or JPEG Download; do not judge results from the thumbnail alone.' },
]
const guides = {
  sequence: [{ zh: '先检查 FASTA 标识、序列长度和字符集，必要时用表格工具整理标识。', en: 'Check FASTA identifiers, sequence lengths and alphabets; clean identifiers with table tools if needed.' }, { zh: '组成分析可先看 GC 与长度；比较同源区域时再选择长序列或短序列比对。', en: 'Start composition studies with GC and length; choose long- or short-sequence alignment for homologous regions.' }, { zh: '用 Motif、定位和结构程序跟进具体问题，并保留清理后的序列作为输入。', en: 'Follow with motif, mapping or structure programs for specific questions and retain cleaned sequences as input.' }],
  statistics: [{ zh: '先检查变量类型、缺失值、异常值和样本分组，再决定统计方法。', en: 'Inspect variable types, missing values, outliers and sample groups before choosing a method.' }, { zh: '用散点、直方图、箱线图和相关分析理解分布，不只报告一个 P 值。', en: 'Use scatterplots, histograms, boxplots and correlation to understand distributions, not just a P value.' }, { zh: '聚类和 PCA 用于探索结构；解释结果时结合分组信息并检查离群样本。', en: 'Use clustering and PCA for structure; interpret them with group information and inspect outliers.' }],
  algorithm: [{ zh: '明确样本、特征和预测目标，区分探索性聚类与有监督学习。', en: 'Define samples, features and prediction goals; distinguish exploratory clustering from supervised learning.' }, { zh: '网络分析前先筛选高质量特征，避免把全部变量无差别送入模型。', en: 'Filter high-quality features before network analysis instead of sending every variable into a model.' }, { zh: '报告参数、随机性与验证方式；可重复运行以检查结果稳定性。', en: 'Report parameters, randomness and validation; rerun to check result stability.' }],
  genomics: [{ zh: '先统一参考基因组版本、染色体命名和坐标体系。', en: 'Standardize the reference assembly, chromosome naming and coordinate system first.' }, { zh: '从染色体分布或全基因组视图定位模式，再进入局部区域和基因结构。', en: 'Locate patterns with chromosome or genome-wide views before moving to local regions and gene models.' }, { zh: '变异和共线性结果需要结合注释与样本信息解释，示例图用于核对布局。', en: 'Interpret variant and synteny results with annotation and sample context; use examples to verify layouts.' }],
  transcriptomics: [{ zh: '确认表达矩阵的行是基因、列是样本，并准备一致的样本分组表。', en: 'Confirm genes are rows and samples are columns, with a matching sample-group table.' }, { zh: '先做 PCA、相关或热图检查重复样本，再进行差异表达和趋势分析。', en: 'Inspect replicates with PCA, correlation or heatmaps before differential expression and trend analysis.' }, { zh: '将差异基因接入功能富集，并用火山图和热图核对效应方向与显著性。', en: 'Connect differential genes to enrichment and verify effect direction and significance with volcano plots and heatmaps.' }],
  enrichment: [{ zh: '准备与背景匹配的基因标识，区分上调、下调或全部候选基因。', en: 'Prepare identifiers matching the background and distinguish up-, down- or all candidate genes.' }, { zh: '先运行 GO 或 KEGG 富集，再用气泡图、柱状图和网络图比较通路。', en: 'Run GO or KEGG enrichment first, then compare pathways with bubble, bar and network views.' }, { zh: '阅读校正后的显著性、基因数量和比例，避免只按通路名称挑选结果。', en: 'Read adjusted significance, gene count and ratio; do not select pathways by name alone.' }],
  proteomics: [{ zh: '统一蛋白标识与定量列，记录缺失值和过滤规则。', en: 'Standardize protein identifiers and quantitative columns; record missing values and filtering rules.' }, { zh: '先检查样本关系与差异蛋白，再进入结构、修饰或相互作用分析。', en: 'Inspect sample relationships and differential proteins before structure, modification or interaction analysis.' }, { zh: '将蛋白列表与转录组或功能富集结果对照时，先完成标识映射。', en: 'Map identifiers before comparing protein lists with transcriptomic or enrichment results.' }],
  metabolomics: [{ zh: '确认峰表包含何种质荷比、保留时间和定量信息，检查样本顺序。', en: 'Confirm which m/z, retention-time and quantitative fields the peak table contains; check sample order.' }, { zh: '先查看峰、热图和总体统计模式，再选择聚类或判别模型。', en: 'Inspect peaks, heatmaps and global statistical patterns before clustering or discriminant models.' }, { zh: '结合代谢物注释和统计证据解释候选特征，避免仅凭分离图下结论。', en: 'Interpret candidate features with annotation and statistical evidence, not separation plots alone.' }],
  clinical: [{ zh: '生存分析需明确时间、事件状态与分组；诊断分析需明确阳性和阴性编码。', en: 'Define time, event status and groups for survival; define positive and negative encoding for diagnosis.' }, { zh: '先检查样本量、事件数和分组平衡，再运行生存、ROC 或临床关联程序。', en: 'Check sample size, event count and group balance before survival, ROC or clinical-association programs.' }, { zh: '同时报告效应、区间和图表；示例结果不能替代独立队列验证。', en: 'Report effects, intervals and plots together; example results do not replace independent-cohort validation.' }],
  microorganisms: [{ zh: '确认输入是相对丰度、原始计数还是群落距离，并统一物种层级。', en: 'Confirm whether inputs are relative abundance, raw counts or distances, and standardize taxonomic ranks.' }, { zh: '先观察群落组成，再比较 Alpha/Beta 多样性和组间差异。', en: 'Inspect community composition before comparing alpha/beta diversity and between-group differences.' }, { zh: '网络与功能预测结果应结合测序深度、分组和生物学背景解释。', en: 'Interpret networks and functional predictions with sequencing depth, groups and biological context.' }],
  singlecell: [{ zh: '先确认细胞、基因和元数据的对应关系，空间数据还需核对坐标与图像。', en: 'Confirm cell, gene and metadata correspondence; spatial data also requires matching coordinates and images.' }, { zh: '从 QC、降维和聚类开始，随后进行标记基因、轨迹或细胞通讯分析。', en: 'Start with QC, embedding and clustering, then move to markers, trajectories or cell communication.' }, { zh: '空间结果应同时阅读分子表达和组织位置，细胞状态结论需用标记基因支持。', en: 'Read spatial results with both molecular expression and tissue position; support cell-state claims with markers.' }],
  mathematics: [{ zh: '先明确自变量、因变量和模型假设，检查数据范围是否适合拟合。', en: 'Define independent/dependent variables and model assumptions; check whether the data range is suitable.' }, { zh: '比较拟合曲线与原始散点，不要只看拟合优度。', en: 'Compare fitted curves with raw scatterplots instead of relying only on goodness of fit.' }, { zh: '报告模型、参数和适用区间，避免超出观测范围过度外推。', en: 'Report the model, parameters and applicable range; avoid extrapolating beyond observations.' }],
  table: [{ zh: '先备份原始数据，明确每一行、每一列和缺失值的含义。', en: 'Back up raw data and define the meaning of each row, column and missing value.' }, { zh: '按需完成筛选、拆分、合并和长宽转换，每一步后检查行数与关键列。', en: 'Filter, split, merge and reshape as needed; check row counts and key columns after every step.' }, { zh: '导出前确认分隔符、列名与分组编码，保存可复用的中间表。', en: 'Check delimiters, headers and group encoding before export; retain reusable intermediate tables.' }],
}
const guideSteps = (id) => guides[id] || []
</script>

<style scoped>
.documents-page { padding-bottom: 80px; padding-top: 22px; }
.docs-hero { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(280px, .6fr); gap: 70px; align-items: end; padding-top: 92px; padding-bottom: 52px; }
.docs-eyebrow { display: inline-flex; align-items: center; gap: 9px; color: var(--accent); font-weight: 700; margin-bottom: 24px; }
.docs-hero h1 { max-width: 820px; margin: 0; font-size: clamp(40px, 5.5vw, 72px); line-height: 1.06; letter-spacing: -.045em; }
.docs-hero > div > p { max-width: 760px; margin: 26px 0 0; color: var(--muted); font-size: 17px; line-height: 1.85; }
.docs-hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
.docs-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; margin: 0; background: var(--border); border: 1px solid var(--border); }
.docs-stats div { padding: 24px 14px; background: var(--surface); text-align: center; }
.docs-stats dt { color: var(--accent); font-size: 31px; font-weight: 750; }
.docs-stats dd { margin: 7px 0 0; color: var(--muted); font-size: 12px; line-height: 1.5; }
.docs-section { padding-top: 92px; scroll-margin-top: 132px; }
.docs-heading { margin-bottom: 34px; }
.docs-kicker { display: inline-flex; align-items: center; gap: 14px; color: var(--accent); font-size: clamp(34px, 3.55vw, 52px); font-weight: 760; letter-spacing: -.035em; line-height: 1.14; }
.quickstart-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; padding: 0; margin: 0; list-style: none; }
.quickstart-grid li { position: relative; min-height: 225px; padding: 26px; background: var(--surface); border: 1px solid var(--border); border-radius: 22px; }
.quickstart-grid li > svg { color: var(--accent); margin-top: 22px; }
.step-number { position: absolute; top: 22px; right: 22px; color: var(--muted); font-size: 12px; }
.quickstart-grid h3 { margin: 16px 0 10px; font-size: 19px; }
.quickstart-grid p { margin: 0; color: var(--muted); font-size: 14px; line-height: 1.75; }
.format-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 18px; padding: 25px 28px; background: var(--surface-2); border-radius: 18px; }
.format-strip strong { color: var(--accent); }
.format-strip p { margin: 8px 0 0; color: var(--muted); font-size: 13px; line-height: 1.65; }
.interface-section { position: relative; overflow: hidden; margin-top: 24px; padding: 48px 0 76px; background: linear-gradient(180deg, var(--surface-2), color-mix(in srgb, var(--accent) 6%, var(--surface-2)) 70%, var(--surface-2)); }
.interface-section::before { content: ''; position: absolute; inset: -12% -6% auto -6%; height: 560px; background: radial-gradient(58% 62% at 18% 0%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 72%), radial-gradient(46% 50% at 92% 8%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 74%); pointer-events: none; }
.interface-layout { position: relative; display: grid; grid-template-columns: minmax(0, 1.65fr) minmax(300px, .75fr); gap: 26px; align-items: start; perspective: 1400px; }
.depth-orb { position: absolute; z-index: 0; border-radius: 50%; background: radial-gradient(circle at 32% 26%, color-mix(in srgb, var(--accent) 42%, #ffffff), color-mix(in srgb, var(--accent) 24%, transparent) 46%, transparent 70%); filter: blur(1px); opacity: .55; pointer-events: none; animation: orb-drift 14s var(--ease-soft) ease-in-out infinite alternate; }
.orb-a { width: 190px; height: 190px; right: -34px; top: -74px; }
.orb-b { width: 120px; height: 120px; left: -34px; bottom: 86px; animation-delay: -6s; opacity: .4; }
@keyframes orb-drift { from { transform: translate3d(0, 0, 0) scale(1); } to { transform: translate3d(16px, -22px, 0) scale(1.06); } }
.interface-figure { position: relative; z-index: 1; margin: 0; overflow: hidden; background: color-mix(in srgb, var(--surface) 82%, #ffffff); border: 1px solid color-mix(in srgb, var(--accent) 20%, var(--border)); border-radius: 20px; box-shadow: 0 34px 72px color-mix(in srgb, var(--accent) 16%, rgba(18, 52, 41, .18)), 0 8px 22px color-mix(in srgb, var(--accent) 9%, rgba(18, 52, 41, .10)), inset 0 1px 0 #ffffff; transform: rotateY(-2.4deg) rotateX(1.6deg); transform-origin: left center; transition: box-shadow .55s var(--ease-soft), transform .55s var(--ease-soft); }
.interface-figure:hover { box-shadow: 0 44px 88px color-mix(in srgb, var(--accent) 22%, rgba(18, 52, 41, .2)), 0 12px 28px color-mix(in srgb, var(--accent) 12%, rgba(18, 52, 41, .1)), inset 0 1px 0 #ffffff; transform: rotateY(0deg) rotateX(0deg) translateY(-6px) scale(1.012); }
.interface-figure :deep(.el-image) { display: block; width: 100%; cursor: zoom-in; }
.interface-figure :deep(.el-image__inner) { width: 100%; }
.interface-figure figcaption { display: flex; align-items: center; gap: 9px; padding: 13px 18px; color: var(--muted); background: linear-gradient(180deg, color-mix(in srgb, var(--surface) 96%, var(--accent)), var(--surface)); border-top: 1px solid color-mix(in srgb, var(--accent) 12%, var(--border)); font-size: 12px; }
.live-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 4px rgba(var(--accent-rgb), .12); }
.interface-notes { position: relative; z-index: 1; display: grid; gap: 12px; }
.interface-notes article { animation: note-breathe 6.5s var(--ease-soft) ease-in-out infinite alternate; }
.interface-notes article:nth-child(2) { animation-delay: -1.6s; }
.interface-notes article:nth-child(3) { animation-delay: -3.2s; }
.interface-notes article:nth-child(4) { animation-delay: -4.8s; }
@keyframes note-breathe { from { translate: 0 0; } to { translate: 0 -6px; } }
.interface-notes article { position: relative; display: grid; grid-template-columns: 34px 1fr; gap: 14px; padding: 20px; background: linear-gradient(155deg, color-mix(in srgb, var(--surface) 92%, var(--accent)), var(--surface) 62%, color-mix(in srgb, var(--surface-2) 84%, var(--accent))); border: 1px solid color-mix(in srgb, var(--accent) 18%, var(--border)); border-radius: 18px; box-shadow: 0 18px 38px color-mix(in srgb, var(--accent) 11%, rgba(18, 52, 41, .10)), 0 3px 8px color-mix(in srgb, var(--accent) 8%, transparent), inset 0 1px 0 #ffffff; transition: transform .5s var(--ease-soft), box-shadow .5s var(--ease-soft), border-color .5s var(--ease-soft); }
.interface-notes article:hover { transform: translateY(-6px) rotateX(1.6deg) rotateY(-1.4deg); border-color: color-mix(in srgb, var(--accent) 40%, var(--border)); box-shadow: 0 28px 54px color-mix(in srgb, var(--accent) 20%, rgba(18, 52, 41, .14)), 0 6px 14px color-mix(in srgb, var(--accent) 12%, transparent), inset 0 1px 0 #ffffff; }
.interface-notes article > span { display: grid; place-items: center; width: 32px; height: 32px; color: #fff; background: linear-gradient(150deg, color-mix(in srgb, var(--accent) 62%, #ffffff), var(--accent) 55%, color-mix(in srgb, var(--accent) 78%, #001b14)); border-radius: 11px; box-shadow: inset 0 1px 0 #ffffff66, 0 8px 18px color-mix(in srgb, var(--accent) 30%, transparent); font-size: 13px; font-weight: 750; }
.interface-notes h3 { margin: 2px 0 7px; font-size: 16px; }
.interface-notes p { margin: 0; color: var(--muted); font-size: 13px; line-height: 1.7; }
.catalog-heading { display: flex; max-width: none; justify-content: space-between; align-items: end; gap: 20px; }
.catalog-heading > strong { flex: none; color: var(--accent); font-size: 14px; }
.catalog-body { display: grid; grid-template-columns: 288px minmax(0, 1fr); gap: 26px; align-items: start; }
.catalog-filters { position: sticky; top: 142px; display: flex; flex-direction: column; gap: 14px; height: min(772px, calc(100vh - 156px)); padding: 16px; background: linear-gradient(165deg, color-mix(in srgb, var(--surface) 90%, var(--accent)), var(--surface) 58%, color-mix(in srgb, var(--surface-2) 86%, var(--accent))); border: 1px solid color-mix(in srgb, var(--accent) 16%, var(--border)); border-radius: 20px; box-shadow: 0 24px 52px color-mix(in srgb, var(--accent) 10%, rgba(18, 52, 41, .08)), inset 0 1px 0 #ffffff; }
.catalog-filters::before { content: ''; height: 3px; margin: -16px -16px 2px; background: linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 40%, transparent)); border-radius: 20px 20px 0 0; opacity: .75; }
.catalog-toolbar { display: grid; grid-template-columns: 1fr; gap: 10px; }
.catalog-toolbar :deep(.el-input), .catalog-toolbar :deep(.el-select) { width: 100%; }
.category-chips { display: flex; flex-direction: column; gap: 6px; flex: 1 1 auto; min-height: 0; overflow-y: auto; overscroll-behavior: contain; padding: 2px 2px 0; scrollbar-width: thin; scrollbar-color: color-mix(in srgb, var(--accent) 32%, transparent) transparent; }
.category-chips button { display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%; padding: 9px 12px; color: var(--muted); background: color-mix(in srgb, var(--surface) 88%, transparent); border: 1px solid transparent; border-radius: 12px; font-size: 13px; font-weight: 650; text-align: left; cursor: pointer; transition: color .35s var(--ease-soft), background .35s var(--ease-soft), border-color .35s var(--ease-soft), transform .35s var(--ease-soft), box-shadow .35s var(--ease-soft); }
.category-chips button:hover { color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, var(--surface)); border-color: color-mix(in srgb, var(--accent) 26%, transparent); transform: translateX(2px); }
.category-chips button.active { color: #fff; background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 92%, #ffffff), var(--accent) 55%, color-mix(in srgb, var(--accent) 82%, #001b14)); border-color: color-mix(in srgb, var(--accent) 62%, transparent); box-shadow: 0 10px 20px color-mix(in srgb, var(--accent) 28%, transparent), inset 0 1px 0 #ffffff55; }
.category-chips button.active .category-count { color: #fff; background: #ffffff2b; }
.category-chips button .category-option-label { display: inline-flex; align-items: center; gap: 9px; min-width: 0; }
.category-chips button .category-option-label :deep(.glass-icon) { flex: none; opacity: .84; color: currentColor; }
.catalog-toolbar :deep(.el-input__wrapper:focus-within .glass-icon) { color: var(--accent); transform: translateY(-1px) scale(1.08); }
.category-chips button .category-count { flex: none; min-width: 22px; padding: 2px 6px; color: var(--muted); background: color-mix(in srgb, var(--surface-2) 80%, var(--accent) 20%); border-radius: 999px; font-size: 11px; font-weight: 650; text-align: center; opacity: .9; }
.catalog-results { min-width: 0; }
.category-chips::-webkit-scrollbar { width: 3px; }
.category-chips::-webkit-scrollbar-track { background: transparent; }
.category-chips::-webkit-scrollbar-thumb { background: color-mix(in srgb, var(--accent) 34%, transparent); border-radius: 999px; }
.category-chips::-webkit-scrollbar-thumb:hover { background: color-mix(in srgb, var(--accent) 52%, transparent); }
.application-list { display: grid; gap: 16px; }
.application-card { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(320px, .85fr); overflow: hidden; background: var(--surface); border: 1px solid var(--border); border-radius: 20px; }
.application-content { padding: 25px; }
.application-title-row { display: flex; justify-content: space-between; gap: 14px; align-items: flex-start; }
.application-heading { min-width: 0; }
.application-category { display: inline-flex; align-items: center; gap: 6px; color: var(--accent); font-size: 12px; font-weight: 700; }
.application-category :deep(.glass-icon), .application-name :deep(.glass-icon) { color: var(--accent); transition: transform .35s var(--ease-soft), filter .35s var(--ease-soft); }
.application-card:hover .application-category :deep(.glass-icon) { transform: translateY(-1px) scale(1.08); }
.application-title-row h3 { margin: 7px 0 2px; font-size: 23px; letter-spacing: -.02em; }
.application-name { display: flex; align-items: center; gap: 9px; }
.application-name :deep(.glass-icon) { padding: 5px; box-sizing: content-box; border: 1px solid color-mix(in srgb, var(--accent) 20%, var(--border)); border-radius: 10px; background: color-mix(in srgb, var(--accent) 8%, var(--surface)); }
.application-card:hover .application-name :deep(.glass-icon) { transform: translateY(-2px) rotate(-5deg) scale(1.06); filter: drop-shadow(0 4px 6px color-mix(in srgb, var(--accent) 24%, transparent)); }
.application-subtitle { margin: 0; color: var(--muted); font-size: 12px; line-height: 1.55; }
.source-badge { flex: none; max-width: 150px; overflow: hidden; padding: 5px 8px; color: var(--muted); background: var(--surface-2); border-radius: 6px; font-size: 10px; text-overflow: ellipsis; white-space: nowrap; }
.application-description { display: -webkit-box; overflow: hidden; margin: 17px 0; color: var(--muted); font-size: 13px; line-height: 1.72; -webkit-box-orient: vertical; -webkit-line-clamp: 4; }
.application-details { padding: 12px 0; border-block: 1px solid var(--border); }
.application-details-title { margin: 0 0 12px; color: var(--accent); font-size: 13px; font-weight: 650; }
.application-details dl { display: grid; gap: 13px; margin: 0; }
.application-details dl > div { display: grid; grid-template-columns: 80px 1fr; gap: 12px; }
.application-details dt { display: flex; gap: 6px; align-items: center; color: var(--ink); font-size: 12px; font-weight: 700; }
.application-details dt :deep(.glass-icon) { color: var(--accent); transition: transform .3s var(--ease-soft), filter .3s var(--ease-soft); }
.application-details dl > div { transition: color .25s var(--ease-soft); }
.application-details dl > div:hover dt :deep(.glass-icon) { transform: translateY(-2px) rotate(-6deg) scale(1.12); filter: drop-shadow(0 3px 5px color-mix(in srgb, var(--accent) 30%, transparent)); }
.application-details dd { margin: 0; color: var(--muted); font-size: 12px; line-height: 1.65; }
.application-figure { display: flex; flex-direction: column; align-items: stretch; justify-content: center; min-width: 0; margin: 0; padding: 18px; background: var(--surface-2); border-left: 1px solid var(--border); perspective: 1100px; }
.application-figure :deep(.el-image) { flex: 0 0 auto; width: 100%; aspect-ratio: 1.6 / 1; min-height: 0; overflow: hidden; border-radius: 16px; background: #f7f7f4; cursor: zoom-in; box-shadow: var(--shadow-soft); transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)); transform-style: preserve-3d; transition: transform .22s ease-out, box-shadow .5s var(--ease-soft); }
.application-figure:hover :deep(.el-image) { transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(1.035); box-shadow: 0 30px 60px color-mix(in srgb, var(--accent) 20%, rgba(18, 52, 41, .16)), 0 10px 24px color-mix(in srgb, var(--accent) 10%, transparent); }
.application-figure:hover .image-error :deep(.glass-icon) { transform: translateY(-3px) rotate(-5deg) scale(1.08); }
.application-figure :deep(.el-image__inner) { transform: translateZ(26px) scale(1.02); transition: transform .4s var(--ease-soft); }
.image-error { display: grid; place-items: center; min-height: 250px; color: var(--muted); }
.catalog-pagination { justify-content: center; margin-top: 30px; }
.catalog-pagination { justify-content: center; margin-top: 30px; }
.catalog-pagination :deep(.btn-prev),
.catalog-pagination :deep(.btn-next),
.catalog-pagination :deep(.el-pager li) {
  box-sizing: border-box;
  width: 42px;
  min-width: 42px;
  height: 34px;
  margin: 0 3px;
  padding: 0;
  border-radius: 11px;
  line-height: 34px;
  transition: transform .25s var(--ease-soft), background .25s var(--ease-soft), color .25s var(--ease-soft), box-shadow .25s var(--ease-soft);
}
.catalog-pagination :deep(.btn-prev:hover),
.catalog-pagination :deep(.btn-next:hover),
.catalog-pagination :deep(.el-pager li:hover) {
  transform: translateY(-1px);
  box-shadow: 0 5px 12px color-mix(in srgb, var(--accent) 12%, transparent);
}
.catalog-pagination :deep(.el-pager li.is-active) {
  border-radius: 11px;
  box-shadow: 0 5px 14px color-mix(in srgb, var(--accent) 24%, transparent);
}

@media (max-width: 1279px) {
  .interface-layout { grid-template-columns: 1fr; perspective: none; }
  .interface-figure { transform: none; }
  .interface-notes { grid-template-columns: repeat(2, 1fr); gap: 14px; }
}
@media (min-width: 1280px) {
  .interface-layout { align-items: stretch; }
  .interface-notes { height: 100%; grid-template-rows: repeat(3, minmax(0, 1fr)); }
}
@media (max-width: 1050px) {
  .docs-hero { grid-template-columns: 1fr; gap: 35px; }
  .docs-stats { max-width: 560px; }
  .quickstart-grid { grid-template-columns: repeat(2, 1fr); }
  .interface-layout { grid-template-columns: 1fr; perspective: none; }
  .interface-figure { transform: none; }
  .interface-notes { grid-template-columns: repeat(2, 1fr); }
  .application-card { grid-template-columns: 1fr; }
  .application-figure { border-left: 0; border-top: 1px solid var(--border); }
  .application-figure :deep(.el-image) { aspect-ratio: 1.7 / 1; }
}
@media (max-width: 760px) {
  .docs-hero { padding-top: 55px; }
  .docs-hero h1 { font-size: 41px; }
  .docs-stats { grid-template-columns: 1fr; }
  .docs-stats div { display: flex; align-items: center; justify-content: center; gap: 14px; padding: 14px; }
  .docs-stats dd { margin: 0; }
  .docs-section { padding-top: 68px; }
  .quickstart-grid, .format-strip, .interface-notes { grid-template-columns: 1fr; }
  .quickstart-grid li { min-height: 0; }
  .interface-section { margin-top: 20px; padding: 40px 0 52px; }
  .guide-tabs { display: block; }
  .guide-tabs :deep(.el-tabs__header) { min-width: 0; }
  .guide-panel { min-height: 0; padding: 20px; }
  .catalog-heading { display: block; }
  .catalog-heading > strong { display: block; margin-top: 12px; }
  .catalog-body { grid-template-columns: 1fr; gap: 18px; }
  .catalog-filters { position: static; height: auto; }
  .category-chips { flex-direction: row; flex-wrap: wrap; flex: none; max-height: none; overflow: visible; }
  .category-chips button { width: auto; flex: 0 0 auto; }
  .application-content { padding: 20px; }
  .source-badge { display: none; }
  .application-details dl > div { grid-template-columns: 1fr; gap: 5px; }
  .application-figure :deep(.el-image) { aspect-ratio: 1.5 / 1; }
  .catalog-pagination :deep(.btn-prev), .catalog-pagination :deep(.btn-next), .catalog-pagination :deep(.el-pager li) { width: 32px; min-width: 32px; height: 30px; margin: 0 1px; border-radius: 9px; line-height: 30px; font-size: 12px; }
}
@media (prefers-reduced-motion: reduce) { .guide-catalog-link { scroll-behavior: auto; } }
</style>
