<script setup lang="ts">
useHead({
  title: 'CROIX — Design peg board',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

type Ref = {
  name: string
  url: string
  img: string
  borrow: string
  avoid: string
}

type Territory = {
  code: string
  title: string
  subtitle: string
  tone: 'light' | 'dark'
  refs: Ref[]
}

const territories: Territory[] = [
  {
    code: 'A',
    title: 'Nocturne',
    subtitle: 'Light as the protagonist',
    tone: 'dark',
    refs: [
      {
        name: "L'Observatoire International",
        url: 'lobsintl.com',
        img: '/img/pegs/lobservatoire.jpg',
        borrow:
          'Full-bleed architecture at dusk, one light source per frame, dark negative space, captions that stay quiet.',
        avoid: 'Black for its own sake, or atmosphere that hides the work.',
      },
      {
        name: 'Apparatus',
        url: 'apparatusstudio.com',
        img: '/img/pegs/apparatus.jpg',
        borrow:
          'Cinematic framing, hairline rules, the product treated as an artifact rather than a SKU.',
        avoid: 'Mystery that withholds basic information.',
      },
      {
        name: 'Bocci',
        url: 'bocci.com',
        img: '/img/pegs/bocci.jpg',
        borrow:
          'Macro materiality — glass, brass, and shadow at close range, with no interface competing.',
        avoid: 'Oversized autoplay video that punishes slow connections.',
      },
      {
        name: 'Davide Groppi',
        url: 'davidegroppi.com',
        img: '/img/pegs/davide-groppi.jpg',
        borrow: 'Light as a poetic event; generous emptiness around a single object.',
        avoid: 'Whitespace with no information underneath it.',
      },
    ],
  },
  {
    code: 'B',
    title: 'Gallery Daylight',
    subtitle: 'Editorial restraint, warm materials',
    tone: 'light',
    refs: [
      {
        name: 'Lambert & Fils',
        url: 'lambertetfils.com',
        img: '/img/pegs/lambert-fils.jpg',
        borrow:
          'Warm plaster ground, sculptural object, type that behaves like a museum caption rather than a billboard.',
        avoid: 'Beige-on-beige with no contrast.',
      },
      {
        name: 'Michael Anastassiades',
        url: 'michaelanastassiades.com',
        img: '/img/pegs/anastassiades.jpg',
        borrow:
          'Objects floating on a quiet field, thin connecting lines, asymmetric gallery composition.',
        avoid: 'Navigation that hides too much behind a single menu.',
      },
      {
        name: 'David Chipperfield Architects',
        url: 'davidchipperfield.com',
        img: '/img/pegs/chipperfield.jpg',
        borrow: 'Radical restraint: one image, one line, no decorative chrome.',
        avoid: 'Restraint that under-serves a deep portfolio.',
      },
      {
        name: 'Delta Light',
        url: 'deltalight.com',
        img: '/img/pegs/delta-clean.jpg',
        borrow:
          'Material lifestyle photography and a product taxonomy that stays elegant at scale.',
        avoid: 'Cookie-modal clutter and generic catalog grids.',
      },
    ],
  },
  {
    code: 'C',
    title: 'Precision Instrument',
    subtitle: 'Engineering as a visual language',
    tone: 'dark',
    refs: [
      {
        name: 'Teenage Engineering',
        url: 'teenage.engineering',
        img: '/img/pegs/teenage-engineering.jpg',
        borrow:
          'Mono labels, product-as-object, black stage, zero gloss. Every label earns its place.',
        avoid: 'Quirky for the sake of quirky.',
      },
      {
        name: 'ERCO',
        url: 'erco.com',
        img: '/img/pegs/erco-products.jpg',
        borrow:
          'White technical navigation, one huge black stage, a single orange accent, datasheet rigor.',
        avoid: 'Spec-sheet density on the marketing page.',
      },
      {
        name: 'IFI Lighting Design',
        url: 'ifilighting.com',
        img: '/img/pegs/ifi.jpg',
        borrow: 'Monumental type over a light drawing; one idea per screen.',
        avoid: 'Serif pastiche — the brand guide calls for a contemporary sans.',
      },
    ],
  },
  {
    code: 'D',
    title: 'Interaction',
    subtitle: 'Light as the interface',
    tone: 'light',
    refs: [
      {
        name: 'Lampå',
        url: 'lampa.bornfight.studio',
        img: '/img/pegs/lampa.jpg',
        borrow:
          'Brightness and material as controls; 3D only where it explains the product. A single warm scene can carry a whole page.',
        avoid: 'Configurator complexity before the catalog exists.',
      },
    ],
  },
]

const principles = [
  {
    n: '01',
    title: 'Light is the material',
    note: 'Photography, shadow, and surface do the work. Chrome stays out of the way.',
  },
  {
    n: '02',
    title: 'Proof on the page',
    note: 'Lux, UGR, IP ratings, and DIALux plates are part of the composition, not an appendix.',
  },
  {
    n: '03',
    title: 'Two systems, one mark',
    note: 'Gallery and Precision share spacing, hairlines, and the unchanged CROIX logo.',
  },
  {
    n: '04',
    title: 'No purple chrome',
    note: 'Violet is reserved for the mark. Bronze carries the interface on light grounds.',
  },
]

const excluded = [
  'Purple buttons, links, hovers, or gradients. Violet stays inside the logo.',
  'Glassmorphism cards and floating dashboard UI.',
  'A centered hero with two gradient buttons and a stock team grid.',
  'Scroll-jacking, cursor takeovers, and WebGL for its own sake.',
  'Serif “luxury” pastiche. The guide asks for Manrope and Inter.',
  'Autoplay video with sound, or a 12 MB hero that fails on mobile data.',
]
</script>

<template>
  <div class="min-h-screen bg-gallery text-ink">
    <header class="sticky top-0 z-40 border-b border-ink/10 bg-gallery/90 backdrop-blur-xl">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <NuxtLink to="/" class="flex items-center gap-3">
          <img src="/img/logo-word.png" alt="CROIX" class="h-5 w-auto" />
          <span class="label hidden text-mineral sm:block">Peg board</span>
        </NuxtLink>
        <div class="flex items-center gap-6">
          <span class="label hidden text-mineral md:block">Internal reference · Nov 2026</span>
          <NuxtLink to="/" class="label text-bronze-ink transition hover:text-ink">View concept ↗</NuxtLink>
        </div>
      </div>
    </header>

    <main>
      <section class="light-field grain relative overflow-hidden border-b border-ink/10">
        <div class="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <p class="label mb-6 flex items-center gap-3 text-bronze-ink">
            <span class="h-1.5 w-1.5 rounded-full bg-bronze"></span>
            Design peg / direction 01
          </p>
          <h1 class="max-w-5xl font-museum text-5xl font-extralight leading-none tracking-tighter text-ink sm:text-7xl lg:text-8xl">
            A gallery that<br />
            can read a<br />
            datasheet<span class="text-bronze">.</span>
          </h1>
          <div class="mt-12 grid grid-cols-1 gap-8 border-t border-ink/10 pt-8 lg:grid-cols-12">
            <p class="max-w-xl text-base font-light leading-relaxed text-mineral sm:text-lg lg:col-span-6">
              Three territories, one synthesis. The brand guide already supplies the spine: Gallery
              Daylight for architectural work, Precision for the industrial line, and Nocturne for the
              moments that need atmosphere. The website should move between them without changing its
              voice.
            </p>
            <p class="max-w-xl text-sm font-light leading-relaxed text-mineral lg:col-span-5 lg:col-start-8">
              References are captured from live sites in November 2026 and are for internal review
              only. Placeholder photography is from Unsplash; project imagery is from the CROIX
              company profile. The logo is extracted from the supplied PDF and must be replaced with a
              vector master before production.
            </p>
          </div>

          <div class="mt-12 grid grid-cols-2 gap-6 border-t border-ink/10 pt-6 lg:grid-cols-4">
            <div v-for="principle in principles" :key="principle.n">
              <span class="label text-bronze-ink">{{ principle.n }}</span>
              <p class="mt-2 font-museum text-lg font-light tracking-tight text-ink">{{ principle.title }}</p>
              <p class="mt-1 max-w-56 text-xs font-light leading-relaxed text-mineral">{{ principle.note }}</p>
            </div>
          </div>
        </div>
      </section>

      <section v-for="territory in territories" :key="territory.code" class="border-b border-ink/10 py-20 sm:py-24">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div class="flex items-baseline gap-5">
              <span class="label text-bronze-ink">{{ territory.code }}</span>
              <div>
                <h2 class="font-museum text-3xl font-light tracking-tight text-ink sm:text-4xl">
                  {{ territory.title }}
                </h2>
                <p class="label mt-2 text-mineral">{{ territory.subtitle }}</p>
              </div>
            </div>
            <span class="label text-mineral">{{ String(territory.refs.length).padStart(2, '0') }} references</span>
          </div>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2">
            <article
              v-for="ref in territory.refs"
              :key="ref.name"
              class="group"
              :class="territory.refs.length === 1 ? 'md:col-span-2 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8' : ''"
            >
              <div
                class="overflow-hidden rounded-2xl border border-ink/10 bg-plaster"
                :class="territory.refs.length === 1 ? 'lg:col-span-7' : ''"
              >
                <img
                  :src="ref.img"
                  :alt="`${ref.name} website reference`"
                  class="aspect-16/10 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div :class="territory.refs.length === 1 ? 'lg:col-span-5' : ''">
                <div
                  class="mt-4 flex items-baseline justify-between gap-4"
                  :class="territory.refs.length === 1 ? 'lg:mt-0' : ''"
                >
                  <h3 class="font-museum text-xl font-light tracking-tight text-ink">{{ ref.name }}</h3>
                  <span class="label shrink-0 text-mineral">{{ ref.url }}</span>
                </div>
                <div
                  class="mt-3 grid grid-cols-1 gap-4 border-t border-ink/10 pt-3 sm:gap-8"
                  :class="territory.refs.length === 1 ? '' : 'sm:grid-cols-2'"
                >
                  <p class="text-xs font-light leading-relaxed text-mineral">
                    <span class="label mb-1 block text-bronze-ink">Borrow</span>{{ ref.borrow }}
                  </p>
                  <p class="text-xs font-light leading-relaxed text-mineral">
                    <span class="label mb-1 block text-ink">Avoid</span>{{ ref.avoid }}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="bg-darkroom py-20 text-gallery sm:py-24">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div class="lg:col-span-5">
              <p class="label mb-5 text-bronze">The synthesis</p>
              <h2 class="display-section text-gallery">One voice.<br />Three registers.</h2>
            </div>
            <p class="max-w-xl text-base font-light leading-relaxed text-alloy lg:col-span-6 lg:col-start-7">
              The default page is Gallery Daylight. Heroes and case studies can drop to Nocturne.
              Industrial routes switch the palette and heading face to Precision — but the spacing,
              the hairline logic, and the logo stay identical.
            </p>
          </div>

          <div class="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div class="rounded-2xl bg-gallery p-6 text-ink">
              <div class="flex items-center justify-between">
                <span class="label text-bronze-ink">Default</span>
                <span class="label text-mineral">01</span>
              </div>
              <h3 class="mt-4 font-museum text-2xl font-light">Gallery Daylight</h3>
              <p class="mt-2 text-xs font-light leading-relaxed text-mineral">
                Home, studio, team, work, services. Manrope + Inter. Bronze is an accent, never body
                copy.
              </p>
              <div class="mt-6 flex h-10 overflow-hidden rounded-lg">
                <span class="w-1/2 bg-gallery ring-1 ring-inset ring-ink/10"></span>
                <span class="w-1/4 bg-plaster"></span>
                <span class="w-1/6 bg-bronze"></span>
                <span class="w-1/12 bg-ink"></span>
              </div>
              <p class="mt-4 font-museum text-3xl font-extralight tracking-tight">Light, resolved.</p>
              <p class="label mt-2 text-mineral">Manrope 200 · Inter 300 · Plex Mono</p>
            </div>

            <div class="rounded-2xl bg-gunmetal p-6 text-gallery">
              <div class="flex items-center justify-between">
                <span class="label text-bronze">Atmosphere</span>
                <span class="label text-alloy">02</span>
              </div>
              <h3 class="mt-4 font-museum text-2xl font-light text-gallery">Nocturne</h3>
              <p class="mt-2 text-xs font-light leading-relaxed text-alloy">
                Hero plates, case-study covers, twilight imagery. Darkroom field, gallery type, one
                bronze line.
              </p>
              <div class="mt-6 flex h-10 overflow-hidden rounded-lg">
                <span class="w-1/2 bg-darkroom"></span>
                <span class="w-1/4 bg-gunmetal"></span>
                <span class="w-1/6 bg-bronze"></span>
                <span class="w-1/12 bg-gallery"></span>
              </div>
              <p class="mt-4 font-museum text-3xl font-extralight tracking-tight text-gallery">After dark.</p>
              <p class="label mt-2 text-alloy">Darkroom 56% · Gallery 25% · Bronze 5%</p>
            </div>

            <div class="rounded-2xl bg-charcoal p-6 text-lab">
              <div class="flex items-center justify-between">
                <span class="label text-ochre">Industrial routes</span>
                <span class="label text-alloy">03</span>
              </div>
              <h3 class="mt-4 font-industrial text-2xl font-bold">Precision</h3>
              <p class="mt-2 text-xs font-light leading-relaxed text-alloy">
                Explosion-proof, egress, marine, resources. Space Grotesk + Plex Mono. Category accent
                is earned, not decorative.
              </p>
              <div class="mt-6 flex h-10 overflow-hidden rounded-lg">
                <span class="w-1/2 bg-charcoal"></span>
                <span class="w-1/4 bg-alloy"></span>
                <span class="w-1/6 bg-ochre"></span>
                <span class="w-1/12 bg-viridian"></span>
              </div>
              <p class="mt-4 font-industrial text-3xl font-bold tracking-tight">IP66 / IK10</p>
              <p class="label mt-2 text-alloy">Space Grotesk 700 · Plex Mono 400</p>
            </div>
          </div>

          <div class="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
            <p class="label text-alloy">Violet #5B21B6 is confined to the CROIX mark. Layout purple: 0%.</p>
            <p class="label text-bronze">Contrast check: bronze on gallery is 2.6:1 — display and rules only.</p>
          </div>
        </div>
      </section>

      <section class="py-20 sm:py-24">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div class="lg:col-span-5">
              <p class="label mb-5 text-bronze-ink">Deliberately excluded</p>
              <h2 class="font-museum text-4xl font-extralight tracking-tight text-ink sm:text-5xl">
                What keeps it<br />from looking generic.
              </h2>
              <p class="mt-6 max-w-md text-sm font-light leading-relaxed text-mineral">
                The design is not “minimal” for its own sake. It is a lighting studio: the page should
                behave like a well-lit room, with real technical evidence in it.
              </p>
            </div>
            <div class="lg:col-span-7">
              <ul class="border-t border-ink/10">
                <li
                  v-for="(item, index) in excluded"
                  :key="item"
                  class="flex items-baseline gap-5 border-b border-ink/10 py-4"
                >
                  <span class="label text-bronze-ink">{{ String(index + 1).padStart(2, '0') }}</span>
                  <span class="text-sm font-light leading-relaxed text-mineral">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-16 rounded-panel border border-ink/10 bg-white/40 p-7 sm:p-10">
            <div class="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p class="label text-bronze-ink">Build order</p>
                <h3 class="mt-3 font-museum text-2xl font-light tracking-tight text-ink">
                  What the peg proves, and what comes next
                </h3>
              </div>
              <NuxtLink
                to="/"
                class="inline-flex items-center gap-2 rounded-full bg-darkroom px-5 py-2.5 text-label font-mono uppercase tracking-label text-gallery transition hover:bg-ink"
              >
                View the concept ↗
              </NuxtLink>
            </div>
            <div class="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 border-t border-ink/10 pt-6 sm:grid-cols-2 lg:grid-cols-3">
              <div v-for="(step, index) in [
                'Home — hero, split system, work index, evidence, contact',
                'Work — index + 8 case studies, real photography',
                'Services — packages, deliverables, standards',
                'Studio + team — story, five profiles, Milan / Manila',
                'Industrial — hub, three categories, resources',
                'Contact — upload form, routing, privacy',
              ]" :key="step" class="flex items-baseline gap-3">
                <span class="label text-bronze-ink">{{ String(index + 1).padStart(2, '0') }}</span>
                <span class="text-xs font-light leading-relaxed text-mineral">{{ step }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="border-t border-ink/10 bg-gallery">
      <div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-8 sm:px-8">
        <span class="label text-mineral">CROIX Lighting Design Studio · Design peg v0.1</span>
        <div class="flex items-center gap-6">
          <span class="label text-mineral">Nuxt 4 · Cloudflare Pages</span>
          <NuxtLink to="/" class="label text-bronze-ink transition hover:text-ink">Back to concept ↗</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>
