<template>
  <div class="download-page container">
    <section class="download-hero">
      <span class="release-badge"><GlassIcon name="download" :size="18" />OmicsSuite v2.0.0</span>
      <h1>{{ c.title }}</h1>
      <p>{{ c.description }}</p>
      <div class="hero-meta">
        <span><GlassIcon name="package" :size="16" />{{ c.metaPlatforms }}</span>
        <span><GlassIcon name="shield-check" :size="16" />{{ c.metaOpen }}</span>
        <span><GlassIcon name="activity" :size="16" />{{ c.metaApps }}</span>
      </div>
    </section>

    <section class="platform-grid" aria-label="Download options">
      <article v-for="item in platforms" :key="item.id" class="platform-card" :class="{ detected: item.id === detectedId }">
        <div class="platform-top">
          <div class="platform-icon"><GlassIcon :name="item.icon" :size="30" /></div>
          <span v-if="item.id === detectedId" class="compat-chip"><GlassIcon name="check" :size="13" />{{ c.compat }}</span>
        </div>
        <span class="platform-kicker">{{ pick(item.kickerZh, item.kickerEn) }}</span>
        <h2>{{ item.name }}</h2>
        <p class="platform-desc">{{ pick(item.descZh, item.descEn) }}</p>
        <div class="file-line"><code>{{ item.file }}</code></div>
        <ul class="req-list">
          <li v-for="req in pick(item.reqs, item.reqsEn)" :key="req">{{ req }}</li>
        </ul>
        <a :href="item.url" target="_blank" rel="noreferrer" class="button button-primary">
          {{ pick(item.actionZh, item.actionEn) }}<GlassIcon name="download" :size="17" />
        </a>
      </article>
    </section>

    <p class="release-hint"><GlassIcon name="info" :size="16" />{{ c.releaseHint }}</p>

    <section class="install-section">
      <div class="download-heading">
        <span>{{ c.installKicker }}</span>
        <h2>{{ c.installTitle }}</h2>
        <p>{{ c.installDescription }}</p>
      </div>
      <div class="install-panel">
        <div class="install-tabs" role="tablist">
          <button v-for="item in platforms" :key="item.id" role="tab" :aria-selected="item.id === activeTab" :class="{ active: item.id === activeTab }" @click="activeTab = item.id">
            <GlassIcon :name="item.icon" :size="16" />{{ item.name }}
          </button>
        </div>
        <ol>
          <li v-for="(step, index) in activeSteps" :key="step.zh">
            <span>{{ index + 1 }}</span>
            <div><p>{{ pick(step.zh, step.en) }}</p><code v-if="step.code">{{ step.code }}</code></div>
          </li>
        </ol>
      </div>
    </section>

    <section class="download-help">
      <GlassIcon name="database" :size="29" />
      <div><h2>{{ c.helpTitle }}</h2><p>{{ c.helpDescription }}</p></div>
      <RouterLink to="/documents" class="button button-secondary">{{ c.helpAction }}<GlassIcon name="arrow-right" :size="16" /></RouterLink>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import GlassIcon from '../components/GlassIcon.vue'
import { useI18n } from '../i18n.js'
const { pick } = useI18n()

const releasePage = 'https://github.com/OmicsSuite/OmicsSuite.github.io/releases'

