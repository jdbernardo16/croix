<script setup lang="ts">
import { standards } from '~/data/services'

useSeoMeta({
  title: 'Studio',
  description:
    'CROIX Lighting Design Studio — Milanese design leadership and Manila engineering for architectural lighting, photometric verification, and control systems.',
})

const timeline = [
  {
    label: '01 / Visualisation',
    title: 'Rooms that only worked when the light was right',
    body: 'While studying architecture at the University of Santo Tomas, Jonathan “Balong” Dela Cruz spent thousands of hours producing commissioned 3D architectural visualisations. High-end furniture and textured finishes only succeeded when the lighting was accurately placed — the observation that led him to specialise in illumination design.',
  },
  {
    label: '02 / Light Plan',
    title: 'A studio apprenticeship, and a shared standard',
    body: 'After working with several architecture firms, Jonathan joined Light Plan, Inc., a pioneering lighting design studio at the time, and invited his former colleague Charmaine “Ming” Javier-Fornarelli to the studio. Together they contributed to the 2011 and 2016 Philippine Lighting Conferences.',
  },
  {
    label: '03 / Manufacturing',
    title: 'Learning how fixtures are actually built',
    body: 'Jonathan moved into luminaire production and lamp distribution to understand how fixtures are engineered, sourced, and installed. That experience now informs the studio’s optical reviews, value engineering, and independent procurement policy.',
  },
  {
    label: '04 / Field research',
    title: 'The cost of over-lighting',
    body: 'As early LED technology spread, lower electricity consumption led owners to over-light spaces with harsh, glaring fixtures. Jonathan documented the effects — indoor eye strain and outdoor light pollution — across the Sierra Madre mountains, the firefly habitats of Iwahig in Palawan, and pawikan conservation sites in La Union with CURMA. During the COVID-19 pandemic, he also documented how poorly specified household LEDs caused daily eye fatigue, headaches, and migraines.',
  },
  {
    label: '05 / Milan',
    title: 'European design leadership',
    body: 'Charmaine became a licensed architect, practised with C.T. Onglao Architects and developer VConsunji, then moved to Italy to earn her Master’s Degree in Lighting Design and LED Technology at Politecnico di Milano. She practised in Milan with studios including Voltaire Light Design before founding LUMEA Collective.',
  },
  {
    label: '06 / One practice',
    title: 'Milan and Manila, in the same drawing set',
    body: 'As LUMEA’s European practice grew, Charmaine needed a dedicated engineering team in the Philippines. Jonathan was building CROIX in Metro Manila around the same time. The two practices now operate as one delivery team: Milanese design direction, Manila engineering, and on-site commissioning across time zones.',
  },
]

const principles = [
  {
    number: '01',
    title: 'Human comfort first',
    body: 'Glare, colour rendering, and vertical illuminance are treated as design constraints, not finishing touches. A room should feel comfortable after an hour, not just photogenic for a minute.',
  },
  {
    number: '02',
    title: 'Protect the night sky',
    body: 'Outdoor light is shielded, aimed, and dimmed so it lands on people and surfaces rather than drifting upward. DarkSky principles are part of the brief, not an afterthought.',
  },
  {
    number: '03',
    title: 'Stay brand-neutral',
    body: 'CROIX does not manufacture or sell fixtures. Schedules, Bills of Quantities, and value-engineering reviews are written without a product allegiance — so the specification is defensible.',
  },
  {
    number: '04',
    title: 'Prove it',
    body: 'DIALux evo calculations, false-colour illuminance maps, UGR reports, load schedules, and code paths leave the studio with the design. The numbers are part of the deliverable.',
  },
]
</script>

