<script setup lang="ts">
const open = ref(false)
const scrolled = ref(false)

const nav = [
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'Studio', to: '/studio', exact: true },
  { label: 'Team', to: '/studio/team' },
  { label: 'Contact', to: '/contact' },
]

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header
    class="sticky top-0 z-50 transition-colors duration-500"
    :class="scrolled || open ? 'border-b border-ink/10 bg-gallery/90 backdrop-blur-xl' : 'border-b border-transparent'"
  >
    <a
      href="#main"
      class="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-darkroom focus:px-4 focus:py-2 focus:text-gallery"
    >
      Skip to content
    </a>
    <div class="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
      <NuxtLink to="/" class="shrink-0" aria-label="CROIX Lighting Design Studio — home">
        <img src="/img/logo-word.png" alt="CROIX Lighting Design Studio" class="h-6 w-auto sm:h-7" />
      </NuxtLink>

      <nav class="hidden items-center gap-8 text-mineral lg:flex">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="label transition hover:text-ink"
          :active-class="item.exact ? undefined : 'text-ink'"
          :exact-active-class="item.exact ? 'text-ink' : undefined"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <NuxtLink
          to="/contact"
          class="label hidden items-center gap-2 rounded-full bg-darkroom px-5 py-2.5 text-gallery transition hover:bg-ink sm:inline-flex"
        >
          Start a project <span aria-hidden="true">↗</span>
        </NuxtLink>
        <button
          type="button"
          class="label flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-ink transition hover:border-ink lg:hidden"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          @click="open = !open"
        >
          {{ open ? 'Close' : 'Menu' }}
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="open" id="mobile-menu" class="border-y border-ink/10 bg-gallery/95 backdrop-blur-xl lg:hidden">
        <nav class="mx-auto max-w-7xl px-5 py-6 sm:px-8">
          <NuxtLink
            v-for="(item, index) in nav"
            :key="item.to"
            :to="item.to"
            class="flex items-baseline justify-between border-b border-ink/10 py-4 font-museum text-3xl font-extralight tracking-tight text-ink"
            @click="open = false"
          >
            {{ item.label }}
            <span class="label text-mineral">{{ String(index + 1).padStart(2, '0') }}</span>
          </NuxtLink>
          <div class="mt-6 flex items-center justify-between text-mineral">
            <span class="label">Manila / Milan</span>
            <a href="mailto:info@croixlighting.com.ph" class="label text-ink">info@croixlighting.com.ph</a>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>
