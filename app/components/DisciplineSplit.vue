<script setup lang="ts">
import type { CmsDisciplineCard, CmsHomePage } from '~/types/cms'
import { home as snapshotHome } from '~/data/home'
import { cmsText } from '~/utils/cms'

const props = withDefaults(
  defineProps<{
    disciplines?: CmsHomePage['disciplines']
  }>(),
  { disciplines: () => snapshotHome.disciplines },
)

const split = ref(50)

type Card = {
  number: string
  title: string
  body: string
  meta: string
  image: string
  imageAlt: string
}

const fallbackImages: Array<Pick<Card, 'image' | 'imageAlt'>> = [
  {
    image: '/img/beam-wall.jpg',
    imageAlt: 'Daylight falling through a quiet concrete stair',
  },
  {
    image: '/img/port.jpg',
    imageAlt: 'Port cranes lit against a deep blue night sky',
  },
]

function toCard(card: CmsDisciplineCard | undefined, index: number): Card {
  const fallback = fallbackImages[index] ?? { image: '', imageAlt: '' }

  return {
    number: cmsText(card?.number),
    title: cmsText(card?.title),
    body: cmsText(card?.body),
    meta: cmsText(card?.meta),
    image: card?.image?.src || fallback.image,
    imageAlt: cmsText(card?.imageAlt, fallback.imageAlt),
  }
}

const view = computed(() => ({
  eyebrow: cmsText(props.disciplines.eyebrow),
  titleLine1: cmsText(props.disciplines.titleLine1),
  titleLine2: cmsText(props.disciplines.titleLine2),
  intro: cmsText(props.disciplines.intro),
  footerLeft: cmsText(props.disciplines.footerLeft),
  footerRight: cmsText(props.disciplines.footerRight),
  cards: [
    toCard(props.disciplines.cards[0], 0),
    toCard(props.disciplines.cards[1], 1),
  ] as [Card, Card],
}))

const galleryCard = computed(() => view.value.cards[0])
const precisionCard = computed(() => view.value.cards[1])
</script>

<template>
  <section id="disciplines" class="scroll-mt-24 bg-gallery py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <div class="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
        <div class="lg:col-span-6" data-reveal>
          <p class="label mb-5 flex items-center gap-3 text-bronze-ink">
            <span class="h-1.5 w-1.5 rounded-full bg-bronze"></span>
            {{ view.eyebrow }}
          </p>
          <h2 class="display-section text-ink">
            {{ view.titleLine1 }}<br />
            {{ view.titleLine2 }}
          </h2>
        </div>
        <div class="lg:col-span-6 lg:pl-10" data-reveal>
          <p class="max-w-xl text-base font-light leading-relaxed text-mineral sm:text-lg">
            {{ view.intro }}
          </p>
        </div>
      </div>

      <!-- Mobile: stacked comparison, no drag -->
      <div class="mt-10 space-y-5 md:hidden" data-reveal>
        <article class="relative h-128 overflow-hidden rounded-panel bg-gallery">
          <img
            :src="galleryCard.image"
            :alt="galleryCard.imageAlt"
            class="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-gallery via-gallery/55 to-transparent"></div>
          <div class="relative z-10 flex h-full flex-col justify-between p-6">
            <span class="label text-bronze-ink">{{ galleryCard.number }}</span>
            <div>
              <h3 class="font-museum text-3xl font-extralight tracking-tight text-ink">{{ galleryCard.title }}</h3>
              <p class="mt-3 max-w-xs text-sm font-light leading-relaxed text-mineral">
                {{ galleryCard.body }}
              </p>
              <div class="mt-5 flex items-center gap-4">
                <span class="h-2.5 w-2.5 rounded-full bg-gallery ring-1 ring-ink/10"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-plaster ring-1 ring-ink/10"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-bronze"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-ink"></span>
                <span class="label ml-1 text-mineral">{{ galleryCard.meta }}</span>
              </div>
            </div>
          </div>
        </article>

        <article class="relative h-128 overflow-hidden rounded-panel bg-charcoal text-lab">
          <img
            :src="precisionCard.image"
            :alt="precisionCard.imageAlt"
            class="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/75 to-charcoal/20"></div>
          <div class="relative z-10 flex h-full flex-col justify-between p-6">
            <span class="label text-ochre">{{ precisionCard.number }}</span>
            <div>
              <h3 class="font-industrial text-3xl font-bold tracking-tight">{{ precisionCard.title }}</h3>
              <p class="mt-3 max-w-xs text-sm font-light leading-relaxed text-alloy">
                {{ precisionCard.body }}
              </p>
              <div class="mt-5 flex items-center gap-4">
                <span class="h-2.5 w-2.5 rounded-full bg-charcoal ring-1 ring-white/20"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-alloy"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-ochre"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-viridian"></span>
                <span class="label ml-1 text-alloy">{{ precisionCard.meta }}</span>
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
            :src="galleryCard.image"
            :alt="galleryCard.imageAlt"
            class="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-gallery/90 via-gallery/45 to-transparent"></div>
          <div class="relative flex h-full flex-col justify-between p-7 sm:p-10">
            <div class="flex items-center justify-between gap-4">
              <span class="label text-bronze-ink">{{ galleryCard.number }}</span>
              <span class="label hidden text-mineral sm:block">Gallery system</span>
            </div>
            <div class="max-w-sm">
              <h3 class="font-museum text-4xl font-extralight tracking-tight text-ink sm:text-5xl">
                {{ galleryCard.title }}
              </h3>
              <p class="mt-4 hidden max-w-xs text-sm font-light leading-relaxed text-mineral sm:block">
                {{ galleryCard.body }}
              </p>
              <div class="mt-7 flex items-center gap-4">
                <span class="h-2.5 w-2.5 rounded-full bg-gallery ring-1 ring-ink/10"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-plaster ring-1 ring-ink/10"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-bronze"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-ink"></span>
                <span class="label ml-2 hidden text-mineral sm:inline">{{ galleryCard.meta }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Industrial / precision system -->
        <div class="split-industrial absolute inset-0 bg-charcoal">
          <img
            :src="precisionCard.image"
            :alt="precisionCard.imageAlt"
            class="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div class="absolute inset-0 bg-gradient-to-l from-charcoal/95 via-charcoal/75 to-charcoal/15"></div>
          <div class="relative flex h-full flex-col items-end justify-between p-7 text-right sm:p-10">
            <div class="flex w-full items-center justify-between gap-4">
              <span class="label hidden text-alloy sm:block">Precision system</span>
              <span class="label text-ochre">{{ precisionCard.number }}</span>
            </div>
            <div class="flex max-w-sm flex-col items-end">
              <h3 class="font-industrial text-4xl font-bold tracking-tight text-lab sm:text-5xl">
                {{ precisionCard.title }}
              </h3>
              <p class="mt-4 hidden max-w-xs text-sm font-light leading-relaxed text-alloy sm:block">
                {{ precisionCard.body }}
              </p>
              <div class="mt-7 flex flex-row-reverse items-center gap-4">
                <span class="h-2.5 w-2.5 rounded-full bg-charcoal ring-1 ring-white/20"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-alloy"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-ochre"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-viridian"></span>
                <span class="label ml-2 hidden font-mono text-alloy sm:inline">{{ precisionCard.meta }}</span>
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
        <span class="label">{{ view.footerLeft }}</span>
        <span class="label">{{ view.footerRight }}</span>
      </div>
    </div>
  </section>
</template>