const copy = {
  zh: {
    title: '为你的系统，准备一份 OmicsSuite。',
    description: 'v2.0.0 首次同时提供 Windows、macOS 与 Linux 三个平台版本，同一套界面、同一套 181 个应用与同一套可复现的分析流程。',
    metaPlatforms: '三平台同步发布',
    metaOpen: '开源可追溯',
    metaApps: '181 个应用',
    compat: '适合当前设备',
    releaseHint: '安装包统一发布在 GitHub Release 页面，文件名与校验值以该页面为准。',
    installKicker: '安装与第一次运行',
    installTitle: '三个平台，同一套工作空间。',
    installDescription: '选择你的系统查看对应步骤。首次启动建议先用示例数据跑通一条流程，再导入自己的数据。',
    sourceKicker: '开发者与最新源码',
    sourceTitle: '也可以从当前源码运行。',
    sourceDescription: '当前 Maven 构建要求 JDK 25 或更高版本，JavaFX 27.0.1 由 Maven 提供。请在项目目录中运行：',
    viewSource: '查看 GitHub 源码',
    helpTitle: '安装后，从 ScatterPlot 示例开始。',
    helpDescription: 'Documents 提供最新界面截图、上传下载说明、分类教程和完整应用目录。',
    helpAction: '打开教学文档',
  },
  en: {
    title: 'OmicsSuite, built for the system you work on.',
    description: 'v2.0.0 ships for Windows, macOS and Linux together — one interface, the same 181 applications and the same reproducible analysis workflow.',
    metaPlatforms: 'Three platforms',
    metaOpen: 'Open and traceable',
    metaApps: '181 applications',
    compat: 'Recommended for this device',
    releaseHint: 'Installers are published on the GitHub Release page; filenames and checksums are authoritative there.',
    installKicker: 'Install and first run',
    installTitle: 'Three platforms, one workspace.',
    installDescription: 'Choose your system for the matching steps. On first launch, run one workflow with example data before importing your own.',
    sourceKicker: 'Developers and current source',
    sourceTitle: 'You can also run the current source.',
    sourceDescription: 'The current Maven build requires JDK 25 or later. JavaFX 27.0.1 is supplied through Maven. Run from the project directory:',
    viewSource: 'View source on GitHub',
    helpTitle: 'After installation, start with ScatterPlot.',
    helpDescription: 'Documents includes current interface screenshots, upload/download guidance, category tutorials and the full application catalog.',
    helpAction: 'Open Documents',
  },
}
const c = computed(() => copy[pick('zh', 'en')])

const platforms = [
  {
    id: 'windows', icon: 'monitor', name: 'Windows',
    kickerZh: 'Windows 10 / 11 · 64 位', kickerEn: 'Windows 10 / 11 · 64-bit',
    descZh: '自带运行时，双击安装即可使用，无需单独配置 Java 环境。',
    descEn: 'Bundled runtime. Install and launch — no separate Java setup required.',
    file: 'OmicsSuite-2.0.0-win-x64.exe',
    reqs: ['Windows 10 或更高版本', '8 GB 内存 · 4 核以上 CPU', '约 500 MB 磁盘空间'],
    reqsEn: ['Windows 10 or later', '8 GB RAM · 4+ CPU cores', 'About 500 MB of disk space'],
    url: releasePage,
    actionZh: '下载 Windows 版', actionEn: 'Download for Windows',
  },
  {
    id: 'macos', icon: 'apple', name: 'macOS',
    kickerZh: 'macOS 12+ · Apple Silicon 与 Intel', kickerEn: 'macOS 12+ · Apple Silicon & Intel',
    descZh: '通用二进制，Apple Silicon 原生运行；首次打开请在系统设置中允许。',
    descEn: 'Universal build running natively on Apple Silicon; approve it in System Settings on first launch.',
    file: 'OmicsSuite-2.0.0-macos-universal.dmg',
    reqs: ['macOS 12 Monterey 或更高版本', '8 GB 内存 · 4 核以上 CPU', '支持 arm64 与 x86_64'],
    reqsEn: ['macOS 12 Monterey or later', '8 GB RAM · 4+ CPU cores', 'arm64 and x86_64 supported'],
    url: releasePage,
    actionZh: '下载 macOS 版', actionEn: 'Download for macOS',
  },
  {
    id: 'linux', icon: 'terminal', name: 'Linux',
    kickerZh: 'Linux x86_64 · AppImage 与 deb', kickerEn: 'Linux x86_64 · AppImage & deb',
    descZh: 'AppImage 免安装直接运行，另有 deb 包适配 Debian 与 Ubuntu 系发行版。',
    descEn: 'Run the AppImage directly, or install the deb package on Debian and Ubuntu systems.',
    file: 'OmicsSuite-2.0.0-linux-x86_64.AppImage',
    reqs: ['Ubuntu 22.04+ / Fedora 38+ / Debian 12+', 'glibc 2.31 或更高版本', '需 FUSE 运行 AppImage'],
    reqsEn: ['Ubuntu 22.04+ / Fedora 38+ / Debian 12+', 'glibc 2.31 or later', 'FUSE required for the AppImage'],
    url: releasePage,
    actionZh: '下载 Linux 版', actionEn: 'Download for Linux',
  },
]

const detectedId = ref('')
onMounted(() => {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('mac')) detectedId.value = 'macos'
  else if (ua.includes('linux')) detectedId.value = 'linux'
  else if (ua.includes('win')) detectedId.value = 'windows'
})

