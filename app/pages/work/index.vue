<script setup lang="ts">
import { projects, sectors, type Sector } from '~/data/projects'

useSeoMeta({
  title: 'Work',
  description:
    'Selected CROIX projects across heritage, hospitality, transport, workplace, and retail — in the Philippines, Italy, Saudi Arabia, and South Korea.',
})

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
        section="Work"
        eyebrow="Selected work / 08 projects"
        title="Light, in the field."
        intro="Heritage landmarks, luxury resorts, public transport, workplaces, and retail — often alongside Voltaire Light Design, In-visible lab, and Sergio Boccia Lighting Design."
      >
        <template #aside>
          <div class="mt-8 grid grid-cols-2 gap-6 border-t border-ink/10 pt-5 text-mineral">
            <div>
              <span class="font-museum text-3xl font-extralight text-ink">04</span>
              <span class="label mt-1 block">Countries</span>
            </div>
            <div>
              <span class="font-museum text-3xl font-extralight text-ink">05</span>
              <span class="label mt-1 block">Sectors</span>
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

          <div class="mt-16 grid grid-cols-1 gap-6 border-t border-ink/10 pt-6 lg:grid-cols-12" data-reveal>
            <p class="label text-bronze-ink lg:col-span-3">A note on imagery</p>
            <p class="max-w-2xl text-xs font-light leading-relaxed text-mineral lg:col-span-8">
              Where project photography is still being cleared, the project is presented as a
              typographic light study. The work and the scope are real; the image is pending. CCP and
              NSCR include CROIX documentation and DIALux verification plates.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Next project"
        title="Add your building to the set."
        text="Send the drawings, the stage, and the decisions still open. We will recommend a scope and a fee."
      />
    </main>
    <SiteFooter />
  </div>
</template>
