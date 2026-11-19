import { computed, ref } from 'vue'

// English-only site. Kept as a compatibility shim so components that still
// call t()/pick() resolve to English strings.
export const locale = ref('en')
document.documentElement.lang = 'en'

const messages = {
  en: {
    'nav.home': 'Home', 'nav.features': 'Features', 'nav.gallery': 'Gallery', 'nav.docs': 'Documents', 'nav.download': 'Download', 'nav.publication': 'Publication',
    'nav.menu': 'Open navigation', 'nav.close': 'Close navigation',
    'pref.language': 'Language', 'pref.palette': 'Theme color', 'pref.brightness': 'Appearance',
    'pref.light': 'Light', 'pref.dark': 'Dark', 'pref.system': 'System', 'pref.custom': 'Custom color',
    'common.learn': 'Start learning', 'common.download': 'Download', 'common.github': 'GitHub', 'common.more': 'Learn more',
    'common.previous': 'Previous', 'common.next': 'Next', 'common.close': 'Close', 'common.copy': 'Copy', 'common.copied': 'Copied',
    'footer.tagline': 'Multi-omics analysis and visualization, together in one place.',
    'footer.product': 'Product', 'footer.resources': 'Resources', 'footer.community': 'Community & support',
    'footer.rights': 'OmicsSuite. A multi-omics desktop suite for researchers.',
    'footer.datasets': 'Example datasets', 'footer.courses': 'Video courses', 'footer.issues': 'Report an issue', 'footer.updates': 'Release history',
    'footer.eyebrow': 'Designed for discovery', 'footer.menu': 'Footer navigation',
    'footer.cite': 'Cite the paper', 'footer.version': 'v2.0.0',
    'footer.note': 'Open source · Cross-platform · 181 applications',
    'footer.downloadDesc': 'macOS, Windows and Linux', 'footer.docsDesc': 'Interface, workflows and app catalog',
    'footer.publicationDesc': 'Horticulture Research · 2023', 'footer.datasetsDesc': 'Ready-to-run example data',
    'footer.coursesDesc': 'Bilibili walkthroughs', 'footer.updatesDesc': 'v2.0.0 and earlier builds',
    'footer.githubDesc': 'Follow the project on GitHub', 'footer.issuesDesc': 'Bugs, questions and requests',
    'footer.paper': 'Read the paper', 'footer.paperDesc': 'DOI 10.1093/hr/uhad195',
    'footer.iconsCredit': 'Glass icons by thesvg',
    'action.top': 'Back to top',
  },
}

export function setLocale() {
  locale.value = 'en'
  document.documentElement.lang = 'en'
}

export function useI18n() {
  const t = (key) => messages.en[key] || key
  const isZh = computed(() => false)
  const pick = (_zh, en) => en
  return { locale, t, isZh, pick, setLocale }
}
