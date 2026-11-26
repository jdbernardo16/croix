<template>
  <footer class="bg-darkroom text-alloy">
    <div class="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-12">
        <div class="md:col-span-5">
          <div class="inline-flex rounded-xl bg-gallery p-3.5">
            <img src="/img/logo-lockup.png" alt="CROIX Lighting Design Studio" class="h-14 w-auto" />
          </div>
          <p class="mt-6 max-w-sm text-sm font-light leading-relaxed">
            Turnkey lighting design, photometric engineering, and control systems. Milanese design
            leadership with Manila engineering and on-site delivery.
          </p>
        </div>

        <div class="md:col-span-3">
          <p class="label text-bronze">Manila engineering</p>
          <p class="mt-4 text-sm font-light leading-relaxed">
            Werco Arcade Lot 18,<br />
            Dr. A. Santos Ave., San Antonio 1,<br />
            Parañaque City 1715, PH
          </p>
          <a href="tel:+639692228111" class="label mt-4 inline-block text-gallery transition hover:text-bronze">
            +63 969 222 8111
          </a>
          <a
            href="mailto:info@croixlighting.com.ph"
            class="mt-3 block font-mono text-xs normal-case tracking-normal text-gallery transition hover:text-bronze"
          >
            info@croixlighting.com.ph
          </a>
        </div>

        <div class="md:col-span-2">
          <p class="label text-bronze">Milan design</p>
          <p class="mt-4 text-sm font-light leading-relaxed">
            LUMEA Collective<br />
            Milan, Italy
          </p>

        </div>

        <div class="md:col-span-2">
          <p class="label text-bronze">Index</p>
          <nav class="mt-4 flex flex-col gap-2.5">
            <NuxtLink to="/work" class="label text-mineral transition hover:text-gallery">Work</NuxtLink>
            <NuxtLink to="/services" class="label text-mineral transition hover:text-gallery">Services</NuxtLink>
            <NuxtLink to="/studio" class="label text-mineral transition hover:text-gallery">Studio</NuxtLink>
            <NuxtLink to="/studio/team" class="label text-mineral transition hover:text-gallery">Team</NuxtLink>
            <NuxtLink to="/contact" class="label text-mineral transition hover:text-gallery">Contact</NuxtLink>
          </nav>
        </div>
      </div>

      <div class="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
        <span class="label text-mineral">© 2026 CROIX Lighting Design Studio</span>
        <div class="flex items-center gap-5">
          <NuxtLink to="/privacy" class="label text-mineral transition hover:text-gallery">Privacy</NuxtLink>
          <NuxtLink to="/terms" class="label text-mineral transition hover:text-gallery">Terms</NuxtLink>
        </div>
        <span class="label text-bronze">Manila / Milan</span>
      </div>
    </div>
  </footer>
</template>
