<script setup lang="ts">
import { audiences, packages, phases, platforms, standards } from '~/data/services'
import { services } from '~/data/servicesPage'
import { cmsList, cmsText } from '~/utils/cms'

useSeoMeta({
  title: cmsText(services.meta.title, 'Services — CROIX'),
  description: cmsText(services.meta.description),
})

const copy = {
  hero: {
    section: cmsText(services.hero.section, 'Services'),
    eyebrow: cmsText(services.hero.eyebrow),
    title: cmsText(services.hero.title),
    intro: cmsText(services.hero.intro),
    stats: services.hero.stats.map((stat) => ({
      value: cmsText(stat.value),
      label: cmsText(stat.label),
    })),
  },
  problem: {
    eyebrow: cmsText(services.problem.eyebrow),
    title: cmsText(services.problem.title),
    body: cmsText(services.problem.body),
    bullets: cmsList(services.problem.bullets),
  },
  audiences: {
    eyebrow: cmsText(services.audiences.eyebrow),
    title: cmsText(services.audiences.title),
    intro: cmsText(services.audiences.intro),
  },
  packages: {
    eyebrow: cmsText(services.packages.eyebrow),
    title: cmsText(services.packages.title),
    intro: cmsText(services.packages.intro),
  },
  volume: {
    label: cmsText(services.volume.label),
    body: cmsText(services.volume.body),
    value: cmsText(services.volume.value),
  },
  phases: {
    eyebrow: cmsText(services.phases.eyebrow),
    title: cmsText(services.phases.title),
    intro: cmsText(services.phases.intro),
  },
  platformsLabel: cmsText(services.platformsLabel, 'Controls platforms'),
  standardsLabel: cmsText(services.standardsLabel, 'Codes & standards'),
}

const activeAudience = ref(audiences[0]?.id ?? '')
const currentAudience = computed(
  () => audiences.find((audience) => audience.id === activeAudience.value) ?? audiences[0],
)

function selectTab(id: string) {
  activeAudience.value = id
}

