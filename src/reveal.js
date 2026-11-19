const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
let observer
let lastScrollY = window.scrollY
let direction = 'down'

document.documentElement.dataset.scrollDir = direction
window.addEventListener('scroll', () => {
  const y = window.scrollY
  if (Math.abs(y - lastScrollY) < 5) return
  const next = y > lastScrollY ? 'down' : 'up'
  lastScrollY = y
  if (next === direction) return
  direction = next
  document.documentElement.dataset.scrollDir = next
}, { passive: true })

function getObserver() {
  if (observer) return observer
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target
      if (entry.isIntersecting) {
        if (el.dataset.revealSeen === '1') el.style.setProperty('--reveal-delay', '0ms')
        else el.dataset.revealSeen = '1'
        el.classList.add('is-visible')
      } else {
        if (el.dataset.revealSeen === '1') {
          el.style.setProperty('--reveal-delay', '0ms')
          el.dataset.revealEdge = el.getBoundingClientRect().top < 0 ? 'top' : 'bottom'
        }
        el.classList.remove('is-visible')
      }
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' })
  return observer
}

export const reveal = {
  mounted(el, binding) {
    el.classList.add('reveal-item')
    const delay = binding.value ?? Math.min(240, [...(el.parentNode?.children || [])].indexOf(el) * 45)
    el.style.setProperty('--reveal-delay', `${delay}ms`)
    if (reducedMotion.matches) el.classList.add('is-visible')
    else getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