const activeTab = ref(detectedId.value || 'windows')
const steps = {
  windows: [
    { zh: '从 Release 页面下载 OmicsSuite-2.0.0-win-x64.exe，核对文件大小与校验值。', en: 'Download OmicsSuite-2.0.0-win-x64.exe from the release page and verify its size and checksum.' },
    { zh: '双击安装包，按向导完成安装；如系统提示来源未知，请确认发布方为 OmicsSuite。', en: 'Run the installer and follow the wizard. If Windows warns about an unknown publisher, confirm it is signed by OmicsSuite.' },
    { zh: '启动后打开左侧任一程序，点击 DemoFile 载入示例数据，即可看到完整输出。', en: 'Launch the app, open any program in the sidebar and click DemoFile to load example data and see the full output.' },
  ],
  macos: [
    { zh: '下载 OmicsSuite-2.0.0-macos-universal.dmg，打开后把应用拖入 Applications。', en: 'Download OmicsSuite-2.0.0-macos-universal.dmg, open it and drag the app into Applications.' },
    { zh: '首次打开若被拦截，在「系统设置 → 隐私与安全性」中允许该应用运行。', en: 'If macOS blocks the first launch, allow the app under System Settings → Privacy & Security.' },
    { zh: '启动后从左侧选择程序，用 DemoFile 验证输入、参数与输出流程。', en: 'After launch, choose a program and use DemoFile to verify inputs, parameters and outputs.' },
  ],
  linux: [
    { zh: '下载 AppImage 后赋予执行权限：chmod +x OmicsSuite-2.0.0-linux-x86_64.AppImage。', en: 'Download the AppImage and make it executable: chmod +x OmicsSuite-2.0.0-linux-x86_64.AppImage.', code: 'chmod +x OmicsSuite-2.0.0-linux-x86_64.AppImage' },
    { zh: '直接运行该文件；若缺少 FUSE，可改用 deb 包安装。', en: 'Run the file directly; if FUSE is unavailable, install the deb package instead.', code: './OmicsSuite-2.0.0-linux-x86_64.AppImage' },
    { zh: '启动后打开示例数据，确认图形界面与 R 环境均正常工作。', en: 'Open example data after launch to confirm both the interface and the R environment work.' },
  ],
}
const activeSteps = computed(() => steps[activeTab.value])

</script>

