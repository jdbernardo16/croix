<script setup lang="ts">
const stats = [
  {
    value: '35–55%',
    label: 'Lower consultancy fees',
    note: 'Against comparable studios in North America, Europe, the Middle East, and Australia.',
  },
  {
    value: 'UGR < 19',
    label: 'Glare compliance',
    note: 'Verified in DIALux evo before a single fixture is purchased.',
  },
  {
    value: '5,000 m²',
    label: 'Volume tier',
    note: 'Rate reductions on master plans, railways, and repetitive units.',
  },
  {
    value: '05',
    label: 'Phases, one team',
    note: 'Concept to commissioning, with no handover gaps.',
  },
]

const steps = [
  { title: 'Concept & simulation', note: 'Dialux evo, false-colour, UGR' },
  { title: 'Detailed plans', note: 'RCP, aiming, beam angles, Revit' },
  { title: 'Control architecture', note: 'SLDs, DALI / DMX, load schedules' },
  { title: 'Procurement', note: 'Brand-neutral schedules, BoQ' },
  { title: 'Commissioning', note: 'Night aiming, lux verification, as-builts' },
]
</script>

<template>
  <section id="numbers" class="relative scroll-mt-24 overflow-hidden bg-darkroom text-gallery">
    <div class="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div class="grid grid-cols-1 items-end gap-8 lg:grid-cols-12" data-reveal>
        <div class="lg:col-span-7">
          <p class="label mb-5 flex items-center gap-3 text-bronze">
            <span class="h-1.5 w-1.5 rounded-full bg-bronze"></span>
            04 / The evidence
          </p>
          <h2 class="display-section text-gallery">
            The numbers are<br />
            part of the design.
          </h2>
        </div>
        <div class="lg:col-span-5 lg:pl-8">
          <p class="max-w-md text-base font-light leading-relaxed text-alloy sm:text-lg">
            Lighting is the one trade where “it looks fine” is not a submittal. Every scheme leaves the
            studio with illuminance values, glare limits, load schedules, and a code path.
          </p>
        </div>
      </div>

      <div class="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
        <div v-for="stat in stats" :key="stat.label" class="border-t border-white/15 pt-6">
          <p class="font-museum text-4xl font-extralight tracking-tight text-gallery sm:text-5xl">
            {{ stat.value }}
          </p>
          <p class="label mt-5 text-bronze">{{ stat.label }}</p>
          <p class="mt-2 max-w-56 text-xs font-light leading-relaxed text-alloy">{{ stat.note }}</p>
        </div>
      </div>

      <figure class="mt-20" data-reveal>
        <div class="relative aspect-16/9 overflow-hidden rounded-aperture bg-charcoal sm:aspect-21/9">
          <img
            src="/img/projects/ccp-int-false.jpg"
            alt="DIALux false-colour illuminance map of the Cultural Center of the Philippines grand lobby"
            class="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-darkroom/85 via-transparent to-darkroom/25"></div>
          <div class="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-darkroom/50 px-3 py-1.5 backdrop-blur-md">
            <span class="h-1.5 w-1.5 rounded-full bg-viridian"></span>
            <span class="label text-gallery">DIALux evo / verified</span>
          </div>
          <div class="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-5 sm:p-7">
            <span class="label text-gallery">CCP Grand Lobby — false-colour illuminance</span>
            <span class="label text-gallery/70">UGR &lt; 19 · 150 lx target</span>
          </div>
        </div>
        <div class="mt-3 flex items-center justify-between text-alloy">
          <span class="label">Photometric proof, not a mood board</span>
          <span class="label">Sheet 01 / 05</span>
        </div>
      </figure>

      <div class="mt-20" data-reveal>
        <div class="flex items-center justify-between">
          <span class="label text-alloy">Delivery sequence</span>
          <span class="label text-alloy">05 phases</span>
        </div>
        <div class="relative mt-7">
          <div class="absolute left-0 top-1 hidden h-px w-4/5 bg-white/15 sm:block"></div>
          <div class="process-line absolute left-0 top-1 hidden h-px w-4/5 bg-bronze sm:block"></div>
          <ol class="relative grid grid-cols-1 gap-8 sm:grid-cols-5">
            <li
              v-for="(step, index) in steps"
              :key="step.title"
              class="border-l border-white/15 pl-5 sm:border-l-0 sm:pl-0"
            >
              <span class="block h-2 w-2 rounded-full bg-bronze"></span>
              <span class="label mt-5 block text-bronze">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="mt-2 block font-museum text-lg font-light leading-snug text-gallery">
                {{ step.title }}
              </span>
              <span class="mt-1 block text-xs font-light leading-relaxed text-alloy">{{ step.note }}</span>
            </li>
          </ol>
        </div>

        <div class="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
          <span class="label text-alloy">Three packages, one delivery standard</span>
          <NuxtLink to="/services" class="link-quiet label text-bronze transition hover:text-gallery">
            Explore services ↗
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
