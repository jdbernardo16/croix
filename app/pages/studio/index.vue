<script setup lang="ts">
import { studio } from '~/data/studio'
import { cmsList, cmsText } from '~/utils/cms'

useSeoMeta({
  title: cmsText(studio.meta.title, 'Studio — CROIX'),
  description: cmsText(studio.meta.description),
})

const copy = {
  hero: {
    section: cmsText(studio.hero.section, 'Studio'),
    eyebrow: cmsText(studio.hero.eyebrow),
    title: cmsText(studio.hero.title),
    intro: cmsText(studio.hero.intro),
  },
  who: {
    eyebrow: cmsText(studio.who.eyebrow),
    title: cmsText(studio.who.title),
    lead: cmsText(studio.who.lead),
    paragraphs: cmsList(studio.who.paragraphs),
    image: studio.who.image?.src || '/img/gallery-stair.jpg',
    imageAlt: cmsText(studio.who.imageAlt, 'Daylight falling through a quiet concrete stair'),
    captionLeft: cmsText(studio.who.captionLeft),
    captionRight: cmsText(studio.who.captionRight),
  },
  mission: {
    label: cmsText(studio.mission.label),
    title: cmsText(studio.mission.title),
    body: cmsText(studio.mission.body),
  },
  vision: {
    label: cmsText(studio.vision.label),
    title: cmsText(studio.vision.title),
    body: cmsText(studio.vision.body),
  },
  timeline: {
    eyebrow: cmsText(studio.timeline.eyebrow),
    title: cmsText(studio.timeline.title),
    intro: cmsText(studio.timeline.intro),
    items: studio.timeline.items.map((item) => ({
      label: cmsText(item.label),
      title: cmsText(item.title),
      body: cmsText(item.body),
    })),
  },
  model: {
    eyebrow: cmsText(studio.model.eyebrow),
    titleLine1: cmsText(studio.model.titleLine1),
    titleLine2: cmsText(studio.model.titleLine2),
    intro: cmsText(studio.model.intro),
    cards: studio.model.cards.map((card) => ({
      label: cmsText(card.label),
      meta: cmsText(card.meta),
      title: cmsText(card.title),
      body: cmsText(card.body),
      points: cmsList(card.points),
    })),
  },
  principles: {
    eyebrow: cmsText(studio.principles.eyebrow),
    title: cmsText(studio.principles.title),
    intro: cmsText(studio.principles.intro),
    items: studio.principles.items.map((principle) => ({
      number: cmsText(principle.number),
      title: cmsText(principle.title),
      body: cmsText(principle.body),
    })),
  },
  standardsLabel: cmsText(studio.standardsLabel, 'Codes & standards'),
  standards: cmsList(studio.standards),
}
</script>

