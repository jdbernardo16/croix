<script setup lang="ts">
import { contact } from '~/data/contact'
import { site } from '~/data/site'
import { cmsLines, cmsTel, cmsText } from '~/utils/cms'

useSeoMeta({
  title: cmsText(contact.meta.title, 'Contact — CROIX'),
  description: cmsText(contact.meta.description),
})

const copy = {
  hero: {
    section: cmsText(contact.hero.section, 'Contact'),
    eyebrow: cmsText(contact.hero.eyebrow),
    title: cmsText(contact.hero.title),
    intro: cmsText(contact.hero.intro),
    stats: contact.hero.stats.map((stat) => ({
      value: cmsText(stat.value),
      label: cmsText(stat.label),
    })),
  },
  supplierNote: {
    label: cmsText(contact.supplierNote.label),
    body: cmsText(contact.supplierNote.body),
    linkLabel: cmsText(contact.supplierNote.linkLabel),
    linkUrl: cmsText(contact.supplierNote.linkUrl, '/services'),
  },
  steps: {
    eyebrow: cmsText(contact.steps.eyebrow),
    title: cmsText(contact.steps.title),
    intro: cmsText(contact.steps.intro),
    items: contact.steps.items.map((step) => ({
      number: cmsText(step.number),
      title: cmsText(step.title),
      body: cmsText(step.body),
    })),
  },
}

const email = cmsText(site.email)
const phone = cmsText(site.phone)

const direct = {
  email,
  emailHref: `mailto:${email}`,
  phone,
  phoneHref: cmsTel(phone),
  addressLines: cmsLines(site.manilaAddress),
  milanStudio: cmsText(site.milanStudio),
  milanCountry: cmsText(site.milanCountry),
  responseTime: cmsText(site.responseTime),
  manilaCoordinates: cmsText(site.manilaCoordinates),
  milanCoordinates: cmsText(site.milanCoordinates),
}
</script>

<template>
  <div>
    <SiteHeader />
    <main id="main">
      <PageHero
        :section="copy.hero.section"
        :eyebrow="copy.hero.eyebrow"
        :title="copy.hero.title"
        :intro="copy.hero.intro"
      >
        <template #aside>
          <div
            v-if="copy.hero.stats.length"
            class="mt-8 grid grid-cols-2 gap-6 border-t border-ink/10 pt-5 text-mineral"
          >
            <div v-for="stat in copy.hero.stats" :key="stat.label">
              <span class="font-museum text-3xl font-extralight text-ink">{{ stat.value }}</span>
              <span class="label mt-1 block">{{ stat.label }}</span>
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
                  :href="direct.emailHref"
                  class="mt-4 block break-words font-museum text-xl font-light tracking-tight text-ink transition hover:text-bronze-ink sm:text-2xl"
                >
                  {{ direct.email }}
                </a>
                <a
                  :href="direct.phoneHref"
                  class="mt-2 block text-sm font-light text-mineral transition hover:text-ink"
                >
                  {{ direct.phone }}
                </a>

                <div class="mt-7 border-t border-ink/10 pt-5">
                  <p class="label text-bronze-ink">Manila engineering</p>
                  <p class="mt-3 text-sm font-light leading-relaxed text-mineral">
                    <template v-for="(line, index) in direct.addressLines" :key="line">
                      {{ line }}<br v-if="index < direct.addressLines.length - 1" />
                    </template>
                  </p>
                </div>

                <div class="mt-6 border-t border-ink/10 pt-5">
                  <p class="label text-bronze-ink">Milan design</p>
                  <p class="mt-3 text-sm font-light leading-relaxed text-mineral">
                    {{ direct.milanStudio }}<br />
                    {{ direct.milanCountry }}
                  </p>
                </div>

                <div class="mt-6 flex items-center justify-between border-t border-ink/10 pt-5">
                  <span class="label text-mineral">Response</span>
                  <span class="label text-ink">{{ direct.responseTime }}</span>
                </div>
              </div>

              <div
                v-if="copy.supplierNote.label || copy.supplierNote.body"
                class="mt-5 rounded-2xl border border-ink/10 bg-plaster/40 p-5"
              >
                <p class="label text-bronze-ink">{{ copy.supplierNote.label }}</p>
                <p class="mt-2 text-xs font-light leading-relaxed text-mineral">
                  {{ copy.supplierNote.body }}
                </p>
                <NuxtLink
                  v-if="copy.supplierNote.linkLabel"
                  :to="copy.supplierNote.linkUrl"
                  class="link-quiet label mt-4 inline-block text-ink"
                >
                  {{ copy.supplierNote.linkLabel }} ↗
                </NuxtLink>
              </div>

              <div class="mt-6 flex items-center justify-between text-mineral">
                <span class="label">{{ direct.manilaCoordinates }}</span>
                <span class="label">{{ direct.milanCoordinates }}</span>
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
                {{ copy.steps.eyebrow }}
              </p>
              <h2 class="display-section text-ink">{{ copy.steps.title }}</h2>
            </div>
            <p class="max-w-xl text-base font-light leading-relaxed text-mineral lg:col-span-6 lg:col-start-7">
              {{ copy.steps.intro }}
            </p>
          </div>

          <div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3" data-reveal>
            <article
              v-for="(step, index) in copy.steps.items"
              :key="index"
              class="border-t border-ink/15 pt-6"
            >
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
