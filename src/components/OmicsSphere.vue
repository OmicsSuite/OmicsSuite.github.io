<template>
  <div ref="host" class="omics-sphere" :class="{ dragging }">
    <canvas ref="canvas" :aria-label="pick('可拖拽旋转的多组学三维网络', 'Draggable 3D multi-omics network')" role="img" @pointerdown="onPointerDown" @pointermove="onPointerMove" @pointerup="onPointerUp" @pointercancel="onPointerUp"></canvas>
    <div class="sphere-core"><GlassIcon name="cell" :size="47" /><strong>{{ stats.apps }}</strong><span>{{ pick('个分析应用', 'applications') }}</span></div>
    <span class="orbit-label orbit-label-a"><GlassIcon name="dna" :size="17" />Genomics</span>
    <span class="orbit-label orbit-label-b"><GlassIcon name="cell" :size="17" />SingleCell</span>
    <span class="orbit-label orbit-label-c"><GlassIcon name="metabolite" :size="17" />Metabolomics</span>
    <span class="sphere-hint"><span class="mouse-symbol"></span>{{ pick('拖拽探索组学连接', 'Drag to explore the connections') }}</span>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import GlassIcon from './GlassIcon.vue'
import { useI18n } from '../i18n.js'
import { stats } from '../data/content.js'
const { pick } = useI18n()
const host = ref(null), canvas = ref(null), dragging = ref(false)
let ctx, width = 0, height = 0, frame = 0, visible = true, resizeObserver, intersectionObserver, themeObserver
let lastX = 0, lastY = 0, velocityX = 0, velocityY = 0
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const rotation = { x: -0.18, y: 0.35 }
const points = Array.from({ length: 112 }, (_, index) => {
  const y = 1 - (index / 111) * 2
  const radius = Math.sqrt(1 - y * y)
  const theta = Math.PI * (3 - Math.sqrt(5)) * index
  return { x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius, hub: index % 14 === 0 }
})
const edges = []
for (let i = 0; i < points.length; i++) {
  const neighbors = points.map((p, j) => ({ j, d: Math.hypot(p.x - points[i].x, p.y - points[i].y, p.z - points[i].z) })).filter(item => item.j > i).sort((a, b) => a.d - b.d).slice(0, 2)
  neighbors.forEach(({ j }) => edges.push([i, j]))
}
function color() { return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#11866f' }
function rgba(hex, alpha) {
  const value = hex.replace('#', '')
  if (!/^[0-9a-f]{6}$/i.test(value)) return `rgba(17,134,111,${alpha})`
  const values = [1, 3, 5].map(index => parseInt(value.slice(index, index + 2), 16))
  return `rgba(${values.join(',')},${alpha})`
}
function project(point) {
  const cosy = Math.cos(rotation.y), siny = Math.sin(rotation.y), cosx = Math.cos(rotation.x), sinx = Math.sin(rotation.x)
  const x1 = point.x * cosy - point.z * siny
  const z1 = point.x * siny + point.z * cosy
  const y1 = point.y * cosx - z1 * sinx
  const z2 = point.y * sinx + z1 * cosx
  const perspective = 3.5 / (3.5 + z2)
  const size = Math.min(width, height) * 0.34
  return { x: width / 2 + x1 * size * perspective, y: height * 0.47 + y1 * size * perspective, z: z2, p: perspective }
}
function draw() {
  if (!ctx || !width || !height) return
  ctx.clearRect(0, 0, width, height)
  const projected = points.map(project)
  const accent = color()
  const glow = ctx.createRadialGradient(width / 2, height * .47, 0, width / 2, height * .47, Math.min(width, height) * .42)
  glow.addColorStop(0, rgba(accent, .10)); glow.addColorStop(1, rgba(accent, 0))
  ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height)
  edges.forEach(([a, b]) => {
    const p = projected[a], q = projected[b], depth = Math.max(0, Math.min(1, 1 - (p.z + q.z + 2) / 4))
    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y)
    ctx.strokeStyle = rgba(accent, .06 + depth * .24); ctx.lineWidth = .6 + depth * .55; ctx.stroke()
  })
  projected.map((point, index) => ({ ...point, point: points[index] })).sort((a, b) => b.z - a.z).forEach(p => {
    const depth = Math.max(0, Math.min(1, 1 - (p.z + 1) / 2))
    const radius = (p.point.hub ? 4.1 : 2.15) * p.p
    if (p.point.hub) { ctx.beginPath(); ctx.arc(p.x, p.y, radius * 2.6, 0, Math.PI * 2); ctx.fillStyle = rgba(accent, .07 + depth * .08); ctx.fill() }
    ctx.beginPath(); ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
    ctx.fillStyle = rgba(accent, .28 + depth * .65); ctx.fill()
    ctx.beginPath(); ctx.arc(p.x - radius * .25, p.y - radius * .3, Math.max(.55, radius * .28), 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${.25 + depth * .65})`; ctx.fill()
  })
}
function tick() {
  if (visible) {
    if (!dragging.value && !reduced) {
      rotation.y += .0017 + velocityX; rotation.x += velocityY
      velocityX *= .94; velocityY *= .94
      rotation.x = Math.max(-1.1, Math.min(1.1, rotation.x))
    }
    draw()
  }
  frame = requestAnimationFrame(tick)
}
function resize() {
  const rect = host.value.getBoundingClientRect(), ratio = Math.min(window.devicePixelRatio || 1, 2)
  width = rect.width; height = rect.height
  canvas.value.width = Math.round(width * ratio); canvas.value.height = Math.round(height * ratio)
  canvas.value.style.width = `${width}px`; canvas.value.style.height = `${height}px`
  ctx = canvas.value.getContext('2d'); ctx.setTransform(ratio, 0, 0, ratio, 0, 0); draw()
}
function onPointerDown(event) { dragging.value = true; lastX = event.clientX; lastY = event.clientY; canvas.value.setPointerCapture(event.pointerId) }
function onPointerMove(event) {
  if (!dragging.value) return
  const dx = event.clientX - lastX, dy = event.clientY - lastY
  velocityX = dx * .00012; velocityY = dy * .00012
  rotation.y += dx * .008; rotation.x += dy * .008
  rotation.x = Math.max(-1.1, Math.min(1.1, rotation.x)); lastX = event.clientX; lastY = event.clientY
}
function onPointerUp(event) { dragging.value = false; if (canvas.value?.hasPointerCapture(event.pointerId)) canvas.value.releasePointerCapture(event.pointerId) }
onMounted(() => {
  resizeObserver = new ResizeObserver(resize); resizeObserver.observe(host.value)
  intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }); intersectionObserver.observe(host.value)
  themeObserver = new MutationObserver(draw); themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'style'] })
  resize(); tick()
})
onUnmounted(() => { cancelAnimationFrame(frame); resizeObserver?.disconnect(); intersectionObserver?.disconnect(); themeObserver?.disconnect() })
</script>

<style scoped>
.omics-sphere { position: relative; width: 100%; min-height: 520px; user-select: none; }
canvas { position: absolute; inset: 0; cursor: grab; touch-action: pan-y; }
.dragging canvas { cursor: grabbing; }
.sphere-core { position: absolute; left: 50%; top: 47%; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; justify-content: center; width: 142px; height: 142px; border: 1px solid color-mix(in srgb, var(--accent) 24%, #fff7); border-radius: 50%; color: var(--accent); background: color-mix(in srgb, var(--surface) 74%, transparent); box-shadow: inset 0 1px 1px #fff9, 0 20px 70px color-mix(in srgb, var(--accent) 17%, transparent); backdrop-filter: blur(15px); pointer-events: none; }
.sphere-core strong { margin-top: -3px; color: var(--ink); font-size: 31px; line-height: 1; letter-spacing: -1px; }
.sphere-core span { margin-top: 6px; color: var(--muted); font-size: 10px; }
.orbit-label { position: absolute; display: inline-flex; align-items: center; gap: 7px; padding: 9px 12px; border: 1px solid var(--border); border-radius: 12px; color: var(--accent); background: color-mix(in srgb, var(--surface) 80%, transparent); box-shadow: 0 8px 30px #1233; backdrop-filter: blur(12px); font-size: 11px; font-weight: 700; pointer-events: none; animation: orbit-float 5s ease-in-out infinite; }
.orbit-label-a { top: 12%; left: 3%; }
.orbit-label-b { top: 25%; right: 0; animation-delay: -1.8s; }
.orbit-label-c { bottom: 20%; left: 2%; animation-delay: -3.4s; }
.sphere-hint { position: absolute; left: 50%; bottom: 3%; transform: translateX(-50%); display: flex; align-items: center; gap: 8px; color: var(--muted); font-size: 11px; white-space: nowrap; }
.mouse-symbol { width: 14px; height: 20px; border: 1.5px solid var(--muted); border-radius: 8px; }
.mouse-symbol::before { content: ''; display: block; width: 2px; height: 4px; margin: 3px auto; border-radius: 2px; background: var(--accent); animation: mouse-scroll 1.8s infinite; }
@keyframes orbit-float { 50% { transform: translateY(-9px); } }
@keyframes mouse-scroll { 50% { transform: translateY(5px); opacity: .2; } }
@media (max-width: 920px) { .omics-sphere { min-height: 460px; } }
@media (max-width: 520px) { .omics-sphere { min-height: 390px; } .sphere-core { width: 116px; height: 116px; } .orbit-label { padding: 7px 9px; font-size: 9px; } .orbit-label-a { left: 0; } .orbit-label-c { bottom: 18%; } }
@media (prefers-reduced-motion: reduce) { .orbit-label, .mouse-symbol::before { animation: none; } }
</style>
