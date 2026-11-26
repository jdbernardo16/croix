<script setup lang="ts">
import type { Project } from '~/data/projects'

const props = defineProps<{
  project: Project
  index?: string
  hero?: boolean
}>()
</script>

<template>
  <div class="plate h-full w-full" :class="`plate--${props.project.plate}`">
    <svg
      class="pointer-events-none absolute inset-0 h-full w-full opacity-45"
      viewBox="0 0 640 480"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <path d="M-40 420 C 160 300, 340 120, 680 60" stroke="#F6F5F1" stroke-opacity="0.35" stroke-width="0.8" />
      <path d="M-20 470 C 220 330, 420 210, 680 190" stroke="#B39463" stroke-opacity="0.5" stroke-width="0.6" />
      <path d="M180 520 C 340 350, 520 270, 700 300" stroke="#F6F5F1" stroke-opacity="0.2" stroke-width="0.5" />
    </svg>

    <div class="relative z-10 flex h-full flex-col justify-between p-5 sm:p-7">
      <div class="flex items-start justify-between gap-4">
        <span class="label text-gallery/70">{{ props.index ?? props.project.sector }}</span>
        <span class="label text-right text-gallery/55">{{ props.project.sector }}</span>
      </div>

      <div>
        <span class="label block text-gallery/45">Light study / imagery in production</span>
        <p
          class="mt-3 font-museum font-extralight tracking-tight text-gallery"
          :class="props.hero ? 'text-4xl leading-[0.98] sm:text-6xl' : 'text-2xl leading-tight sm:text-3xl'"
        >
          {{ props.project.name }}
        </p>
        <p class="label mt-3 text-gallery/60">{{ props.project.location }}</p>
      </div>
    </div>
  </div>
</template>
