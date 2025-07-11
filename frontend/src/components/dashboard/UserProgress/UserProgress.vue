<template>
  <Card variant="interactive">
    <div class="flex items-center justify-between mb-6">
      <!-- User info -->
      <div class="flex items-center space-x-4">
        <!-- Avatar placeholder -->
        <div class="w-12 h-12 rounded-full flex items-center justify-center"
             :style="{ background: 'color-mix(in srgb, var(--theme-accent) 20%, transparent 80%)' }">
          <span class="text-lg font-bold" :style="{ color: 'var(--theme-accent)' }">
            {{ getInitials(username) }}
          </span>
        </div>

        <!-- User details -->
        <div>
          <h2 class="text-xl font-bold" :style="{ color: 'var(--theme-accent)' }">{{ username }}</h2>
          <p class="text-sm" :style="{ color: 'var(--theme-border)' }">
            Nivel {{ level }} • {{ xp }} XP
          </p>
        </div>
      </div>

      <!-- Current streak -->
      <div class="text-right">
        <p class="text-sm" :style="{ color: 'var(--theme-border)' }">Mejor racha</p>
        <p class="text-2xl font-bold" :style="{ color: 'var(--theme-accent)' }">{{ longestStreak }} días</p>
      </div>
    </div>

    <!-- Barra de experiencia visual integrada -->
    <div class="flex flex-col w-full mb-4">
      <div class="flex items-center justify-between mb-1">
        <span class="font-bold text-lg" :style="{ color: 'var(--theme-border)' }">Nivel {{ level }}</span>
        <span class="font-semibold" :style="{ color: 'var(--theme-accent)' }">
          {{ title }}
        </span>
      </div>
      <div class="w-full rounded-full h-3 relative" :style="{ background: 'color-mix(in srgb, var(--theme-accent) 20%, transparent 80%)' }">
        <div class="h-3 rounded-full" :style="{ background: 'var(--theme-accent)', width: `${levelProgress}%` }"></div>
        <span class="absolute right-2 top-0 text-xs font-mono" :style="{ color: 'var(--theme-accent-contrast, #fff)' }">{{ xpProgress }} / {{ xpForNextLevel - xpForCurrentLevel }} XP</span>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats-flex-responsive mt-8">
      <!-- Columna 1 -->
      <div class="stat-col-mobile" tabindex="0">
        <span class="hidden sm:block stat-label-desktop" :style="{ color: 'var(--theme-border)' }">Módulos desbloqueados</span>
        <span class="block sm:hidden stat-icon-mobile" tabindex="0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-7 w-7 mb-1" :style="{ color: 'var(--theme-border)' }">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          <span class="tooltip-horizontal-mobile">Módulos desbloqueados</span>
        </span>
        <span class="stat-value-mobile"><span class="text-xl font-bold" :style="{ color: 'var(--theme-accent)' }">{{ stats.modules_unlocked }}</span></span>
      </div>
      <!-- Columna 2 -->
      <div class="stat-col-mobile" tabindex="0">
        <span class="hidden sm:block stat-label-desktop" :style="{ color: 'var(--theme-border)' }">Misiones completadas</span>
        <span class="block sm:hidden stat-icon-mobile" tabindex="0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-7 w-7 mb-1" :style="{ color: 'var(--theme-border)' }">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
          </svg>
          <span class="tooltip-horizontal-mobile">Misiones completadas</span>
        </span>
        <span class="stat-value-mobile"><span class="text-xl font-bold" :style="{ color: 'var(--theme-accent)' }">{{ stats.missions_completed }}</span></span>
      </div>
      <!-- Columna 3 -->
      <div class="stat-col-mobile" tabindex="0">
        <span class="hidden sm:block stat-label-desktop" :style="{ color: 'var(--theme-border)' }">Logros obtenidos</span>
        <span class="block sm:hidden stat-icon-mobile" tabindex="0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-7 w-7 mb-1" :style="{ color: 'var(--theme-border)' }">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
          </svg>
          <span class="tooltip-horizontal-mobile">Logros obtenidos</span>
        </span>
        <span class="stat-value-mobile"><span class="text-xl font-bold" :style="{ color: 'var(--theme-accent)' }">{{ stats.achievements_earned }}</span></span>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/ui/Card.vue'