function onTabKeydown(event: KeyboardEvent, index: number) {
  const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End']
  if (!keys.includes(event.key)) return
  event.preventDefault()

  let next = index
  if (event.key === 'ArrowLeft') next = (index - 1 + audiences.length) % audiences.length
  if (event.key === 'ArrowRight') next = (index + 1) % audiences.length
  if (event.key === 'Home') next = 0
  if (event.key === 'End') next = audiences.length - 1

  const target = audiences[next]
  if (!target) return

  activeAudience.value = target.id
  nextTick(() => {
    document.getElementById(`audience-tab-${target.id}`)?.focus()
  })
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

      <section class="bg-gallery py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="grid grid-cols-1 gap-10 lg:grid-cols-12" data-reveal>
            <div class="lg:col-span-5">
              <p class="label mb-5 flex items-center gap-3 text-bronze-ink">
                <span class="h-1.5 w-1.5 rounded-full bg-bronze"></span>
                {{ copy.problem.eyebrow }}
              </p>
              <h2 class="display-section text-ink">{{ copy.problem.title }}</h2>
            </div>
            <div class="lg:col-span-6 lg:col-start-7">
              <p class="max-w-xl text-base font-light leading-relaxed text-mineral sm:text-lg">
                {{ copy.problem.body }}
              </p>
              <ul
                v-if="copy.problem.bullets.length"
                class="mt-7 grid grid-cols-1 gap-3 border-t border-ink/10 pt-6 text-sm font-light text-mineral sm:grid-cols-2"
              >
                <li v-for="bullet in copy.problem.bullets" :key="bullet">{{ bullet }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="border-t border-ink/10 bg-plaster/50 py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-12" data-reveal>
            <div class="lg:col-span-5">
              <p class="label mb-5 flex items-center gap-3 text-bronze-ink">
                <span class="h-1.5 w-1.5 rounded-full bg-bronze"></span>
                {{ copy.audiences.eyebrow }}
              </p>
              <h2 class="display-section text-ink">{{ copy.audiences.title }}</h2>
            </div>
            <p class="max-w-xl text-base font-light leading-relaxed text-mineral lg:col-span-6 lg:col-start-7">
              {{ copy.audiences.intro }}
            </p>
          </div>

          <div class="mt-12" data-reveal>
            <div
              v-if="audiences.length"
              class="flex gap-2 overflow-x-auto border-b border-ink/15 pb-3"
              role="tablist"
              aria-label="Project roles"
            >
              <button
                v-for="(audience, index) in audiences"
                :id="`audience-tab-${audience.id}`"
                :key="audience.id"
                type="button"
                role="tab"
                :aria-selected="activeAudience === audience.id"
                aria-controls="audience-panel"
                :tabindex="activeAudience === audience.id ? 0 : -1"
                class="label shrink-0 rounded-full px-4 py-2.5 transition"
                :class="
                  activeAudience === audience.id
                    ? 'bg-darkroom text-gallery'
                    : 'text-mineral hover:bg-gallery hover:text-ink'
                "
                @click="selectTab(audience.id)"
                @keydown="onTabKeydown($event, index)"
              >
                {{ audience.label }}
              </button>
            </div>

            <div
              v-if="currentAudience"
              id="audience-panel"
              role="tabpanel"
              :aria-labelledby="`audience-tab-${currentAudience.id}`"
              class="grid grid-cols-1 gap-10 border-b border-ink/10 py-10 lg:grid-cols-12"
            >
              <div class="lg:col-span-6">
                <h3 class="font-museum text-3xl font-extralight tracking-tight text-ink sm:text-4xl">
                  {{ currentAudience.title }}
                </h3>
                <p class="mt-5 max-w-xl text-sm font-light leading-relaxed text-mineral sm:text-base">
                  {{ currentAudience.intro }}
                </p>
                <div class="mt-7 rounded-2xl border border-bronze/30 bg-gallery p-5">
                  <p class="label text-bronze-ink">The outcome</p>
                  <p class="mt-2 text-sm font-light leading-relaxed text-ink">{{ currentAudience.outcome }}</p>
                </div>
              </div>
              <div class="lg:col-span-5 lg:col-start-8">
                <p class="label text-bronze-ink">What changes</p>
                <ul class="mt-4 space-y-3">
                  <li
                    v-for="point in currentAudience.points"
                    :key="point"
                    class="flex gap-3 border-t border-ink/10 pt-3 text-sm font-light leading-relaxed text-mineral"
                  >
                    <span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-bronze"></span>
                    {{ point }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-gallery py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-12" data-reveal>
            <div class="lg:col-span-5">
              <p class="label mb-5 flex items-center gap-3 text-bronze-ink">
                <span class="h-1.5 w-1.5 rounded-full bg-bronze"></span>
                {{ copy.packages.eyebrow }}
              </p>
              <h2 class="display-section text-ink">{{ copy.packages.title }}</h2>
            </div>
            <p class="max-w-xl text-base font-light leading-relaxed text-mineral lg:col-span-6 lg:col-start-7">
              {{ copy.packages.intro }}
            </p>
          </div>

          <div class="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3" data-reveal>
            <article
              v-for="pkg in packages"
              :key="pkg.number"
              class="flex flex-col justify-between rounded-panel border p-7 sm:p-8"
              :class="pkg.featured ? 'border-darkroom bg-darkroom text-gallery' : 'border-ink/15 bg-plaster/40 text-ink'"
            >
              <div>
                <div class="flex items-baseline justify-between">
                  <span class="label" :class="pkg.featured ? 'text-bronze' : 'text-bronze-ink'">{{ pkg.number }}</span>
                  <span class="label" :class="pkg.featured ? 'text-alloy' : 'text-mineral'">{{ pkg.shortName }}</span>
                </div>
                <h3
                  class="mt-5 font-museum text-2xl font-light tracking-tight sm:text-3xl"
                  :class="pkg.featured ? 'text-gallery' : 'text-ink'"
                >
                  {{ pkg.name }}
                </h3>
                <p class="mt-3 text-sm font-light leading-relaxed" :class="pkg.featured ? 'text-alloy' : 'text-mineral'">
                  {{ pkg.tagline }}
                </p>
                <p class="label mt-5" :class="pkg.featured ? 'text-bronze' : 'text-bronze-ink'">Best for</p>
                <p class="mt-1 text-xs font-light leading-relaxed" :class="pkg.featured ? 'text-alloy' : 'text-mineral'">
                  {{ pkg.bestFor }}
                </p>

                <ul class="mt-6 space-y-2 border-t pt-5 text-xs font-light leading-relaxed" :class="pkg.featured ? 'border-white/10 text-alloy' : 'border-ink/10 text-mineral'">
                  <li v-for="item in pkg.includes" :key="item" class="flex gap-2">
                    <span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-bronze"></span>
                    {{ item }}
                  </li>
                </ul>

                <template v-if="pkg.addOns">
                  <p class="label mt-6" :class="pkg.featured ? 'text-bronze' : 'text-bronze-ink'">Optional add-ons</p>
                  <ul class="mt-2 space-y-1.5 text-xs font-light leading-relaxed" :class="pkg.featured ? 'text-alloy' : 'text-mineral'">
                    <li v-for="item in pkg.addOns" :key="item">{{ item }}</li>
                  </ul>
                </template>
              </div>

              <NuxtLink
                :to="{ path: '/contact', query: { package: pkg.shortName } }"
                class="label mt-8 inline-flex items-center gap-2 border-t pt-4 transition"
                :class="pkg.featured ? 'border-white/10 text-gallery hover:text-bronze' : 'border-ink/10 text-ink hover:text-bronze-ink'"
              >
                Discuss this scope <span aria-hidden="true">↗</span>
              </NuxtLink>
            </article>
          </div>

          <div
            v-if="copy.volume.label || copy.volume.body || copy.volume.value"
            class="mt-8 rounded-2xl border border-ink/15 bg-plaster/40 p-6 sm:p-8"
            data-reveal
          >
            <div class="grid grid-cols-1 items-center gap-4 lg:grid-cols-12">
              <div class="lg:col-span-8">
                <p class="label text-bronze-ink">{{ copy.volume.label }}</p>
                <p class="mt-2 max-w-2xl text-sm font-light leading-relaxed text-mineral">
                  {{ copy.volume.body }}
                </p>
              </div>
              <div class="lg:col-span-4 lg:text-right">
                <span class="font-museum text-4xl font-extralight tracking-tight text-ink">{{ copy.volume.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-darkroom py-24 text-gallery sm:py-32">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-12" data-reveal>
            <div class="lg:col-span-5">
              <p class="label mb-5 flex items-center gap-3 text-bronze">
                <span class="h-1.5 w-1.5 rounded-full bg-bronze"></span>
                {{ copy.phases.eyebrow }}
              </p>
              <h2 class="display-section text-gallery">{{ copy.phases.title }}</h2>
            </div>
            <p class="max-w-xl text-base font-light leading-relaxed text-alloy lg:col-span-6 lg:col-start-7">
              {{ copy.phases.intro }}
            </p>
          </div>

          <div class="mt-14 border-t border-white/15" data-reveal>
            <article
              v-for="phase in phases"
              :key="phase.number"
              class="grid grid-cols-1 gap-5 border-b border-white/10 py-8 lg:grid-cols-12 lg:gap-8"
            >
              <div class="lg:col-span-3">
                <span class="label text-bronze">{{ phase.number }}</span>
                <h3 class="mt-2 font-museum text-xl font-light tracking-tight text-gallery">{{ phase.title }}</h3>
              </div>
              <div class="lg:col-span-5">
                <p class="label text-alloy">What you receive</p>
                <p class="mt-2 text-sm font-light leading-relaxed text-gallery/85">{{ phase.receive }}</p>
              </div>
              <div class="lg:col-span-4">
                <p class="label text-alloy">How it helps</p>
                <p class="mt-2 text-sm font-light leading-relaxed text-alloy">{{ phase.helps }}</p>
              </div>
            </article>
          </div>

          <div class="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12" data-reveal>
            <div class="lg:col-span-6">
              <p class="label text-bronze">{{ copy.platformsLabel }}</p>
              <div class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="platform in platforms"
                  :key="platform"
                  class="label rounded-full border border-white/15 px-3 py-1.5 text-alloy"
                >
                  {{ platform }}
                </span>
              </div>
            </div>
            <div class="lg:col-span-6">
              <p class="label text-bronze">{{ copy.standardsLabel }}</p>
              <div class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="standard in standards"
                  :key="standard"
                  class="label rounded-full border border-white/15 px-3 py-1.5 text-alloy"
                >
                  {{ standard }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand v-bind="services.cta" />
    </main>
    <SiteFooter />
  </div>
</template>
