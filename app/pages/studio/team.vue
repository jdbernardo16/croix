<script setup lang="ts">
import { team } from '~/data/team'
import { team as teamPage } from '~/data/teamPage'
import { cmsText } from '~/utils/cms'

useSeoMeta({
  title: cmsText(teamPage.meta.title, 'Team — CROIX'),
  description: cmsText(teamPage.meta.description),
})

const copy = {
  hero: {
    section: cmsText(teamPage.hero.section, 'Studio / Team'),
    eyebrow: cmsText(teamPage.hero.eyebrow),
    title: cmsText(teamPage.hero.title),
    intro: cmsText(teamPage.hero.intro),
    stats: teamPage.hero.stats.map((stat) => ({
      value: cmsText(stat.value),
      label: cmsText(stat.label),
    })),
  },
  bench: {
    label: cmsText(teamPage.bench.label),
    intro: cmsText(teamPage.bench.intro),
  },
  widerBench: {
    eyebrow: cmsText(teamPage.widerBench.eyebrow),
    title: cmsText(teamPage.widerBench.title),
    intro: cmsText(teamPage.widerBench.intro),
    groups: teamPage.widerBench.groups.map((group) => ({
      title: cmsText(group.title),
      body: cmsText(group.body),
    })),
  },
}

const totalMembers = String(team.length).padStart(2, '0')
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
      >
        <template #aside>
          <div
            v-if="copy.hero.stats.length"
            class="mt-8 grid grid-cols-2 gap-6 border-t border-ink/10 pt-5 text-mineral"
          >
            <div v-for="stat in copy.hero.stats" :key="stat.label">
              <span class="font-museum text-3xl font-extralight text-ink">{{ stat.value }}</span>
              <span class="label mt-1 block">{{ stat.label }}</span>
            </div>
          </div>
        </template>
      </PageHero>

      <section class="border-b border-ink/10 bg-gallery py-16 sm:py-20">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <p class="label text-bronze-ink lg:col-span-3">{{ copy.bench.label }}</p>
            <p class="max-w-3xl text-base font-light leading-relaxed text-mineral sm:text-lg lg:col-span-9">
              {{ copy.bench.intro }}
            </p>
          </div>
        </div>
      </section>

      <section class="bg-gallery py-20 sm:py-28">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <article
            v-for="(member, index) in team"
            :id="member.slug"
            :key="member.slug"
            class="grid grid-cols-1 gap-8 border-t border-ink/15 py-14 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-10"
            data-reveal
          >
            <figure
              class="lg:col-span-4 lg:row-start-1"
              :class="index % 2 === 1 ? 'lg:col-start-9' : ''"
            >
              <div class="relative overflow-hidden rounded-aperture bg-plaster">
                <img
                  v-if="member.portrait"
                  :src="member.portrait"
                  :alt="`Portrait of ${member.name}`"
                  class="aspect-4/5 w-full object-cover grayscale"
                  loading="lazy"
                  decoding="async"
                />
                <div v-else class="flex aspect-4/5 w-full items-end p-6">
                  <span class="font-museum text-2xl font-light tracking-tight text-mineral">
                    {{ member.shortName }}
                  </span>
                </div>
                <span
                  v-if="member.partner"
                  class="absolute left-4 top-4 rounded-full bg-gallery/90 px-3 py-1.5 text-label font-mono uppercase tracking-label text-ink backdrop-blur-sm"
                >
                  Partner specialist
                </span>
              </div>
              <figcaption class="mt-3 flex items-center justify-between text-mineral">
                <span class="label">{{ member.location }}</span>
                <span class="label">{{ String(index + 1).padStart(2, '0') }} / {{ totalMembers }}</span>
              </figcaption>
            </figure>

            <div
              class="lg:col-span-7 lg:row-start-1"
              :class="index % 2 === 1 ? 'lg:col-start-1' : 'lg:col-start-6'"
            >
              <p class="label text-bronze-ink">{{ member.role }}</p>
              <h2 class="mt-3 font-museum text-3xl font-extralight tracking-tight text-ink sm:text-4xl">
                {{ member.name }}
              </h2>

              <div class="mt-6 space-y-4">
                <p
                  v-for="paragraph in member.bio"
                  :key="paragraph.slice(0, 32)"
                  class="text-sm font-light leading-relaxed text-mineral sm:text-base"
                >
                  {{ paragraph }}
                </p>
              </div>

              <div class="mt-8 grid grid-cols-1 gap-6 border-t border-ink/10 pt-5 sm:grid-cols-2">
                <div>
                  <p class="label text-bronze-ink">Focus</p>
                  <ul class="mt-3 space-y-1.5 text-xs font-light leading-relaxed text-mineral">
                    <li v-for="item in member.focus" :key="item">{{ item }}</li>
                  </ul>
                </div>
                <div v-if="member.projects">
                  <p class="label text-bronze-ink">Selected projects</p>
                  <ul class="mt-3 space-y-1.5 text-xs font-light leading-relaxed text-mineral">
                    <li v-for="project in member.projects" :key="project">{{ project }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section class="border-t border-ink/10 bg-plaster/50 py-20 sm:py-24">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-12" data-reveal>
            <div class="lg:col-span-5">
              <p class="label mb-5 flex items-center gap-3 text-bronze-ink">
                <span class="h-1.5 w-1.5 rounded-full bg-bronze"></span>
                {{ copy.widerBench.eyebrow }}
              </p>
              <h2 class="display-section text-ink">{{ copy.widerBench.title }}</h2>
            </div>
            <p class="max-w-xl text-base font-light leading-relaxed text-mineral lg:col-span-6 lg:col-start-7">
              {{ copy.widerBench.intro }}
            </p>
          </div>

          <div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3" data-reveal>
            <article v-for="group in copy.widerBench.groups" :key="group.title" class="border-t border-ink/15 pt-6">
              <h3 class="font-museum text-xl font-light tracking-tight text-ink">{{ group.title }}</h3>
              <p class="mt-3 text-xs font-light leading-relaxed text-mineral">{{ group.body }}</p>
            </article>
          </div>
        </div>
      </section>

      <CtaBand v-bind="teamPage.cta" />
    </main>
    <SiteFooter />
  </div>
</template>
