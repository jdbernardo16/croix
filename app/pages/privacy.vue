<script setup lang="ts">
import { legal } from '~/data/legal'
import { site } from '~/data/site'
import { cmsDate, cmsLines, cmsText } from '~/utils/cms'

const page = legal.privacy

useSeoMeta({
  title: cmsText(page.meta.title, 'Privacy notice — CROIX'),
  description: cmsText(page.meta.description),
})

const copy = {
  hero: {
    section: cmsText(page.hero.section, 'Legal'),
    eyebrow: cmsText(page.hero.eyebrow),
    title: cmsText(page.hero.title),
    intro: cmsText(page.hero.intro),
  },
  lastUpdated: cmsDate(page.lastUpdated),
  content: cmsText(page.content),
}

const email = cmsText(site.email)
const emailHref = `mailto:${email}`
const address = cmsLines(site.manilaAddress)
  .map((line) => line.replace(/,+$/, ''))
  .join(', ')
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
      />

      <section class="bg-gallery py-20 sm:py-24">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <aside class="lg:col-span-3">
              <div class="border-t border-ink/15 pt-5 lg:sticky lg:top-28">
                <p class="label text-bronze-ink">Last updated</p>
                <p class="mt-2 text-sm font-light text-mineral">{{ copy.lastUpdated }}</p>
                <p class="label mt-7 text-bronze-ink">Contact</p>
                <a
                  :href="emailHref"
                  class="mt-2 block break-words text-sm font-light text-ink underline underline-offset-2"
                >
                  {{ email }}
                </a>
                <p class="mt-2 text-xs font-light leading-relaxed text-mineral">
                  {{ address }}
                </p>
              </div>
            </aside>

            <div class="prose-croix lg:col-span-8 lg:col-start-5" v-html="copy.content"></div>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>