import { computed } from 'vue'

interface Props {
  username: string
  level: number
  xp: number
  stats: {
    modules_unlocked: number
    missions_completed: number
    achievements_earned: number
  }
  longestStreak: number
  title: string
}

const props = defineProps<Props>()

// Computed values
const xpForCurrentLevel = computed(() => (props.level - 1) * 100)
const xpForNextLevel = computed(() => props.level * 100)
const xpProgress = computed(() => props.xp - xpForCurrentLevel.value)
const levelProgress = computed(() => 
  (xpProgress.value / (xpForNextLevel.value - xpForCurrentLevel.value)) * 100
)

// El título ahora viene del backend vía prop "title"

// Methods
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
</script>

<style scoped>
.progress-pulse {
  animation: progress-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes progress-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .7;
  }
}

.stats-row {
  width: 100%;
}
.stats-row-horizontal {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  margin-bottom: 0.5rem;
}
.stats-flex-responsive {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  gap: 2.5rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
.stat-col {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
}
.stat-col-mobile {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
  position: relative;
}
.stat-label {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  min-height: 2.2rem;
  text-align: center;
}
.stat-label-desktop {
  display: none;
}
.stat-icon {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--theme-border);
  font-size: 1.2rem;
  cursor: pointer;
  min-width: 80px;
}
.stat-icon-mobile {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.tooltip {
  visibility: hidden;
  background: #222;
  color: #FFD700;
  text-align: center;
  border-radius: 4px;
  padding: 0.2rem 0.7rem;
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  font-size: 0.85rem;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
}
.tooltip-horizontal {
  visibility: hidden;
  background: #222;
  color: #FFD700;
  text-align: center;
  border-radius: 4px;
  padding: 0.2rem 0.7rem;
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  font-size: 0.85rem;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
}
.tooltip-horizontal-mobile {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  left: 50%;
  top: 110%;
  transform: translateX(-50%);
  background: #222;
  color: #FFD700;
  border-radius: 4px;
  padding: 0.2rem 0.7rem;
  font-size: 0.85rem;
  white-space: nowrap;
  z-index: 20;
  transition: opacity 0.2s;
  pointer-events: none;
}
.stat-icon:hover .tooltip,
.stat-icon:focus .tooltip {
  visibility: visible;
  opacity: 1;
}
.stat-icon-horizontal:hover .tooltip-horizontal,
.stat-icon-horizontal:focus .tooltip-horizontal {
  visibility: visible;
  opacity: 1;
}
.stat-icon-mobile:focus .tooltip-horizontal-mobile,
.stat-icon-mobile:active .tooltip-horizontal-mobile {
  visibility: visible;
  opacity: 1;
  pointer-events: auto;
}
@media (max-width: 700px) {
  .stats-flex-responsive {
    flex-direction: row !important;
    gap: 0.5rem;
    align-items: flex-start;
    justify-content: space-between;
    max-width: 100%;
  }
  .stat-col-mobile {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 0.2rem;
    width: 100%;
  }
  .stat-label-desktop {
    display: none !important;
  }
  .stat-value-mobile {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-top: 0.2rem;
    font-size: 1.3rem;
    min-height: 32px;
  }
}
@media (max-width: 500px) {
  .stats-flex-responsive {
    gap: 0.2rem;
  }
}

@media (max-width: 700px) {
  .stats-flex-responsive {
    flex-direction: row !important;
  }
}

@media (max-width: 700px) {
  .stats-flex-responsive {
    flex-direction: column;
    gap: 1.2rem;
    align-items: stretch;
    max-width: 100%;
  }
  .stat-col {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 1.2rem;
    width: 100%;
  }
  .stat-label, .stat-value-mobile {
    width: auto;
    justify-content: flex-start;
    text-align: left;
  }
  .stat-label span, .stat-value-mobile span {
    width: auto;
    text-align: left;
  }
}
</style>
