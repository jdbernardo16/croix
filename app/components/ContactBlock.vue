<script setup lang="ts">
import type { CmsHomePage } from '~/types/cms'
import { home as snapshotHome } from '~/data/content'
import { cmsList, cmsText } from '~/utils/cms'

const props = withDefaults(
  defineProps<{
    contact?: CmsHomePage['contact']
  }>(),
  { contact: () => snapshotHome.contact },
)

const view = computed(() => ({
  eyebrow: cmsText(props.contact.eyebrow),
  titleLine1: cmsText(props.contact.titleLine1),
  titleLine2: cmsText(props.contact.titleLine2),
  intro: cmsText(props.contact.intro),
  email: cmsText(props.contact.email),
  formLabel: cmsText(props.contact.formLabel),
  checklistTitle: cmsText(props.contact.checklistTitle),
  checklist: cmsList(props.contact.checklist),
  responseLabel: cmsText(props.contact.responseLabel),
  responseValue: cmsText(props.contact.responseValue),
  phoneNote: cmsText(props.contact.phoneNote),
}))

const emailHref = computed(
  () => `mailto:${view.value.email}?subject=New%20lighting%20project%20%E2%80%94%20drawings`,
)
</script>

<template>
  <section id="start" class="light-field grain relative scroll-mt-24 overflow-hidden border-t border-ink/10 py-24 sm:py-32">
    <div class="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
      <div class="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-8">
          <p class="label mb-6 flex items-center gap-3 text-bronze-ink">
            <span class="h-1.5 w-1.5 rounded-full bg-bronze"></span>
            {{ view.eyebrow }}
          </p>
          <h2 class="display-cta text-ink">
            {{ view.titleLine1 }}<br />
            {{ view.titleLine2 }}<span class="text-bronze">.</span>
          </h2>
          <p class="mt-8 max-w-xl text-base font-light leading-relaxed text-mineral sm:text-lg">
            {{ view.intro }}
          </p>
          <a
            :href="emailHref"
            class="mt-10 inline-flex items-center gap-3 border-b border-ink/20 pb-2 font-museum text-2xl font-light tracking-tight text-ink transition hover:border-bronze sm:text-3xl"
          >
            {{ view.email }}
            <span class="text-bronze" aria-hidden="true">↗</span>
          </a>
          <div class="mt-5">
            <NuxtLink to="/contact" class="link-quiet label text-bronze-ink transition hover:text-ink">
              {{ view.formLabel }} ↗
            </NuxtLink>
          </div>
        </div>

        <div class="lg:col-span-4">
          <div class="rounded-aperture border border-ink/10 bg-gallery/70 p-6 backdrop-blur-sm sm:p-8">
            <p class="label text-bronze-ink">{{ view.checklistTitle }}</p>
            <ul class="mt-5 space-y-3 border-t border-ink/10 pt-5 text-sm font-light text-mineral">
              <li
                v-for="(item, index) in view.checklist"
                :key="item"
                class="flex items-start justify-between gap-4"
              >
                <span>{{ item }}</span>
                <span class="label shrink-0 text-ink">{{ String(index + 1).padStart(2, '0') }}</span>
              </li>
            </ul>
            <div class="mt-6 flex items-center justify-between border-t border-ink/10 pt-5">
              <span class="label text-mineral">{{ view.responseLabel }}</span>
              <span class="label text-ink">{{ view.responseValue }}</span>
            </div>
          </div>
          <p class="mt-4 text-xs font-light leading-relaxed text-mineral">
            {{ view.phoneNote }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
