(() => {
  const mode = localStorage.getItem('omicssuite.theme') || 'system'
  const dark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  const theme = dark ? 'dark' : 'light'
  const root = document.documentElement
  root.dataset.theme = theme
  root.classList.toggle('dark', dark)
  root.style.colorScheme = theme
  const color = localStorage.getItem('omicssuite.customColor')
  if ((localStorage.getItem('omicssuite.accent') === 'custom') && /^#[0-9a-f]{6}$/i.test(color || '')) {
    root.style.setProperty('--accent', color)
  }
})()
