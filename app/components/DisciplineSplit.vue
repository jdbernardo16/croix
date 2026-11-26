<script setup lang="ts">
const split = ref(50)
</script>

<template>
  <section id="disciplines" class="scroll-mt-24 bg-gallery py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <div class="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
        <div class="lg:col-span-6" data-reveal>
          <p class="label mb-5 flex items-center gap-3 text-bronze-ink">
            <span class="h-1.5 w-1.5 rounded-full bg-bronze"></span>
            02 / Two systems, one standard
          </p>
          <h2 class="display-section text-ink">
            One studio.<br />
            Two ways of seeing.
          </h2>
        </div>
        <div class="lg:col-span-6 lg:pl-10" data-reveal>
          <p class="max-w-xl text-base font-light leading-relaxed text-mineral sm:text-lg">
            Museum-grade hospitality asks for softness, materiality, and restraint. Industrial
            infrastructure asks for proof, enclosure ratings, and zero failure. We run both from the
            same drawing set — without cross-contaminating the palette, the typography, or the
            approval path.
          </p>
        </div>
      </div>

      <!-- Mobile: stacked comparison, no drag -->
      <div class="mt-10 space-y-5 md:hidden" data-reveal>
        <article class="relative h-128 overflow-hidden rounded-panel bg-gallery">
          <img
            src="/img/beam-wall.jpg"
            alt="Window light falling across a plaster wall"
            class="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-gallery via-gallery/55 to-transparent"></div>
          <div class="relative z-10 flex h-full flex-col justify-between p-6">
            <span class="label text-bronze-ink">01 / Architectural</span>
            <div>
              <h3 class="font-museum text-3xl font-extralight tracking-tight text-ink">Gallery light</h3>
              <p class="mt-3 max-w-xs text-sm font-light leading-relaxed text-mineral">
                Museums, hospitality, and heritage. Soft gradients, honest materials, and a night sky
                left alone.
              </p>
              <div class="mt-5 flex items-center gap-4">
                <span class="h-2.5 w-2.5 rounded-full bg-gallery ring-1 ring-ink/10"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-plaster ring-1 ring-ink/10"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-bronze"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-ink"></span>
                <span class="label ml-1 text-mineral">2700K · UGR &lt; 19</span>
              </div>
            </div>
          </div>
        </article>

        <article class="relative h-128 overflow-hidden rounded-panel bg-charcoal text-lab">
          <img
            src="/img/port.jpg"
            alt="Port cranes lit against a deep blue night sky"
            class="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/75 to-charcoal/20"></div>
          <div class="relative z-10 flex h-full flex-col justify-between p-6">
            <span class="label text-ochre">02 / Industrial</span>
            <div>
              <h3 class="font-industrial text-3xl font-bold tracking-tight">Precision light</h3>
              <p class="mt-3 max-w-xs text-sm font-light leading-relaxed text-alloy">
                Explosion-proof, outdoor egress, and marine. Sealed enclosures, verified photometrics, and
                documents that pass inspection.
              </p>
              <div class="mt-5 flex items-center gap-4">
                <span class="h-2.5 w-2.5 rounded-full bg-charcoal ring-1 ring-white/20"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-alloy"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-ochre"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-viridian"></span>
                <span class="label ml-1 text-alloy">IP66/67 · 316L</span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div
        class="split-shell relative mt-12 hidden h-136 overflow-hidden rounded-panel bg-gallery sm:h-152 md:block lg:h-176"
        :style="{ '--split': split + '%' }"
        data-reveal
      >
        <!-- Architectural / gallery system -->
        <div class="absolute inset-0">
          <img
            src="/img/beam-wall.jpg"
            alt="Daylight falling through a quiet concrete stair"
            class="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-gallery/90 via-gallery/45 to-transparent"></div>
          <div class="relative flex h-full flex-col justify-between p-7 sm:p-10">
            <div class="flex items-center justify-between gap-4">
              <span class="label text-bronze-ink">01 / Architectural</span>
              <span class="label hidden text-mineral sm:block">Gallery system</span>
            </div>
            <div class="max-w-sm">
              <h3 class="font-museum text-4xl font-extralight tracking-tight text-ink sm:text-5xl">
                Gallery light
              </h3>
              <p class="mt-4 hidden max-w-xs text-sm font-light leading-relaxed text-mineral sm:block">
                Museums, hospitality, and heritage. Soft gradients, honest materials, and a night sky
                left alone.
              </p>
              <div class="mt-7 flex items-center gap-4">
                <span class="h-2.5 w-2.5 rounded-full bg-gallery ring-1 ring-ink/10"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-plaster ring-1 ring-ink/10"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-bronze"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-ink"></span>
                <span class="label ml-2 hidden text-mineral sm:inline">2700K · CRI 95+ · UGR &lt; 19</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Industrial / precision system -->
        <div class="split-industrial absolute inset-0 bg-charcoal">
          <img
            src="/img/port.jpg"
            alt="Port cranes lit against a deep blue night sky"
            class="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div class="absolute inset-0 bg-gradient-to-l from-charcoal/95 via-charcoal/75 to-charcoal/15"></div>
          <div class="relative flex h-full flex-col items-end justify-between p-7 text-right sm:p-10">
            <div class="flex w-full items-center justify-between gap-4">
              <span class="label hidden text-alloy sm:block">Precision system</span>
              <span class="label text-ochre">02 / Industrial</span>
            </div>
            <div class="flex max-w-sm flex-col items-end">
              <h3 class="font-industrial text-4xl font-bold tracking-tight text-lab sm:text-5xl">
                Precision light
              </h3>
              <p class="mt-4 hidden max-w-xs text-sm font-light leading-relaxed text-alloy sm:block">
                Explosion-proof, outdoor egress, and marine. Sealed enclosures, verified photometrics, and
                documents that pass inspection.
              </p>
              <div class="mt-7 flex flex-row-reverse items-center gap-4">
                <span class="h-2.5 w-2.5 rounded-full bg-charcoal ring-1 ring-white/20"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-alloy"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-ochre"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-viridian"></span>
                <span class="label ml-2 hidden font-mono text-alloy sm:inline">IP66/67 · IK10 · 316L</span>
              </div>
            </div>
          </div>
        </div>

        <input
          v-model.number="split"
          type="range"
          min="12"
          max="88"
          step="1"
          class="split-range"
          aria-label="Compare the architectural gallery system with the industrial precision system"
        />

        <div class="split-handle pointer-events-none absolute inset-y-0 z-20 w-px bg-bronze/80">
          <div
            class="split-grip absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bronze/50 bg-darkroom text-gallery shadow-2xl"
          >
            <span class="font-mono text-sm" aria-hidden="true">↔</span>
          </div>
        </div>
      </div>

      <div class="mt-4 hidden items-center justify-between text-mineral md:flex">
        <span class="label">Drag the aperture</span>
        <span class="label">Same logo. Same standard. Different room.</span>
      </div>
    </div>
  </section>
</template>
