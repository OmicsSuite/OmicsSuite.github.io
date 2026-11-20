<template>
  <div ref="host" class="showcase" :class="{ active }" @pointermove="onMove" @pointerleave="onLeave" aria-label="OmicsSuite desktop workspace preview">
    <div class="showcase-glow" :style="{ transform: `translate3d(${glowX}px, ${glowY}px, 0)` }"></div>
    <div class="showcase-float">
      <div class="showcase-tilt" :style="tiltStyle">
        <div class="app-window">
          <div class="window-bar">
            <span class="dot dot-a"></span><span class="dot dot-b"></span><span class="dot dot-c"></span>
            <span class="window-title">OmicsSuite · Multi-omics workspace</span>
            <span class="window-version">v2.0.0</span>
          </div>
          <img class="app-shot" :src="`${base}assets/images/software-home.jpg`" loading="eager" fetchpriority="high" decoding="async" alt="OmicsSuite home: tool catalog on the left, result gallery in the middle, release panel on the right" />
        </div>
        <div class="float-panel">
          <div class="float-bar"><GlassIcon name="scatter-plot" :size="14" /><span>ScatterPlot</span><small>live figure</small></div>
          <img :src="`${base}assets/images/software-scatterplot.jpg`" loading="lazy" decoding="async" alt="ScatterPlot subprogram: parameter panel and grouped scatter plot" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onUnmounted, ref } from 'vue'
import GlassIcon from './GlassIcon.vue'

const base = import.meta.env.BASE_URL
const host = ref(null)
const active = ref(false)
const rx = ref(0), ry = ref(0), glowX = ref(0), glowY = ref(0)
let targetX = 0, targetY = 0, frame = 0
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

const tiltStyle = computed(() => ({ transform: `perspective(1350px) rotateX(${rx.value * 7}deg) rotateY(${ry.value * 7}deg)` }))

function scheduleLoop() {
  if (!frame && !reduced.matches) frame = requestAnimationFrame(loop)
}
function loop() {
  frame = 0
  rx.value += (targetX - rx.value) * 0.16
  ry.value += (targetY - ry.value) * 0.16
  glowX.value += (targetY * 26 - glowX.value) * 0.18
  glowY.value += (targetX * 22 - glowY.value) * 0.18
  const settling = Math.max(Math.abs(targetX - rx.value), Math.abs(targetY - ry.value), Math.abs(targetY * 26 - glowX.value) / 26, Math.abs(targetX * 22 - glowY.value) / 22)
  if (settling > 0.001) scheduleLoop()
  else { rx.value = targetX; ry.value = targetY; glowX.value = targetY * 26; glowY.value = targetX * 22 }
}
function onMove(event) {
  if (reduced.matches) return
  const rect = host.value.getBoundingClientRect()
  targetY = ((event.clientX - rect.left) / rect.width - 0.5) * 2
  targetX = ((event.clientY - rect.top) / rect.height - 0.5) * 2
  active.value = true
  scheduleLoop()
}
function onLeave() {
  targetX = 0
  targetY = 0
  active.value = false
  scheduleLoop()
}
onUnmounted(() => cancelAnimationFrame(frame))
</script>

<style scoped>
.showcase { position: relative; width: 100%; max-width: 760px; margin-inline: auto; perspective: 1500px; }
.showcase-glow { position: absolute; inset: 8% 4% 4%; background: radial-gradient(closest-side, color-mix(in srgb, var(--accent) 15%, transparent), transparent 78%); filter: blur(18px); transition: transform .2s ease-out; will-change: transform; }
.showcase-float { animation: showcase-float 9s ease-in-out infinite; }
.showcase-tilt { position: relative; transform-style: preserve-3d; transition: transform .12s linear; }
.app-window { position: relative; overflow: hidden; border: 1px solid color-mix(in srgb, var(--accent) 18%, var(--border)); border-radius: 18px; background: var(--surface); box-shadow: 0 42px 90px color-mix(in srgb, var(--ink) 26%, transparent), 0 8px 24px color-mix(in srgb, var(--ink) 10%, transparent); }
.app-window::after { content: ''; position: absolute; inset: 0; background: linear-gradient(118deg, #ffffff38 0%, transparent 34%, transparent 66%, #ffffff12 100%); pointer-events: none; }
.window-bar { display: flex; align-items: center; gap: 6px; height: 34px; padding: 0 13px; border-bottom: 1px solid var(--border); background: color-mix(in srgb, var(--surface) 82%, var(--accent) 6%); }
.dot { width: 7px; height: 7px; border-radius: 50%; background: #d9dedb; }
.dot-a { background: #e59a8a; } .dot-b { background: #e2c576; } .dot-c { background: #8cc6a8; }
.window-title { margin-left: 8px; color: var(--muted); font-size: 10px; font-weight: 650; }
.window-version { margin-left: auto; padding: 2px 8px; border-radius: 999px; color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, transparent); font-size: 9px; font-weight: 700; }
.app-shot { display: block; width: 100%; height: auto; aspect-ratio: 1.6; object-fit: cover; object-position: 22% top; }
.float-panel { position: absolute; right: -6%; bottom: -7%; width: 41%; overflow: hidden; border: 1px solid color-mix(in srgb, var(--accent) 22%, #ffffff55); border-radius: 14px; background: var(--surface); box-shadow: 0 26px 60px color-mix(in srgb, var(--ink) 30%, transparent); transform: translateZ(55px) rotate(1.4deg); transition: transform .5s var(--ease-soft); }
.showcase:hover .float-panel { transform: translateZ(70px) rotate(0.6deg) translateY(-4px); }
.float-bar { display: flex; align-items: center; gap: 6px; padding: 7px 10px; border-bottom: 1px solid var(--border); color: var(--accent); background: color-mix(in srgb, var(--surface) 86%, var(--accent) 5%); font-size: 9px; font-weight: 700; }
.float-bar small { margin-left: auto; color: var(--muted); font-weight: 600; }
.float-panel img { display: block; width: 100%; height: auto; }
.live-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 16%, transparent); animation: live-pulse 2.6s ease-in-out infinite; }
@keyframes showcase-float { 50% { transform: translate3d(0, -12px, 0); } }
@keyframes live-pulse { 50% { box-shadow: 0 0 0 7px color-mix(in srgb, var(--accent) 6%, transparent); opacity: .85; } }
@media (max-width: 920px) { .showcase { max-width: 660px; } .float-panel { right: -3%; bottom: -5%; width: 43%; } }
@media (max-width: 620px) { .app-shot { aspect-ratio: 1.45; object-position: 15% top; } .float-panel { right: -2%; bottom: -8%; width: 46%; } }
@media (max-width: 520px) { .float-panel { width: 50%; right: -1%; bottom: -6%; } .app-shot { aspect-ratio: 1.5; } }
@media (prefers-reduced-motion: reduce) { .showcase-float { animation: none; } .showcase-tilt { transition: none; } .live-dot { animation: none; } }
</style>
