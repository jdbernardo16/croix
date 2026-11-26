<script setup lang="ts">
useSeoMeta({
  title: 'Contact',
  description:
    'Send architectural drawings, reflected ceiling plans, mood images, and your target schedule to CROIX for a lighting design or photometric verification proposal.',
})

const steps = [
  {
    number: '01',
    title: 'We review the drawings',
    body: 'We check the scope, the project stage, and the technical questions that need an answer before a fee can be meaningful.',
  },
  {
    number: '02',
    title: 'We confirm the brief',
    body: 'A short call or email aligns the package, the deliverables, the schedule, and who else is in the design team.',
  },
  {
    number: '03',
    title: 'You receive a fee proposal',
    body: 'A clear scope and fee — usually within a few days — with the assumptions and exclusions stated up front.',
  },
]
</script>

<template>
  <div>
    <SiteHeader />
    <main id="main">
      <PageHero
        section="Contact"
        eyebrow="Start a project"
        title="Send the drawings."
        intro="DWG, RVT, or PDF. Add mood images, your preferred package, and a target schedule. We will review the drawings and come back with a clear fee proposal within a few days."
      >
        <template #aside>
          <div class="mt-8 grid grid-cols-2 gap-6 border-t border-ink/10 pt-5 text-mineral">
            <div>
              <span class="font-museum text-3xl font-extralight text-ink">02</span>
              <span class="label mt-1 block">Studios, one team</span>
            </div>
            <div>
              <span class="font-museum text-3xl font-extralight text-ink">05</span>
              <span class="label mt-1 block">Leadership disciplines</span>
            </div>
          </div>
        </template>
      </PageHero>

      <section class="bg-gallery py-20 sm:py-24">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
            <div class="lg:col-span-7">
              <div class="rounded-panel border border-ink/15 bg-plaster/30 p-6 sm:p-8">
                <ContactForm />
              </div>
            </div>

            <aside class="lg:col-span-4 lg:col-start-9">
              <div class="rounded-panel border border-ink/15 bg-gallery p-6 sm:p-7">
                <p class="label text-bronze-ink">Direct</p>
                <a
                  href="mailto:info@croixlighting.com.ph"
                  class="mt-4 block break-words font-museum text-xl font-light tracking-tight text-ink transition hover:text-bronze-ink sm:text-2xl"
                >
                  info@croixlighting.com.ph
                </a>
                <a
                  href="tel:+639692228111"
                  class="mt-2 block text-sm font-light text-mineral transition hover:text-ink"
                >
                  +63 969 222 8111
                </a>

                <div class="mt-7 border-t border-ink/10 pt-5">
                  <p class="label text-bronze-ink">Manila engineering</p>
                  <p class="mt-3 text-sm font-light leading-relaxed text-mineral">
                    Werco Arcade Lot 18,<br />
                    Dr. A. Santos Ave., San Antonio 1,<br />
                    Parañaque City 1715, PH
                  </p>
                </div>

                <div class="mt-6 border-t border-ink/10 pt-5">
                  <p class="label text-bronze-ink">Milan design</p>
                  <p class="mt-3 text-sm font-light leading-relaxed text-mineral">
                    LUMEA Collective<br />
                    Milan, Italy
                  </p>
                </div>

                <div class="mt-6 flex items-center justify-between border-t border-ink/10 pt-5">
                  <span class="label text-mineral">Response</span>
                  <span class="label text-ink">Within a few days</span>
                </div>
              </div>

              <div class="mt-5 rounded-2xl border border-ink/10 bg-plaster/40 p-5">
                <p class="label text-bronze-ink">For suppliers &amp; contractors</p>
                <p class="mt-2 text-xs font-light leading-relaxed text-mineral">
                  Have a fixture list or a tender? Use the same form and note “supplier tender” in the
                  project notes. Photometric verification has its own fast-track scope.
                </p>
                <NuxtLink to="/services" class="link-quiet label mt-4 inline-block text-ink">
                  See the packages ↗
                </NuxtLink>
              </div>

              <div class="mt-6 flex items-center justify-between text-mineral">
                <span class="label">14.48°N 121.02°E</span>
                <span class="label">45.46°N 9.19°E</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section class="border-t border-ink/10 bg-plaster/50 py-20 sm:py-24">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-12" data-reveal>
            <div class="lg:col-span-5">
              <p class="label mb-5 flex items-center gap-3 text-bronze-ink">
                <span class="h-1.5 w-1.5 rounded-full bg-bronze"></span>
                What happens next
              </p>
              <h2 class="display-section text-ink">No black box.</h2>
            </div>
            <p class="max-w-xl text-base font-light leading-relaxed text-mineral lg:col-span-6 lg:col-start-7">
              The first reply is not a sales deck. It is a review of your drawings, a short set of
              questions, and a scope that matches the stage you are actually at.
            </p>
          </div>

          <div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3" data-reveal>
            <article v-for="step in steps" :key="step.number" class="border-t border-ink/15 pt-6">
              <span class="label text-bronze-ink">{{ step.number }}</span>
              <h3 class="mt-4 font-museum text-xl font-light tracking-tight text-ink">{{ step.title }}</h3>
              <p class="mt-2 text-xs font-light leading-relaxed text-mineral">{{ step.body }}</p>
            </article>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>
