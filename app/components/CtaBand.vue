<script setup lang="ts">
import { cmsTel, cmsText } from '~/utils/cms'

const props = defineProps<{
  eyebrow?: string | null
  title?: string | null
  text?: string | null
  buttonLabel?: string | null
  buttonUrl?: string | null
  email?: string | null
  phone?: string | null
}>()

const view = computed(() => {
  const email = cmsText(props.email, 'info@croixlighting.com.ph')
  const phone = cmsText(props.phone, '+63 969 222 8111')

  return {
    eyebrow: cmsText(props.eyebrow, 'Start here'),
    title: cmsText(props.title, 'Send the drawings.'),
    text: cmsText(
      props.text,
      'DWG, RVT, or PDF. Add mood images, your preferred package, and a target schedule. We will review the drawings and come back with a clear fee proposal within a few days.',
    ),
    buttonLabel: cmsText(props.buttonLabel, 'Start a project'),
    buttonUrl: cmsText(props.buttonUrl, '/contact'),
    email,
    emailHref: `mailto:${email}`,
    phone,
    phoneHref: cmsTel(phone),
  }
})
</script>

<template>
  <section class="light-field grain relative overflow-hidden border-t border-ink/10 py-20 sm:py-24">
    <div class="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
      <div class="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <p class="label mb-5 flex items-center gap-3 text-bronze-ink">
            <span class="h-1.5 w-1.5 rounded-full bg-bronze"></span>
            {{ view.eyebrow }}
          </p>
          <h2 class="display-section max-w-2xl text-ink">{{ view.title }}</h2>
          <p class="mt-6 max-w-xl text-base font-light leading-relaxed text-mineral">{{ view.text }}</p>
        </div>
        <div class="flex flex-col items-start gap-5 lg:col-span-5 lg:items-end">
          <NuxtLink
            :to="view.buttonUrl"
            class="inline-flex items-center gap-2 rounded-full bg-darkroom px-6 py-3 text-label font-mono uppercase tracking-label text-gallery transition hover:bg-ink"
          >
            {{ view.buttonLabel }} <span aria-hidden="true">↗</span>
          </NuxtLink>
          <a
            :href="view.emailHref"
            class="link-quiet label text-mineral transition hover:text-ink"
          >
            {{ view.email }}
          </a>
          <a :href="view.phoneHref" class="label text-mineral transition hover:text-ink">{{ view.phone }}</a>
        </div>
      </div>
    </div>
  </section>
</template>
