<script setup lang="ts">
import type { CmsHomePage } from '~/types/cms'
import { home as snapshotHome } from '~/data/content'
import { cmsText } from '~/utils/cms'

const props = withDefaults(
  defineProps<{
    proof?: CmsHomePage['proof']
  }>(),
  { proof: () => snapshotHome.proof },
)

const stats = computed(() =>
  props.proof.stats.map((stat) => ({
    value: cmsText(stat.value),
    label: cmsText(stat.label),
    note: cmsText(stat.note),
  })),
)

const steps = computed(() =>
  props.proof.steps.map((step) => ({
    title: cmsText(step.title),
    note: cmsText(step.note),
  })),
)

const view = computed(() => ({
  eyebrow: cmsText(props.proof.eyebrow),
  titleLine1: cmsText(props.proof.titleLine1),
  titleLine2: cmsText(props.proof.titleLine2),
  intro: cmsText(props.proof.intro),
  image: props.proof.image?.src || '/img/projects/ccp-int-false.jpg',
  imageAlt: cmsText(props.proof.imageAlt),
  imageBadge: cmsText(props.proof.imageBadge),
  imageCaption: cmsText(props.proof.imageCaption),
  imageMeta: cmsText(props.proof.imageMeta),
  imageFooterLeft: cmsText(props.proof.imageFooterLeft),
  imageFooterRight: cmsText(props.proof.imageFooterRight),
  sequenceLabel: cmsText(props.proof.sequenceLabel),
  phaseCount: cmsText(props.proof.phaseCount),
  footerNote: cmsText(props.proof.footerNote),
  footerLinkLabel: cmsText(props.proof.footerLinkLabel),
}))
</script>

<template>
  <section id="numbers" class="relative scroll-mt-24 overflow-hidden bg-darkroom text-gallery">
    <div class="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <div class="grid grid-cols-1 items-end gap-8 lg:grid-cols-12" data-reveal>
        <div class="lg:col-span-7">
          <p class="label mb-5 flex items-center gap-3 text-bronze">
            <span class="h-1.5 w-1.5 rounded-full bg-bronze"></span>
            {{ view.eyebrow }}
          </p>
          <h2 class="display-section text-gallery">
            {{ view.titleLine1 }}<br />
            {{ view.titleLine2 }}
          </h2>
        </div>
        <div class="lg:col-span-5 lg:pl-8">
          <p class="max-w-md text-base font-light leading-relaxed text-alloy sm:text-lg">
            {{ view.intro }}
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
            :src="view.image"
            :alt="view.imageAlt"
            class="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-darkroom/85 via-transparent to-darkroom/25"></div>
          <div class="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-darkroom/50 px-3 py-1.5 backdrop-blur-md">
            <span class="h-1.5 w-1.5 rounded-full bg-viridian"></span>
            <span class="label text-gallery">{{ view.imageBadge }}</span>
          </div>
          <div class="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-5 sm:p-7">
            <span class="label text-gallery">{{ view.imageCaption }}</span>
            <span class="label text-gallery/70">{{ view.imageMeta }}</span>
          </div>
        </div>
        <div class="mt-3 flex items-center justify-between text-alloy">
          <span class="label">{{ view.imageFooterLeft }}</span>
          <span class="label">{{ view.imageFooterRight }}</span>
        </div>
      </figure>

      <div class="mt-20" data-reveal>
        <div class="flex items-center justify-between">
          <span class="label text-alloy">{{ view.sequenceLabel }}</span>
          <span class="label text-alloy">{{ view.phaseCount }}</span>
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
          <span class="label text-alloy">{{ view.footerNote }}</span>
          <NuxtLink to="/services" class="link-quiet label text-bronze transition hover:text-gallery">
            {{ view.footerLinkLabel }} ↗
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
