<script setup lang="ts">
import type { Project } from '~/data/projects'

const props = defineProps<{
  project: Project
  index: string
}>()
</script>

<template>
  <NuxtLink :to="`/work/${props.project.slug}`" class="group block">
    <div class="relative aspect-4/3 overflow-hidden rounded-2xl bg-plaster">
      <img
        v-if="props.project.image"
        :src="props.project.image"
        :alt="props.project.imageAlt || props.project.name"
        class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        :class="props.project.imagePosition === 'bottom' ? 'object-bottom' : 'object-center'"
        loading="lazy"
        decoding="async"
      />
      <ProjectPlate v-else :project="props.project" :index="props.index" />
    </div>

    <div class="mt-4 flex items-start justify-between gap-4">
      <div>
        <div class="flex items-baseline gap-3">
          <span class="label text-bronze-ink">{{ props.index }}</span>
          <h3 class="font-museum text-xl font-light tracking-tight text-ink sm:text-2xl">
            {{ props.project.name }}
          </h3>
        </div>
        <p class="label mt-2 text-mineral">{{ props.project.location }} · {{ props.project.sector }}</p>
      </div>
      <span
        class="mt-1 shrink-0 text-mineral transition duration-300 group-hover:translate-x-1 group-hover:text-ink"
        aria-hidden="true"
      >
        ↗
      </span>
    </div>
  </NuxtLink>
</template>
