<script setup lang="ts">
import { getProject, projects, relatedProjects } from '~/data/projects'

const route = useRoute()
const project = getProject(String(route.params.slug))

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

const related = relatedProjects(project.slug)
const currentIndex = projects.findIndex((item) => item.slug === project.slug)
const nextProject = projects[(currentIndex + 1) % projects.length]!

const indexFor = (slug: string) =>
  String(projects.findIndex((item) => item.slug === slug) + 1).padStart(2, '0')

useSeoMeta({
  title: project.name,
  description: project.summary,
  ogTitle: `${project.name} — CROIX`,
  ogDescription: project.summary,
  ogImage: project.image,
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.name,
        description: project.summary,
        locationCreated: project.location,
        creator: {
          '@type': 'Organization',
          name: 'CROIX Lighting Design Studio',
        },
      }),
    },
  ],
})
</script>

<template>
  <div>
    <SiteHeader />
    <main id="main">
      <PageHero
        section="Work / Case study"
        :eyebrow="`${project.sector} / ${project.location}`"
        :title="project.name"
        :intro="project.summary"
        size="section"
      >
        <template #aside>
          <dl class="mt-8 grid grid-cols-2 gap-5 border-t border-ink/10 pt-5 text-mineral">
            <div>
              <dt class="label">Location</dt>
              <dd class="mt-1 text-sm font-light text-ink">{{ project.location }}</dd>
            </div>
            <div>
              <dt class="label">Sector</dt>
              <dd class="mt-1 text-sm font-light text-ink">{{ project.sector }}</dd>
            </div>
          </dl>
        </template>
      </PageHero>

      <figure class="bg-gallery pb-4 pt-10">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="relative aspect-16/9 overflow-hidden rounded-aperture bg-plaster sm:aspect-21/9">
            <img
              v-if="project.image"
              :src="project.image"
              :alt="project.imageAlt || project.name"
              class="h-full w-full object-cover"
              :class="project.imagePosition === 'bottom' ? 'object-bottom' : 'object-center'"
              loading="eager"
              decoding="async"
            />
            <ProjectPlate v-else :project="project" hero />
          </div>
        </div>
        <figcaption class="mx-auto mt-3 flex max-w-7xl flex-wrap items-center justify-between gap-2 px-5 text-mineral sm:px-8">
          <span class="label">
            {{ project.image ? 'Project imagery / CROIX documentation' : 'Light study / imagery in production' }}
          </span>
          <span class="label">{{ indexFor(project.slug) }} / 08 · {{ project.sector }}</span>
        </figcaption>
      </figure>

      <section class="bg-gallery py-20 sm:py-24">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
            <div class="lg:col-span-7">
              <p class="label text-bronze-ink">Context</p>
              <p class="mt-4 text-base font-light leading-relaxed text-mineral sm:text-lg">
                {{ project.context }}
              </p>

              <p class="label mt-10 text-bronze-ink">Approach</p>
              <p class="mt-4 text-base font-light leading-relaxed text-mineral sm:text-lg">
                {{ project.approach }}
              </p>

              <div v-if="project.collaborator" class="mt-10 rounded-2xl border border-bronze/30 bg-plaster/50 p-5">
                <p class="label text-bronze-ink">In collaboration</p>
                <p class="mt-2 font-museum text-xl font-light text-ink">{{ project.collaborator }}</p>
              </div>
            </div>

            <aside class="lg:col-span-4 lg:col-start-9">
              <div class="rounded-panel border border-ink/15 bg-plaster/40 p-6 sm:p-7">
                <p class="label text-bronze-ink">Project record</p>
                <dl class="mt-5 divide-y divide-ink/10">
                  <div class="flex justify-between gap-4 py-3">
                    <dt class="label text-mineral">Location</dt>
                    <dd class="w-1/2 text-right text-xs font-light text-ink">{{ project.location }}</dd>
                  </div>
                  <div class="flex justify-between gap-4 py-3">
                    <dt class="label text-mineral">Sector</dt>
                    <dd class="text-right text-xs font-light text-ink">{{ project.sector }}</dd>
                  </div>
                  <div v-if="project.collaborator" class="flex justify-between gap-4 py-3">
                    <dt class="label text-mineral">Collaboration</dt>
                    <dd class="w-1/2 text-right text-xs font-light text-ink">{{ project.collaborator }}</dd>
                  </div>
                  <div class="py-3">
                    <dt class="label text-mineral">Scope</dt>
                    <dd class="mt-1 text-xs font-light leading-relaxed text-ink">{{ project.scope }}</dd>
                  </div>
                </dl>

                <div class="mt-5 border-t border-ink/10 pt-5">
                  <p class="label text-bronze-ink">Services</p>
                  <ul class="mt-3 space-y-1.5 text-xs font-light leading-relaxed text-mineral">
                    <li v-for="service in project.services" :key="service">{{ service }}</li>
                  </ul>
                </div>

                <NuxtLink
                  to="/contact"
                  class="label mt-6 inline-flex items-center gap-2 border-t border-ink/10 pt-4 text-ink transition hover:text-bronze-ink"
                >
                  Discuss a similar project <span aria-hidden="true">↗</span>
                </NuxtLink>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section v-if="project.gallery?.length" class="border-t border-ink/10 bg-plaster/50 py-20 sm:py-24">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="flex flex-wrap items-end justify-between gap-4" data-reveal>
            <div>
              <p class="label text-bronze-ink">Documentation</p>
              <h2 class="mt-2 font-museum text-3xl font-extralight tracking-tight text-ink">
                Drawings, renders, and photometric proof.
              </h2>
            </div>
            <span class="label text-mineral">{{ String(project.gallery.length).padStart(2, '0') }} plates</span>
          </div>

          <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2" data-reveal>
            <figure
              v-for="(image, index) in project.gallery"
              :key="image.src"
              :class="project.gallery.length === 1 ? 'sm:col-span-2' : ''"
            >
              <div
                class="overflow-hidden rounded-2xl bg-darkroom"
                :class="project.gallery.length === 1 ? 'aspect-21/9' : 'aspect-16/10'"
              >
                <img
                  :src="image.src"
                  :alt="image.alt"
                  class="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption class="mt-2 flex items-center justify-between gap-3 text-mineral">
                <span class="label">{{ image.caption }}</span>
                <span class="label">{{ String(index + 1).padStart(2, '0') }}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section class="border-t border-ink/10 bg-gallery py-20 sm:py-24">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="flex flex-wrap items-end justify-between gap-4" data-reveal>
            <div>
              <p class="label text-bronze-ink">Related</p>
              <h2 class="mt-2 font-museum text-3xl font-extralight tracking-tight text-ink">More from the field.</h2>
            </div>
            <NuxtLink to="/work" class="link-quiet label text-mineral transition hover:text-ink">
              All projects ↗
            </NuxtLink>
          </div>

          <div class="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3" data-reveal>
            <ProjectCard
              v-for="item in related"
              :key="item.slug"
              :project="item"
              :index="indexFor(item.slug)"
            />
          </div>

          <NuxtLink
            :to="`/work/${nextProject.slug}`"
            class="mt-16 flex flex-wrap items-end justify-between gap-4 border-t border-ink/15 pt-6 transition hover:border-bronze"
          >
            <div>
              <span class="label text-bronze-ink">Next project</span>
              <span class="mt-2 block font-museum text-2xl font-light tracking-tight text-ink sm:text-3xl">
                {{ nextProject.name }}
              </span>
            </div>
            <span class="text-2xl text-mineral" aria-hidden="true">→</span>
          </NuxtLink>
        </div>
      </section>

      <CtaBand
        eyebrow="Start a project"
        title="Send the drawings."
        text="Tell us about the building, the stage, and the open decisions. We will come back with a clear scope and fee proposal."
      />
    </main>
    <SiteFooter />
  </div>
</template>
