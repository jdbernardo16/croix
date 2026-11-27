<script setup lang="ts">
import { home } from '~/data/home'
import { site } from '~/data/site'
import { cmsText } from '~/utils/cms'

useHead({
  title: cmsText(home.meta.title, 'CROIX — Light, resolved.'),
  meta: [
    {
      name: 'description',
      content: cmsText(
        home.meta.description,
        'Turnkey architectural lighting design, photometric engineering, and control systems. Milanese design leadership, Manila delivery.',
      ),
    },
  ],
})
</script>

<template>
  <div>
    <SiteHeader :site="site" />
    <main id="main">
      <LightHero :hero="home.hero" />
      <TickerStrip :items="home.ticker" />
      <DisciplineSplit :disciplines="home.disciplines" />
      <WorkIndex :work="home.work" />
      <ProofStrip :proof="home.proof" />
      <ContactBlock :contact="home.contact" />
    </main>
    <SiteFooter :site="site" />
  </div>
</template>
