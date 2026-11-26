<script setup lang="ts">
const imageBox = ref<HTMLElement | null>(null)
const mx = ref(56)
const my = ref(38)
const glow = ref(0)

function onMove(event: PointerEvent) {
  if (!imageBox.value || event.pointerType !== 'mouse') return
  const rect = imageBox.value.getBoundingClientRect()
  mx.value = Math.round(((event.clientX - rect.left) / rect.width) * 100)
  my.value = Math.round(((event.clientY - rect.top) / rect.height) * 100)
  glow.value = 1
}
</script>

<template>
  <section id="top" class="light-field grain relative overflow-hidden">
    <svg
      class="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <path d="M-80 700 C 320 480, 660 190, 1520 80" stroke="url(#hero-beam-a)" stroke-width="1" />
      <path d="M-40 790 C 380 540, 780 260, 1520 220" stroke="url(#hero-beam-a)" stroke-width="0.7" opacity="0.7" />
      <path d="M220 920 C 600 560, 980 380, 1520 410" stroke="url(#hero-beam-b)" stroke-width="0.6" opacity="0.5" />
      <defs>
        <linearGradient id="hero-beam-a" x1="0" y1="700" x2="1440" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#B39463" stop-opacity="0" />
          <stop offset="48%" stop-color="#B39463" stop-opacity="0.5" />
          <stop offset="100%" stop-color="#B39463" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="hero-beam-b" x1="220" y1="920" x2="1440" y2="410" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#6E6C67" stop-opacity="0" />
          <stop offset="55%" stop-color="#6E6C67" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#B39463" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>

    <div class="relative z-10 mx-auto max-w-7xl px-5 pb-14 pt-8 sm:px-8 sm:pb-20 sm:pt-10">
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-5 text-mineral">
        <span class="label">CROIX / Turnkey lighting &amp; control</span>
        <span class="label hidden md:block">Manila 14.48°N 121.02°E · Milan 45.46°N 9.19°E</span>
        <span class="label">Edition 2026</span>
      </div>

      <div class="grid grid-cols-1 items-end gap-12 pt-12 lg:grid-cols-12 lg:gap-8 lg:pt-16">
        <div class="lg:col-span-7">
          <p class="label mb-7 flex items-center gap-3 text-bronze-ink">
            <span class="h-1.5 w-1.5 rounded-full bg-bronze"></span>
            Architectural lighting · Photometric engineering
          </p>

          <h1 class="display-hero text-ink">
            Light,<br />
            resolved<span class="text-bronze">.</span>
          </h1>

          <div class="mt-10 max-w-xl">
            <p class="text-base font-light leading-relaxed text-mineral sm:text-lg">
              Milanese design leadership. Manila engineering. One accountable team for lighting design,
              DIALux verification, controls, and commissioning — from first sketch to opening night.
            </p>
            <div class="mt-8 flex flex-wrap items-center gap-6">
              <NuxtLink
                to="/contact"
                class="inline-flex items-center gap-2 rounded-full bg-darkroom px-6 py-3 text-label font-mono uppercase tracking-label text-gallery transition hover:bg-ink"
              >
                Start a project <span aria-hidden="true">↗</span>
              </NuxtLink>
              <NuxtLink to="/work" class="link-quiet label text-mineral transition hover:text-ink">
                Selected work
              </NuxtLink>
            </div>
          </div>

          <div class="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink/10 pt-5 text-mineral">
            <span class="label">UGR &lt; 19</span>
            <span class="label">CRI 95+</span>
            <span class="label">DIALux evo verified</span>
            <span class="label">IP66 / IP67</span>
          </div>
        </div>

        <div class="lg:col-span-5">
          <figure>
            <div
              ref="imageBox"
              class="group relative aspect-3/4 overflow-hidden rounded-aperture bg-darkroom lg:aspect-auto lg:h-160"
              :style="{ '--mx': mx + '%', '--my': my + '%', '--glow': glow }"
              @pointermove="onMove"
              @pointerleave="glow = 0"
            >
              <img
                src="/img/museum-figure.jpg"
                alt="A visitor looking at a painting lit by a single warm spotlight"
                class="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                loading="eager"
                decoding="async"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-darkroom/90 via-darkroom/15 to-transparent"></div>
              <div class="hero-glow pointer-events-none absolute inset-0"></div>

              <div class="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-darkroom/40 px-3 py-1.5 backdrop-blur-md">
                <span class="h-1.5 w-1.5 rounded-full bg-bronze"></span>
                <span class="label text-gallery">2700K</span>
              </div>

              <div class="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-7">
                <div>
                  <span class="label block text-gallery/80">Study 01 / Nocturne</span>
                  <span class="mt-1 block font-museum text-xl font-light text-gallery">
                    One source, one subject
                  </span>
                </div>
                <span class="label text-right text-gallery/70">CRI 95+<br />24° beam</span>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between text-mineral">
              <span class="label">Aperture 01</span>
              <span class="label">Manila / Milan</span>
            </div>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>