<template>
  <div>
    <SiteHeader />
    <main id="main">
      <PageHero
        :section="copy.hero.section"
        :eyebrow="copy.hero.eyebrow"
        :title="copy.hero.title"
        :intro="copy.hero.intro"
      />

      <section class="bg-gallery py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
            <div class="lg:col-span-4" data-reveal>
              <p class="label mb-5 flex items-center gap-3 text-bronze-ink">
                <span class="h-1.5 w-1.5 rounded-full bg-bronze"></span>
                {{ copy.who.eyebrow }}
              </p>
              <h2 class="display-section text-ink">{{ copy.who.title }}</h2>
              <p class="mt-6 max-w-sm text-sm font-light leading-relaxed text-mineral">
                {{ copy.who.lead }}
              </p>
            </div>
            <div class="lg:col-span-8 lg:pl-8" data-reveal>
              <div class="grid grid-cols-1 gap-8 sm:grid-cols-12">
                <div class="space-y-5 sm:col-span-7">
                  <p
                    v-for="paragraph in copy.who.paragraphs"
                    :key="paragraph.slice(0, 32)"
                    class="text-base font-light leading-relaxed text-mineral sm:text-lg"
                  >
                    {{ paragraph }}
                  </p>
                </div>
                <figure class="sm:col-span-5">
                  <div class="overflow-hidden rounded-aperture">
                    <img
                      :src="copy.who.image"
                      :alt="copy.who.imageAlt"
                      class="aspect-4/5 w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <figcaption class="mt-3 flex items-center justify-between text-mineral">
                    <span class="label">{{ copy.who.captionLeft }}</span>
                    <span class="label">{{ copy.who.captionRight }}</span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="border-t border-ink/10 bg-plaster/50 py-20 sm:py-24">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <article class="rounded-panel bg-gallery p-7 sm:p-10" data-reveal>
              <p class="label text-bronze-ink">{{ copy.mission.label }}</p>
              <h2 class="mt-5 font-museum text-3xl font-extralight tracking-tight text-ink sm:text-4xl">
                {{ copy.mission.title }}
              </h2>
              <p class="mt-5 max-w-xl text-base font-light leading-relaxed text-mineral">
                {{ copy.mission.body }}
              </p>
            </article>
            <article class="rounded-panel bg-darkroom p-7 text-gallery sm:p-10" data-reveal>
              <p class="label text-bronze">{{ copy.vision.label }}</p>
              <h2 class="mt-5 font-museum text-3xl font-extralight tracking-tight text-gallery sm:text-4xl">
                {{ copy.vision.title }}
              </h2>
              <p class="mt-5 max-w-xl text-base font-light leading-relaxed text-alloy">
                {{ copy.vision.body }}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section class="border-t border-ink/10 bg-gallery py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
            <div class="lg:col-span-4 lg:sticky lg:top-28 lg:self-start" data-reveal>
              <p class="label mb-5 flex items-center gap-3 text-bronze-ink">
                <span class="h-1.5 w-1.5 rounded-full bg-bronze"></span>
                {{ copy.timeline.eyebrow }}
              </p>
              <h2 class="display-section text-ink">{{ copy.timeline.title }}</h2>
              <p class="mt-6 max-w-sm text-sm font-light leading-relaxed text-mineral">
                {{ copy.timeline.intro }}
              </p>
            </div>
            <div class="lg:col-span-8 lg:pl-8">
              <ol class="border-l border-ink/15 pl-8" data-reveal>
                <li
                  v-for="(item, index) in copy.timeline.items"
                  :key="index"
                  class="relative pb-12 before:absolute before:-left-1 before:top-1 before:h-2 before:w-2 before:rounded-full before:bg-bronze last:pb-0"
                >
                  <span class="label text-bronze-ink">{{ item.label }}</span>
                  <h3 class="mt-2 font-museum text-2xl font-light tracking-tight text-ink">
                    {{ item.title }}
                  </h3>
                  <p class="mt-3 max-w-2xl text-sm font-light leading-relaxed text-mineral">
                    {{ item.body }}
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section class="scroll-mt-24 bg-darkroom py-24 text-gallery sm:py-32">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-12" data-reveal>
            <div class="lg:col-span-6">
              <p class="label mb-5 flex items-center gap-3 text-bronze">
                <span class="h-1.5 w-1.5 rounded-full bg-bronze"></span>
                {{ copy.model.eyebrow }}
              </p>
              <h2 class="display-section text-gallery">
                {{ copy.model.titleLine1 }}<template v-if="copy.model.titleLine2"><br />{{ copy.model.titleLine2 }}</template>
              </h2>
            </div>
            <p class="max-w-xl text-base font-light leading-relaxed text-alloy lg:col-span-5 lg:col-start-8">
              {{ copy.model.intro }}
            </p>
          </div>

          <div class="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <article
              v-for="(card, index) in copy.model.cards"
              :key="index"
              class="rounded-panel border border-white/10 bg-shadow/60 p-7 sm:p-10"
              data-reveal
            >
              <div class="flex items-baseline justify-between gap-4">
                <span class="label text-bronze">{{ card.label }}</span>
                <span class="label text-alloy">{{ card.meta }}</span>
              </div>
              <h3 class="mt-5 font-museum text-3xl font-extralight tracking-tight text-gallery">
                {{ card.title }}
              </h3>
              <p class="mt-4 text-sm font-light leading-relaxed text-alloy">
                {{ card.body }}
              </p>
              <ul class="mt-6 space-y-2 border-t border-white/10 pt-5 text-xs font-light text-alloy">
                <li v-for="point in card.points" :key="point">{{ point }}</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section class="bg-gallery py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="grid grid-cols-1 gap-10 lg:grid-cols-12" data-reveal>
            <div class="lg:col-span-5">
              <p class="label mb-5 flex items-center gap-3 text-bronze-ink">
                <span class="h-1.5 w-1.5 rounded-full bg-bronze"></span>
                {{ copy.principles.eyebrow }}
              </p>
              <h2 class="display-section text-ink">{{ copy.principles.title }}</h2>
            </div>
            <p class="max-w-xl text-base font-light leading-relaxed text-mineral lg:col-span-6 lg:col-start-7">
              {{ copy.principles.intro }}
            </p>
          </div>

          <div class="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
            <article
              v-for="(principle, index) in copy.principles.items"
              :key="index"
              class="border-t border-ink/15 pt-6"
            >
              <span class="label text-bronze-ink">{{ principle.number }}</span>
              <h3 class="mt-4 font-museum text-xl font-light tracking-tight text-ink">
                {{ principle.title }}
              </h3>
              <p class="mt-2 text-xs font-light leading-relaxed text-mineral">{{ principle.body }}</p>
            </article>
          </div>

          <div v-if="copy.standards.length" class="mt-16 border-y border-ink/10 py-6" data-reveal>
            <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
              <span class="label shrink-0 text-bronze-ink">{{ copy.standardsLabel }}</span>
              <span v-for="standard in copy.standards" :key="standard" class="label text-mineral">
                {{ standard }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <CtaBand v-bind="studio.cta" />
    </main>
    <SiteFooter />
  </div>
</template>