<template>
  <div>
    <SiteHeader />
    <main id="main">
      <PageHero
        section="Studio"
        eyebrow="The practice / Manila · Milan"
        title="A practice built around light."
        intro="CROIX is a turnkey lighting design and engineering studio. Milanese design leadership, Manila technical delivery, and one accountable team from first sketch to opening night."
      />

      <section class="bg-gallery py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
            <div class="lg:col-span-4" data-reveal>
              <p class="label mb-5 flex items-center gap-3 text-bronze-ink">
                <span class="h-1.5 w-1.5 rounded-full bg-bronze"></span>
                01 / Who we are
              </p>
              <h2 class="display-section text-ink">The last five percent.</h2>
              <p class="mt-6 max-w-sm text-sm font-light leading-relaxed text-mineral">
                You can spend months planning a building and sourcing stone, timber, and fabrics. The
                final appearance and comfort of that space still depend on how it is lit.
              </p>
            </div>
            <div class="lg:col-span-8 lg:pl-8" data-reveal>
              <div class="grid grid-cols-1 gap-8 sm:grid-cols-12">
                <div class="space-y-5 sm:col-span-7">
                  <p class="text-base font-light leading-relaxed text-mineral sm:text-lg">
                    Lighting determines how a room functions and looks the moment someone walks
                    through the door. It is the difference between a hotel lobby that feels welcome, an
                    office where people can work all day without eye strain, and a building exterior
                    that remains safe and visible at night.
                  </p>
                  <p class="text-base font-light leading-relaxed text-mineral">
                    CROIX, together with our Italian sister studio LUMEA Collective, provides complete
                    turnkey lighting and control solutions from initial concept to final installation.
                    We combine architectural lighting design from Milan with illumination and control
                    systems engineering in Metro Manila.
                  </p>
                  <p class="text-base font-light leading-relaxed text-mineral">
                    We partner with property developers, architects, interior designers, electrical
                    contractors, engineers, and lighting suppliers around the world. Indoor light should
                    be as comfortable as natural daylight; outdoor light should guide people safely
                    without wasting electricity or polluting the night sky.
                  </p>
                </div>
                <figure class="sm:col-span-5">
                  <div class="overflow-hidden rounded-aperture">
                    <img
                      src="/img/gallery-stair.jpg"
                      alt="Daylight falling through a quiet concrete stair"
                      class="aspect-4/5 w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <figcaption class="mt-3 flex items-center justify-between text-mineral">
                    <span class="label">Practice study</span>
                    <span class="label">Manila / Milan</span>
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
              <p class="label text-bronze-ink">Mission</p>
              <h2 class="mt-5 font-museum text-3xl font-extralight tracking-tight text-ink sm:text-4xl">
                Comfortable inside. Safe outside. On time and on budget.
              </h2>
              <p class="mt-5 max-w-xl text-base font-light leading-relaxed text-mineral">
                To deliver complete turnkey lighting design, photometric engineering, and control
                system solutions that make indoor spaces comfortable for occupants, keep outdoor
                environments safe from glare and light pollution, and help construction teams complete
                projects on time and within budget.
              </p>
            </article>
            <article class="rounded-panel bg-darkroom p-7 text-gallery sm:p-10" data-reveal>
              <p class="label text-bronze">Vision</p>
              <h2 class="mt-5 font-museum text-3xl font-extralight tracking-tight text-gallery sm:text-4xl">
                The trusted lighting partner across borders.
              </h2>
              <p class="mt-5 max-w-xl text-base font-light leading-relaxed text-alloy">
                To be the trusted global lighting and engineering partner for property developers,
                architects, contractors, and lighting suppliers, setting the practical standard for
                built environments where architectural materials, electrical systems, and human visual
                comfort work together reliably.
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
                02 / Origin
              </p>
              <h2 class="display-section text-ink">Light, nature, and the spaces we share.</h2>
              <p class="mt-6 max-w-sm text-sm font-light leading-relaxed text-mineral">
                The studio grew out of visualisation, luminaire manufacturing, field research, and a
                Milan–Manila partnership. The through-line is the same: light has to work for the
                people in the room and for the sky outside it.
              </p>
            </div>
            <div class="lg:col-span-8 lg:pl-8">
              <ol class="border-l border-ink/15 pl-8" data-reveal>
                <li
                  v-for="item in timeline"
                  :key="item.label"
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
                03 / The model
              </p>
              <h2 class="display-section text-gallery">
                Milan draws.<br />
                Manila resolves.
              </h2>
            </div>
            <p class="max-w-xl text-base font-light leading-relaxed text-alloy lg:col-span-5 lg:col-start-8">
              One practice, two centres of gravity. The design direction sits close to the European
              architecture and hospitality market; the engineering hub sits close to the drawings,
              contractors, and site conditions where the work is built.
            </p>
          </div>

          <div class="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <article class="rounded-panel border border-white/10 bg-shadow/60 p-7 sm:p-10" data-reveal>
              <div class="flex items-baseline justify-between gap-4">
                <span class="label text-bronze">Milan / LUMEA Collective</span>
                <span class="label text-alloy">Design</span>
              </div>
              <h3 class="mt-5 font-museum text-3xl font-extralight tracking-tight text-gallery">
                Creative direction
              </h3>
              <p class="mt-4 text-sm font-light leading-relaxed text-alloy">
                Principal Lighting Designer Ar. Charmaine “Ming” Javier-Fornarelli leads the design
                division from Milan. A Politecnico di Milano graduate and licensed architect, she sets
                the creative and technical standard across heritage landmarks, corporate headquarters,
                and luxury hospitality — often alongside European studios including Voltaire Light
                Design, In-visible lab, and Sergio Boccia Lighting Design.
              </p>
              <ul class="mt-6 space-y-2 border-t border-white/10 pt-5 text-xs font-light text-alloy">
                <li>Concept, daylighting, and atmosphere</li>
                <li>Heritage and hospitality design review</li>
                <li>European studio collaboration</li>
                <li>Brand-neutral fixture direction</li>
              </ul>
            </article>

            <article class="rounded-panel border border-white/10 bg-shadow/60 p-7 sm:p-10" data-reveal>
              <div class="flex items-baseline justify-between gap-4">
                <span class="label text-bronze">Manila / Engineering</span>
                <span class="label text-alloy">Delivery</span>
              </div>
              <h3 class="mt-5 font-museum text-3xl font-extralight tracking-tight text-gallery">
                Technical execution
              </h3>
              <p class="mt-4 text-sm font-light leading-relaxed text-alloy">
                The Metro Manila hub turns the design into buildable documentation: DIALux evo
                verification, AutoCAD and Revit layouts, control architecture, load schedules,
                procurement support, and on-site commissioning. Electrical engineers trained in
                government plan review close the loop between design intent and inspection.
              </p>
              <ul class="mt-6 space-y-2 border-t border-white/10 pt-5 text-xs font-light text-alloy">
                <li>Photometrics and false-colour verification</li>
                <li>RCP, SLD, cable schedules, load computations</li>
                <li>Controls integration and programming</li>
                <li>Nighttime aiming, lux verification, handover</li>
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
                04 / Principles
              </p>
              <h2 class="display-section text-ink">How we make decisions.</h2>
            </div>
            <p class="max-w-xl text-base font-light leading-relaxed text-mineral lg:col-span-6 lg:col-start-7">
              These are the constraints we bring to every project — before the fixture schedule, before
              the renders, and before the budget conversation.
            </p>
          </div>

          <div class="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
            <article v-for="principle in principles" :key="principle.number" class="border-t border-ink/15 pt-6">
              <span class="label text-bronze-ink">{{ principle.number }}</span>
              <h3 class="mt-4 font-museum text-xl font-light tracking-tight text-ink">
                {{ principle.title }}
              </h3>
              <p class="mt-2 text-xs font-light leading-relaxed text-mineral">{{ principle.body }}</p>
            </article>
          </div>

          <div class="mt-16 border-y border-ink/10 py-6" data-reveal>
            <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
              <span class="label shrink-0 text-bronze-ink">Codes &amp; standards</span>
              <span v-for="standard in standards" :key="standard" class="label text-mineral">
                {{ standard }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Next"
        title="Bring us the drawings."
        text="Tell us where the project is, what stage it is at, and which decisions are still open. We will come back with a clear scope and fee proposal."
      />
    </main>
    <SiteFooter />
  </div>
</template>
