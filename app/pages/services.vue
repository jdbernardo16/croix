<script setup lang="ts">
import { audiences, packages, phases, platforms, standards } from '~/data/services'

useSeoMeta({
  title: 'Services',
  description:
    'Turnkey lighting design, DIALux verification, control architecture, procurement, and commissioning — three packages for developers, architects, contractors, and suppliers.',
})

const activeAudience = ref(audiences[0]!.id)
const currentAudience = computed(
  () => audiences.find((audience) => audience.id === activeAudience.value) ?? audiences[0]!,
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

  activeAudience.value = audiences[next]!.id
  nextTick(() => {
    document.getElementById(`audience-tab-${audiences[next]!.id}`)?.focus()
  })
}
</script>

<template>
  <div>
    <SiteHeader />
    <main id="main">
      <PageHero
        section="Services"
        eyebrow="Turnkey lighting &amp; control"
        title="One team from first sketch to opening night."
        intro="Design, photometric verification, control architecture, procurement, and commissioning — held by one accountable team instead of four separate vendors."
      >
        <template #aside>
          <div class="mt-8 grid grid-cols-2 gap-6 border-t border-ink/10 pt-5 text-mineral">
            <div>
              <span class="font-museum text-3xl font-extralight text-ink">03</span>
              <span class="label mt-1 block">Service packages</span>
            </div>
            <div>
              <span class="font-museum text-3xl font-extralight text-ink">05</span>
              <span class="label mt-1 block">Delivery phases</span>
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
                01 / The problem
              </p>
              <h2 class="display-section text-ink">Lighting fails between the trades.</h2>
            </div>
            <div class="lg:col-span-6 lg:col-start-7">
              <p class="max-w-xl text-base font-light leading-relaxed text-mineral sm:text-lg">
                On most construction projects, lighting is split across separate vendors. An architect
                or interior designer selects the concept, an electrical engineer calculates the power
                loads, a supplier sells the fixtures, and a contractor installs the wiring. No single
                team owns the whole sequence.
              </p>
              <ul class="mt-7 grid grid-cols-1 gap-3 border-t border-ink/10 pt-6 text-sm font-light text-mineral sm:grid-cols-2">
                <li>Unverified fixture substitutions</li>
                <li>Dimming protocols that do not communicate</li>
                <li>Failed local building inspections</li>
                <li>Expensive electrical rework on site</li>
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
                02 / Who it is for
              </p>
              <h2 class="display-section text-ink">Four audiences. One standard.</h2>
            </div>
            <p class="max-w-xl text-base font-light leading-relaxed text-mineral lg:col-span-6 lg:col-start-7">
              The technical, financial, and scheduling problems look different from each side of the
              table. Select your role to see the part of the service that matters most.
            </p>
          </div>

          <div class="mt-12" data-reveal>
            <div
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
                03 / Packages
              </p>
              <h2 class="display-section text-ink">Three ways to work.</h2>
            </div>
            <p class="max-w-xl text-base font-light leading-relaxed text-mineral lg:col-span-6 lg:col-start-7">
              Because we pair Milanese design leadership with the Manila engineering hub, clients save
              35% to 55% compared to typical consultancy rates in North America, Europe, the Middle
              East, and Australia.
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

          <div class="mt-8 rounded-2xl border border-ink/15 bg-plaster/40 p-6 sm:p-8" data-reveal>
            <div class="grid grid-cols-1 items-center gap-4 lg:grid-cols-12">
              <div class="lg:col-span-8">
                <p class="label text-bronze-ink">Volume &amp; master-plan tier</p>
                <p class="mt-2 max-w-2xl text-sm font-light leading-relaxed text-mineral">
                  For large-scale master plans, public railways, roadways, and repetitive hospitality or
                  residential units exceeding 5,000 m², we apply volume-rate reductions to maximise the
                  project savings.
                </p>
              </div>
              <div class="lg:col-span-4 lg:text-right">
                <span class="font-museum text-4xl font-extralight tracking-tight text-ink">5,000 m²+</span>
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
                04 / Deliverables
              </p>
              <h2 class="display-section text-gallery">What leaves the studio.</h2>
            </div>
            <p class="max-w-xl text-base font-light leading-relaxed text-alloy lg:col-span-6 lg:col-start-7">
              Every phase produces something the next trade can build from. The numbers, drawings, and
              schedules are part of the design — not an appendix assembled after the fact.
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
              <p class="label text-bronze">Controls platforms</p>
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
              <p class="label text-bronze">Codes &amp; standards</p>
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

      <CtaBand
        eyebrow="Scope"
        title="Tell us what stage you are at."
        text="Concept, tender, construction, or a fixture list that needs verifying — send the drawings and we will recommend the right package."
      />
    </main>
    <SiteFooter />
  </div>
</template>
