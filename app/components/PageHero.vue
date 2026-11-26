<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    section: string
    eyebrow: string
    title?: string
    intro?: string
    size?: 'page' | 'section'
  }>(),
  { size: 'page' },
)
</script>

<template>
  <section class="light-field grain relative overflow-hidden border-b border-ink/10">
    <svg
      class="pointer-events-none absolute inset-0 h-full w-full opacity-50"
      viewBox="0 0 1440 620"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <path d="M-80 560 C 320 400, 700 180, 1520 70" stroke="url(#page-beam)" stroke-width="0.9" />
      <path d="M120 700 C 520 430, 900 280, 1520 260" stroke="url(#page-beam)" stroke-width="0.6" opacity="0.6" />
      <defs>
        <linearGradient id="page-beam" x1="0" y1="560" x2="1440" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#B39463" stop-opacity="0" />
          <stop offset="52%" stop-color="#B39463" stop-opacity="0.38" />
          <stop offset="100%" stop-color="#B39463" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>

    <div class="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-10">
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-5 text-mineral">
        <span class="label">CROIX / {{ section }}</span>
        <span class="label hidden md:block">Manila 14.48°N 121.02°E · Milan 45.46°N 9.19°E</span>
        <span class="label">Edition 2026</span>
      </div>

      <div class="grid grid-cols-1 items-end gap-10 pt-12 lg:grid-cols-12 lg:pt-14">
        <div class="lg:col-span-8">
          <p class="label mb-6 flex items-center gap-3 text-bronze-ink">
            <span class="h-1.5 w-1.5 rounded-full bg-bronze"></span>
            {{ eyebrow }}
          </p>
          <h1 class="text-ink" :class="props.size === 'section' ? 'display-section' : 'display-page'">
            <slot name="title">{{ title }}</slot>
          </h1>
        </div>
        <div class="lg:col-span-4">
          <p v-if="intro" class="max-w-md text-base font-light leading-relaxed text-mineral sm:text-lg">
            {{ intro }}
          </p>
          <slot name="aside" />
        </div>
      </div>

      <slot />
    </div>
  </section>
</template>
