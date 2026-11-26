<script setup lang="ts">
import { projects } from '~/data/projects'

const homeProjects = projects.slice(0, 5)
const listRef = ref<HTMLElement | null>(null)
const active = ref<number | null>(null)
const px = ref(0)
const py = ref(0)

const current = computed(() => (active.value === null ? null : homeProjects[active.value]))

function onMove(event: PointerEvent) {
  if (!listRef.value) return
  const rect = listRef.value.getBoundingClientRect()
  const width = 336
  const height = 252
  px.value = Math.min(Math.max(12, event.clientX - rect.left + 28), rect.width - width - 12)
  py.value = Math.max(12, Math.min(event.clientY - rect.top - height / 2, rect.height - height - 12))
}
</script>

<template>
  <section id="work" class="scroll-mt-24 border-t border-ink/10 bg-gallery py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-5 sm:px-8">
      <div class="grid grid-cols-1 items-end gap-8 lg:grid-cols-12" data-reveal>
        <div class="lg:col-span-6">
          <p class="label mb-5 flex items-center gap-3 text-bronze-ink">
            <span class="h-1.5 w-1.5 rounded-full bg-bronze"></span>
            03 / Selected work
          </p>
          <h2 class="display-section text-ink">Light, in the field.</h2>
        </div>
        <div class="lg:col-span-6 lg:pl-10">
          <p class="max-w-xl text-base font-light leading-relaxed text-mineral sm:text-lg">
            Heritage landmarks, luxury resorts, public transport, and workplaces — often alongside
            Voltaire Light Design, In-visible lab, and Sergio Boccia Lighting Design.
          </p>
        </div>
      </div>

      <div
        ref="listRef"
        class="relative mt-14 border-b border-ink/10"
        data-reveal
        @pointermove="onMove"
        @pointerleave="active = null"
      >
        <NuxtLink
          v-for="(project, index) in homeProjects"
          :key="project.slug"
          :to="`/work/${project.slug}`"
          class="work-row grid grid-cols-12 items-baseline gap-4 border-t border-ink/10 py-6 sm:py-8"
          @mouseenter="active = index"
          @focus="active = index"
          @mouseleave="active = null"
          @blur="active = null"
        >
          <span class="label col-span-2 text-mineral lg:col-span-1">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="col-span-9 font-museum text-2xl font-light tracking-tight text-ink sm:text-3xl lg:col-span-5">
            {{ project.name }}
          </span>
          <span class="label col-span-2 hidden text-mineral lg:block">{{ project.location }}</span>
          <span class="label col-span-3 hidden text-right text-mineral lg:block">{{ project.sector }}</span>
          <span class="col-span-1 text-right text-mineral" aria-hidden="true">↗</span>
        </NuxtLink>

        <div
          class="work-preview hidden lg:block"
          :class="{ 'is-active': active !== null }"
          :style="{ '--px': px + 'px', '--py': py + 'px' }"
          aria-hidden="true"
        >
          <template v-if="current">
            <div class="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10">
              <img
                v-if="current.image"
                :src="current.image"
                :alt="current.name"
                class="aspect-4/3 w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div v-else class="aspect-4/3">
                <ProjectPlate :project="current" />
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="mt-4 flex flex-wrap items-center justify-between gap-3 text-mineral">
        <span class="label">Full case studies in production</span>
        <NuxtLink to="/work" class="link-quiet label text-bronze-ink transition hover:text-ink">
          All projects ↗
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
