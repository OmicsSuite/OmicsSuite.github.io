import { computed, reactive, readonly } from 'vue'

export const accentChoices = [
  { value: 'pine', zh: '松绿', en: 'Pine', color: '#11866f' },
  { value: 'ocean', zh: '海蓝', en: 'Ocean', color: '#1678a6' },
  { value: 'indigo', zh: '靛青', en: 'Indigo', color: '#5856a8' },
  { value: 'rose', zh: '茜红', en: 'Rose', color: '#ad4d6d' },
  { value: 'amber', zh: '琥珀', en: 'Amber', color: '#a96919' },
  { value: 'slate', zh: '岩灰', en: 'Slate', color: '#5b6975' },
]
const modes = ['light', 'dark', 'system']
const themeQuery = window.matchMedia('(prefers-color-scheme: dark)')
const state = reactive({
  mode: modes.includes(localStorage.getItem('omicssuite.theme')) ? localStorage.getItem('omicssuite.theme') : 'system',
  accent: [...accentChoices.map(item => item.value), 'custom'].includes(localStorage.getItem('omicssuite.accent')) ? localStorage.getItem('omicssuite.accent') : 'pine',
  customColor: /^#[0-9a-f]{6}$/i.test(localStorage.getItem('omicssuite.customColor') || '') ? localStorage.getItem('omicssuite.customColor') : '#11866f',
  systemDark: themeQuery.matches,
})

function rgb(hex) {
  return [1, 3, 5].map(index => parseInt(hex.slice(index, index + 2), 16))
}
function hex(values) {
  return `#${values.map(value => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, '0')).join('')}`
}
function displayColor(color, dark) {
  const values = rgb(color)
  return dark ? hex(values.map(value => value * 0.78 + 255 * 0.22)) : color
}
function apply() {
  const dark = state.mode === 'dark' || (state.mode === 'system' && state.systemDark)
  const root = document.documentElement
  root.dataset.theme = dark ? 'dark' : 'light'
  root.classList.toggle('dark', dark)
  root.style.colorScheme = dark ? 'dark' : 'light'
  const selected = accentChoices.find(item => item.value === state.accent)?.color || state.customColor
  root.style.setProperty('--accent', displayColor(selected, dark))
  root.style.setProperty('--accent-rgb', rgb(selected).join(', '))
  root.style.setProperty('--accent-source', selected)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0c1513' : '#ffffff')
}
function setThemeMode(mode) {
  if (!modes.includes(mode)) return
  state.mode = mode
  localStorage.setItem('omicssuite.theme', mode)
  apply()
}
function setAccent(value) {
  if (![...accentChoices.map(item => item.value), 'custom'].includes(value)) return
  state.accent = value
  localStorage.setItem('omicssuite.accent', value)
  apply()
}
function setCustomColor(value) {
  if (!/^#[0-9a-f]{6}$/i.test(value || '')) return
  state.customColor = value.toLowerCase()
  localStorage.setItem('omicssuite.customColor', state.customColor)
  setAccent('custom')
}
themeQuery.addEventListener('change', event => { state.systemDark = event.matches; apply() })
apply()

export const preferences = readonly(state)
export const resolvedTheme = computed(() => state.mode === 'system' ? (state.systemDark ? 'dark' : 'light') : state.mode)
export const preferencesStore = { setThemeMode, setAccent, setCustomColor }
