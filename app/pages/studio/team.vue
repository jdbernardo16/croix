<script setup lang="ts">
import { team } from '~/data/team'

useSeoMeta({
  title: 'Team',
  description:
    'The CROIX leadership team: design in Milan, engineering, controls, procurement, and code compliance in Manila.',
})

const bench = [
  {
    title: 'Electrical & lighting engineers',
    body: 'Photometric calculations, load schedules, CAD/Revit documentation, and code review. The team is trained to read plans the way a building official will.',
  },
  {
    title: 'Controls & commissioning',
    body: 'System architecture, integration, programming, nighttime aiming, and lux verification across Lutron, Crestron, Dynalite, DALI, DMX, and BACnet/IP.',
  },
  {
    title: 'Design & fabrication partners',
    body: 'LUMEA Collective in Milan, plus interior, millwork, and fabrication specialists in Manila and Pampanga for turnkey fit-out scopes.',
  },
]
</script>

<template>
  <div>
    <SiteHeader />
    <main id="main">
      <PageHero
        section="Studio / Team"
        eyebrow="Leadership / Five disciplines"
        title="The people behind your project."
        intro="Creative leadership in Europe and deep engineering capability in Asia — giving your project well-rounded support across every time zone."
      >
        <template #aside>
          <div class="mt-8 grid grid-cols-2 gap-6 border-t border-ink/10 pt-5 text-mineral">
            <div>
              <span class="font-museum text-3xl font-extralight text-ink">05</span>
              <span class="label mt-1 block">Leadership profiles</span>
            </div>
            <div>
              <span class="font-museum text-3xl font-extralight text-ink">02</span>
              <span class="label mt-1 block">Studios, one team</span>
            </div>
          </div>
        </template>
      </PageHero>

      <section class="border-b border-ink/10 bg-gallery py-16 sm:py-20">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <p class="label text-bronze-ink lg:col-span-3">The bench</p>
            <p class="max-w-3xl text-base font-light leading-relaxed text-mineral sm:text-lg lg:col-span-9">
              CROIX is deliberately small at the top and deep in the middle. The people who win the
              project are the people who draw it, calculate it, specify it, and stand on site at
              commissioning. Partner specialists are named as partners, not folded into the studio.
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
                  :src="member.portrait"
                  :alt="`Portrait of ${member.name}`"
                  class="aspect-4/5 w-full object-cover grayscale"
                  loading="lazy"
                  decoding="async"
                />
                <span
                  v-if="member.partner"
                  class="absolute left-4 top-4 rounded-full bg-gallery/90 px-3 py-1.5 text-label font-mono uppercase tracking-label text-ink backdrop-blur-sm"
                >
                  Partner specialist
                </span>
              </div>
              <figcaption class="mt-3 flex items-center justify-between text-mineral">
                <span class="label">{{ member.location }}</span>
                <span class="label">{{ String(index + 1).padStart(2, '0') }} / 05</span>
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
                The wider bench
              </p>
              <h2 class="display-section text-ink">More than five names.</h2>
            </div>
            <p class="max-w-xl text-base font-light leading-relaxed text-mineral lg:col-span-6 lg:col-start-7">
              Around the leadership team sits a working bench of engineers, documentation specialists,
              programmers, and fabrication partners — assembled to the scope, not carried as overhead.
            </p>
          </div>

          <div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3" data-reveal>
            <article v-for="item in bench" :key="item.title" class="border-t border-ink/15 pt-6">
              <h3 class="font-museum text-xl font-light tracking-tight text-ink">{{ item.title }}</h3>
              <p class="mt-3 text-xs font-light leading-relaxed text-mineral">{{ item.body }}</p>
            </article>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Work with us"
        title="Put a name to the drawing."
        text="Tell us which discipline your project needs first — design, photometrics, controls, or a full turnkey team."
      />
    </main>
    <SiteFooter />
  </div>
</template>
