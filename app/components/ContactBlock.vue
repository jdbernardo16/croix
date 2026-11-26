<template>
  <section id="start" class="light-field grain relative scroll-mt-24 overflow-hidden border-t border-ink/10 py-24 sm:py-32">
    <div class="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
      <div class="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
        <div class="lg:col-span-8">
          <p class="label mb-6 flex items-center gap-3 text-bronze-ink">
            <span class="h-1.5 w-1.5 rounded-full bg-bronze"></span>
            05 / Start here
          </p>
          <h2 class="display-cta text-ink">
            Send the<br />
            drawings<span class="text-bronze">.</span>
          </h2>
          <p class="mt-8 max-w-xl text-base font-light leading-relaxed text-mineral sm:text-lg">
            DWG, RVT, or PDF. Add mood images, your preferred package, and a target schedule. We will
            review the drawings and come back with a clear fee proposal within a few days.
          </p>
          <a
            href="mailto:info@croixlighting.com.ph?subject=New%20lighting%20project%20%E2%80%94%20drawings"
            class="mt-10 inline-flex items-center gap-3 border-b border-ink/20 pb-2 font-museum text-2xl font-light tracking-tight text-ink transition hover:border-bronze sm:text-3xl"
          >
            info@croixlighting.com.ph
            <span class="text-bronze" aria-hidden="true">↗</span>
          </a>
          <div class="mt-5">
            <NuxtLink to="/contact" class="link-quiet label text-bronze-ink transition hover:text-ink">
              Use the project form ↗
            </NuxtLink>
          </div>
        </div>

        <div class="lg:col-span-4">
          <div class="rounded-aperture border border-ink/10 bg-gallery/70 p-6 backdrop-blur-sm sm:p-8">
            <p class="label text-bronze-ink">What to send</p>
            <ul class="mt-5 space-y-3 border-t border-ink/10 pt-5 text-sm font-light text-mineral">
              <li class="flex items-start justify-between gap-4">
                <span>Architectural plans &amp; RCPs</span>
                <span class="label shrink-0 text-ink">01</span>
              </li>
              <li class="flex items-start justify-between gap-4">
                <span>DWG, RVT, or PDF</span>
                <span class="label shrink-0 text-ink">02</span>
              </li>
              <li class="flex items-start justify-between gap-4">
                <span>Mood images or 3D views</span>
                <span class="label shrink-0 text-ink">03</span>
              </li>
              <li class="flex items-start justify-between gap-4">
                <span>Package + target schedule</span>
                <span class="label shrink-0 text-ink">04</span>
              </li>
            </ul>
            <div class="mt-6 flex items-center justify-between border-t border-ink/10 pt-5">
              <span class="label text-mineral">Response</span>
              <span class="label text-ink">Within a few days</span>
            </div>
          </div>
          <p class="mt-4 text-xs font-light leading-relaxed text-mineral">
            Prefer a call? Manila +63 969 222 8111. Milan studio hours are available for European
            commissions.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