<style scoped>
.download-page { padding-top: 90px; padding-bottom: 80px; }
.download-hero { max-width: 900px; margin: 0 auto 52px; text-align: center; }
.release-badge { display: inline-flex; align-items: center; gap: 8px; padding: 9px 15px; color: var(--accent); background: rgba(var(--accent-rgb), .1); border: 1px solid rgba(var(--accent-rgb), .2); border-radius: 999px; font-weight: 700; }
.download-hero h1 { margin: 25px 0 20px; font-size: clamp(41px, 5.4vw, 68px); line-height: 1.08; letter-spacing: -.045em; }
.download-hero p { max-width: 720px; margin: auto; color: var(--muted); font-size: 17px; line-height: 1.8; }
.hero-meta { display: flex; justify-content: center; flex-wrap: wrap; gap: 10px 22px; margin-top: 26px; color: var(--muted); font-size: 13px; }
.hero-meta span { display: inline-flex; align-items: center; gap: 7px; }
.platform-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.platform-card { display: flex; flex-direction: column; align-items: flex-start; padding: 30px 28px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-card); box-shadow: var(--shadow-soft); transition: transform .5s var(--ease-soft), box-shadow .5s var(--ease-soft), border-color .5s var(--ease-soft); }
.platform-card:hover { transform: translateY(-6px); border-color: color-mix(in srgb, var(--accent) 38%, var(--border)); box-shadow: var(--shadow-lift); }
.platform-card.detected { border-color: color-mix(in srgb, var(--accent) 55%, var(--border)); background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 5%, var(--surface)), var(--surface) 45%); }
.platform-top { display: flex; align-items: center; justify-content: space-between; width: 100%; margin-bottom: 22px; }
.platform-icon { display: grid; place-items: center; width: 56px; height: 56px; color: var(--accent); background: color-mix(in srgb, var(--accent) 9%, var(--surface)); border-radius: 16px; box-shadow: inset 0 1px 0 color-mix(in srgb, #ffffff 30%, transparent); transition: transform .5s var(--ease-soft), background .5s var(--ease-soft); }
.platform-card:hover .platform-icon { transform: translateY(-2px) rotate(-5deg); background: color-mix(in srgb, var(--accent) 14%, var(--surface)); }
.compat-chip { display: inline-flex; align-items: center; gap: 5px; padding: 5px 9px; color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, transparent); border-radius: 999px; font-size: 11px; font-weight: 700; }
.platform-kicker { color: var(--accent); font-size: 12px; font-weight: 700; }
.platform-card h2 { margin: 8px 0 10px; font-size: 26px; }
.platform-desc { min-height: 72px; margin: 0 0 18px; color: var(--muted); font-size: 14px; line-height: 1.75; }
.file-line { width: 100%; padding: 11px 13px; margin-bottom: 16px; background: var(--surface-2); border: 1px solid var(--border); border-radius: 10px; }
.file-line code { color: var(--ink); font-size: 11.5px; overflow-wrap: anywhere; }
.req-list { flex: 1; margin: 0 0 22px; padding: 0; list-style: none; }
.req-list li { display: flex; gap: 8px; color: var(--muted); font-size: 12.5px; line-height: 1.9; }
.req-list li::before { content: ''; flex: none; width: 5px; height: 5px; margin-top: 9px; border-radius: 50%; background: color-mix(in srgb, var(--accent) 60%, transparent); }
.platform-card .button { width: 100%; justify-content: center; }
.release-hint { display: flex; gap: 8px; align-items: center; justify-content: center; margin: 22px 0 0; color: var(--muted); font-size: 12.5px; text-align: center; }
.install-section { display: grid; grid-template-columns: .8fr 1.2fr; gap: 60px; padding: 95px 0 0; }

.download-heading h2 { margin: 10px 0 14px; font-size: 35px; }
.download-heading p { color: var(--muted); line-height: 1.8; }
.install-panel { padding: 22px; background: var(--surface-2); border: 1px solid var(--border); border-radius: var(--radius-card); }
.install-tabs { display: flex; gap: 6px; padding: 5px; margin-bottom: 18px; background: var(--surface); border: 1px solid var(--border); border-radius: 999px; }
.install-tabs button { display: inline-flex; flex: 1; gap: 7px; align-items: center; justify-content: center; padding: 9px 10px; color: var(--muted); background: transparent; border: 0; border-radius: 999px; font: inherit; font-size: 12.5px; font-weight: 600; cursor: pointer; transition: color .35s var(--ease-soft), background .35s var(--ease-soft); }
.install-tabs button:hover { color: var(--ink); }
.install-tabs button.active { color: var(--button-text); background: linear-gradient(160deg, color-mix(in srgb, var(--accent) 76%, #ffffff), var(--accent) 55%); box-shadow: 0 8px 20px color-mix(in srgb, var(--accent) 24%, transparent); }
.install-panel ol { display: grid; gap: 10px; padding: 0; margin: 0; list-style: none; }
.install-panel li { display: flex; gap: 15px; align-items: flex-start; padding: 17px 18px; background: var(--surface); border-radius: 13px; }
.install-panel li span { display: grid; place-items: center; flex: none; width: 28px; height: 28px; color: #fff; background: var(--accent); border-radius: 50%; font-size: 13px; font-weight: 700; }
.install-panel li p { margin: 2px 0 0; color: var(--muted); line-height: 1.7; }
.install-panel li code { display: inline-block; max-width: 100%; margin-top: 9px; padding: 6px 10px; color: var(--accent); background: color-mix(in srgb, var(--accent) 8%, var(--surface-2)); border-radius: 8px; font-size: 12px; overflow-wrap: anywhere; }


.download-help { display: flex; gap: 20px; align-items: center; margin-top: 26px; padding: 28px; background: rgba(var(--accent-rgb), .08); border-radius: 20px; }
.download-help > svg { flex: none; color: var(--accent); }
.download-help > div { flex: 1; }
.download-help h2 { margin: 0 0 7px; font-size: 21px; }
.download-help p { margin: 0; color: var(--muted); line-height: 1.7; }
@media (max-width: 1000px) { .platform-grid { grid-template-columns: 1fr; } .platform-desc { min-height: 0; } .install-section { grid-template-columns: 1fr; gap: 30px; } .install-section { padding: 70px 0 0; } }
@media (max-width: 600px) { .download-page { padding-top: 55px; } .download-hero h1 { font-size: 40px; } .install-tabs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); flex-wrap: nowrap; border-radius: 18px; gap: 2px; } .install-tabs button { min-width: 0; padding: 0 4px; } .download-help { align-items: flex-start; flex-wrap: wrap; } .download-help .button { width: 100%; } }
</style>
