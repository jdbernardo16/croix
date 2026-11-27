<script setup lang="ts">
import type { CmsSiteSettings } from '~/types/cms'
import { site as snapshotSite } from '~/data/site'
import { cmsLines, cmsTel, cmsText } from '~/utils/cms'

const props = withDefaults(
  defineProps<{
    site?: CmsSiteSettings
  }>(),
  { site: () => snapshotSite },
)

const fallbackNav = [
  { label: 'Work', url: '/work', sortOrder: 1, showInFooter: true },
  { label: 'Services', url: '/services', sortOrder: 2, showInFooter: true },
  { label: 'Studio', url: '/studio', sortOrder: 3, showInFooter: true },
  { label: 'Team', url: '/studio/team', sortOrder: 4, showInFooter: true },
  { label: 'Contact', url: '/contact', sortOrder: 5, showInFooter: true },
]

const view = computed(() => {
  const footerNav = props.site.nav
    .filter((item) => item.showInFooter)
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)

  const phone = cmsText(props.site.phone)

  return {
    siteName: cmsText(props.site.name, 'CROIX Lighting Design Studio'),
    intro: cmsText(props.site.footerIntro),
    lockup: props.site.lockup?.src || '/img/logo-lockup.png',
    addressLines: cmsLines(props.site.manilaAddress),
    phone,
    phoneHref: cmsTel(phone),
    email: cmsText(props.site.email),
    milanStudio: cmsText(props.site.milanStudio),
    milanCountry: cmsText(props.site.milanCountry),
    copyright: cmsText(props.site.copyright),
    nav: footerNav.length ? footerNav : fallbackNav,
  }
})

const emailHref = computed(() => `mailto:${view.value.email}`)
</script>

<template>
  <footer class="bg-darkroom text-alloy">
    <div class="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-12">
        <div class="md:col-span-5">
          <div class="inline-flex rounded-xl bg-gallery p-3.5">
            <img :src="view.lockup" :alt="view.siteName" class="h-14 w-auto" />
          </div>
          <p class="mt-6 max-w-sm text-sm font-light leading-relaxed">
            {{ view.intro }}
          </p>
        </div>

        <div class="md:col-span-3">
          <p class="label text-bronze">Manila engineering</p>
          <p class="mt-4 text-sm font-light leading-relaxed">
            <template v-for="(line, index) in view.addressLines" :key="line">
              {{ line }}<br v-if="index < view.addressLines.length - 1" />
            </template>
          </p>
          <a :href="view.phoneHref" class="label mt-4 inline-block text-gallery transition hover:text-bronze">
            {{ view.phone }}
          </a>
          <a
            :href="emailHref"
            class="mt-3 block font-mono text-xs normal-case tracking-normal text-gallery transition hover:text-bronze"
          >
            {{ view.email }}
          </a>
        </div>

        <div class="md:col-span-2">
          <p class="label text-bronze">Milan design</p>
          <p class="mt-4 text-sm font-light leading-relaxed">
            {{ view.milanStudio }}<br />
            {{ view.milanCountry }}
          </p>

        </div>

        <div class="md:col-span-2">
          <p class="label text-bronze">Index</p>
          <nav class="mt-4 flex flex-col gap-2.5">
            <NuxtLink
              v-for="item in view.nav"
              :key="item.url"
              :to="item.url"
              class="label text-mineral transition hover:text-gallery"
            >
              {{ item.label }}
            </NuxtLink>
          </nav>
        </div>
      </div>

      <div class="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
        <span class="label text-mineral">{{ view.copyright }}</span>
        <div class="flex items-center gap-5">
          <NuxtLink to="/privacy" class="label text-mineral transition hover:text-gallery">Privacy</NuxtLink>
          <NuxtLink to="/terms" class="label text-mineral transition hover:text-gallery">Terms</NuxtLink>
        </div>
        <span class="label text-bronze">Manila / Milan</span>
      </div>
    </div>
  </footer>
</template>
