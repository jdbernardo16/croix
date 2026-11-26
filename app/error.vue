<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const is404 = computed(() => props.error.statusCode === 404)

useHead({
  title: is404.value ? 'Page not found — CROIX' : 'Something went wrong — CROIX',
  meta: [{ name: 'robots', content: 'noindex' }],
})

function backHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="min-h-screen bg-darkroom text-gallery">
    <header class="mx-auto max-w-7xl px-5 py-6 sm:px-8">
      <NuxtLink to="/" class="inline-flex rounded-lg bg-gallery p-2.5" aria-label="CROIX — home">
        <img src="/img/logo-word.png" alt="CROIX Lighting Design Studio" class="h-6 w-auto" />
      </NuxtLink>
    </header>

    <main class="relative overflow-hidden">
      <svg
        class="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 1440 700"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <path d="M-80 620 C 320 440, 640 160, 1520 80" stroke="url(#error-beam)" stroke-width="1" />
        <path d="M-60 700 C 380 500, 760 240, 1520 210" stroke="url(#error-beam)" stroke-width="0.7" opacity="0.7" />
        <defs>
          <linearGradient id="error-beam" x1="0" y1="620" x2="1440" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#B39463" stop-opacity="0" />
            <stop offset="52%" stop-color="#B39463" stop-opacity="0.5" />
            <stop offset="100%" stop-color="#F6F5F1" stop-opacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      <div class="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <p class="label flex items-center gap-3 text-bronze">
          <span class="h-1.5 w-1.5 rounded-full bg-bronze"></span>
          {{ error.statusCode || 500 }} / {{ is404 ? 'Not found' : 'Error' }}
        </p>
        <h1 class="display-hero mt-7 max-w-4xl text-gallery">
          {{ is404 ? 'This room is dark.' : 'Something went dark.' }}
        </h1>
        <p class="mt-7 max-w-xl text-base font-light leading-relaxed text-alloy sm:text-lg">
          {{
            is404
              ? 'The page you were looking for is not here. It may have moved, or the link may be incomplete. The work is still where it should be.'
              : 'The site hit an unexpected error. Try the home page, or come back in a moment.'
          }}
        </p>

        <div class="mt-10 flex flex-wrap items-center gap-4">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full bg-gallery px-6 py-3 text-label font-mono uppercase tracking-label text-ink transition hover:bg-bronze"
            @click="backHome"
          >
            Back to the studio <span aria-hidden="true">↗</span>
          </button>
          <NuxtLink to="/work" class="label text-gallery/70 transition hover:text-gallery">Selected work</NuxtLink>
          <NuxtLink to="/contact" class="label text-gallery/70 transition hover:text-gallery">Contact</NuxtLink>
        </div>

        <div class="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
          <span class="label text-alloy">CROIX / Lighting Design Studio</span>
          <span class="label text-alloy">Manila / Milan</span>
        </div>
      </div>
    </main>
  </div>
</template>
