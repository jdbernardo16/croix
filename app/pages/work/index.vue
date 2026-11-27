<script setup lang="ts">
import { projects, sectors, type Sector } from '~/data/projects'
import { work } from '~/data/work'
import { cmsText } from '~/utils/cms'

useSeoMeta({
  title: cmsText(work.meta.title, 'Work — CROIX'),
  description: cmsText(work.meta.description),
})

const view = {
  hero: {
    section: cmsText(work.hero.section, 'Work'),
    eyebrow: cmsText(work.hero.eyebrow),
    title: cmsText(work.hero.title),
    intro: cmsText(work.hero.intro),
  },
  stats: work.stats.map((stat) => ({
    value: cmsText(stat.value),
    label: cmsText(stat.label),
  })),
  note: {
    label: cmsText(work.note.label),
    body: cmsText(work.note.body),
  },
}

const activeFilter = ref<'All' | Sector>('All')
const filters: Array<'All' | Sector> = ['All', ...sectors]

const filtered = computed(() =>
  activeFilter.value === 'All'
    ? projects
    : projects.filter((project) => project.sector === activeFilter.value),
)

function countFor(filter: 'All' | Sector) {
  return filter === 'All'
    ? projects.length
    : projects.filter((project) => project.sector === filter).length
}

function indexFor(slug: string) {
  return String(projects.findIndex((project) => project.slug === slug) + 1).padStart(2, '0')
}
</script>

<template>
  <div>
    <SiteHeader />
    <main id="main">
      <PageHero
        :section="view.hero.section"
        :eyebrow="view.hero.eyebrow"
        :title="view.hero.title"
        :intro="view.hero.intro"
      >
        <template #aside>
          <div
            v-if="view.stats.length"
            class="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/10 pt-5 text-mineral"
          >
            <div v-for="stat in view.stats" :key="stat.label">
              <span class="font-museum text-3xl font-extralight text-ink">{{ stat.value }}</span>
              <span class="label mt-1 block">{{ stat.label }}</span>
            </div>
          </div>
        </template>
      </PageHero>

      <section class="bg-gallery py-20 sm:py-24">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="flex flex-wrap items-center gap-2 border-b border-ink/15 pb-4" data-reveal>
            <button
              v-for="filter in filters"
              :key="filter"
              type="button"
              class="label rounded-full px-3.5 py-2 transition"
              :class="
                activeFilter === filter
                  ? 'bg-darkroom text-gallery'
                  : 'text-mineral hover:bg-plaster hover:text-ink'
              "
              :aria-pressed="activeFilter === filter"
              @click="activeFilter = filter"
            >
              {{ filter }}
              <span class="ml-1 opacity-60">{{ String(countFor(filter)).padStart(2, '0') }}</span>
            </button>
            <span class="label ml-auto hidden text-mineral sm:block">
              {{ String(filtered.length).padStart(2, '0') }} shown
            </span>
          </div>

          <div class="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2" data-reveal>
            <ProjectCard
              v-for="project in filtered"
              :key="project.slug"
              :project="project"
              :index="indexFor(project.slug)"
            />
          </div>

          <div
            v-if="view.note.label || view.note.body"
            class="mt-16 grid grid-cols-1 gap-6 border-t border-ink/10 pt-6 lg:grid-cols-12"
            data-reveal
          >
            <p class="label text-bronze-ink lg:col-span-3">{{ view.note.label }}</p>
            <p class="max-w-2xl text-xs font-light leading-relaxed text-mineral lg:col-span-8">
              {{ view.note.body }}
            </p>
          </div>
        </div>
      </section>

      <CtaBand v-bind="work.cta" />
    </main>
    <SiteFooter />
  </div>
</template>
