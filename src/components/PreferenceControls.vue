<template>
  <div class="preference-controls">

    <el-dropdown trigger="click" @command="preferencesStore.setAccent" popper-class="palette-popper">
      <button class="pref-trigger" type="button" :aria-label="t('pref.palette')">
        <GlassIcon name="palette" :size="20" /><span class="pref-label">{{ t('pref.palette') }}</span>
      </button>
      <template #dropdown>
        <el-dropdown-menu class="palette-menu">
          <el-dropdown-item v-for="choice in accentChoices" :key="choice.value" :command="choice.value">
            <span class="palette-dot" :style="{ background: choice.color }"></span>
            <span>{{ pick(choice.zh, choice.en) }}</span>
            <GlassIcon v-if="preferences.accent === choice.value" name="circle-check" :size="16" class="palette-check" />
          </el-dropdown-item>
          <el-dropdown-item command="custom" class="custom-color-item">
            <span class="palette-dot custom-dot" :style="{ background: preferences.customColor }"></span>
            <span>{{ t('pref.custom') }}</span>
            <input type="color" :value="preferences.customColor" :aria-label="t('pref.custom')" @click.stop @input="preferencesStore.setCustomColor($event.target.value)" />
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-dropdown trigger="click" @command="preferencesStore.setThemeMode">
      <button class="pref-trigger" type="button" :aria-label="t('pref.brightness')">
        <GlassIcon :name="preferences.mode === 'dark' ? 'moon' : preferences.mode === 'light' ? 'sun' : 'settings'" :size="20" />
        <span class="pref-label">{{ t(`pref.${preferences.mode}`) }}</span>
      </button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="mode in ['light', 'dark', 'system']" :key="mode" :command="mode" :class="{ selected: preferences.mode === mode }">
            <GlassIcon :name="mode === 'dark' ? 'moon' : mode === 'light' ? 'sun' : 'settings'" :size="17" />
            {{ t(`pref.${mode}`) }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import GlassIcon from './GlassIcon.vue'
import { useI18n } from '../i18n.js'
import { accentChoices, preferences, preferencesStore } from '../preferences.js'
const { t, pick } = useI18n()
</script>

<style scoped>
.preference-controls { display: flex; align-items: center; gap: 7px; }
.pref-trigger { display: inline-flex; align-items: center; justify-content: center; gap: 7px; height: 38px; padding: 0 11px; border: 1px solid var(--border); border-radius: 12px; color: var(--muted); background: color-mix(in srgb, var(--surface) 74%, transparent); box-shadow: inset 0 1px 0 color-mix(in srgb, #ffffff 20%, transparent); font: inherit; font-size: 12px; font-weight: 650; cursor: pointer; transition: border-color .35s var(--ease-soft), color .35s var(--ease-soft), background .35s var(--ease-soft), box-shadow .35s var(--ease-soft), transform .35s var(--ease-soft); }
.pref-trigger:hover { color: var(--accent); border-color: color-mix(in srgb, var(--accent) 42%, var(--border)); background: color-mix(in srgb, var(--accent) 9%, var(--surface)); box-shadow: 0 8px 22px color-mix(in srgb, var(--accent) 16%, transparent); transform: translateY(-1px); }
.pref-trigger:active { transform: translateY(0) scale(.97); }
.palette-dot { width: 17px; height: 17px; border-radius: 6px; box-shadow: inset 0 0 0 1px #0002, 0 2px 4px #0001; }
.palette-check { margin-left: auto; color: var(--accent); }
.custom-dot { background: conic-gradient(#c65770, #d4a745, #2c9c78, #4b77b9, #c65770); }
.selected { color: var(--accent); font-weight: 700; }
:deep(.el-dropdown-menu__item.selected)::after { content: ''; width: 6px; height: 6px; margin-left: 10px; border-radius: 50%; background: var(--accent); }
@media (max-width: 1180px) { .pref-label { display: none; } .pref-trigger { width: 38px; padding: 0; } }
@media (max-width: 520px) { .preference-controls { flex-wrap: wrap; } .pref-trigger { width: auto; min-width: 42px; padding: 0 10px; } .pref-label { display: inline; } }
</style>
