<script setup lang="ts">
useSeoMeta({
  title: 'Terms of use',
  description:
    'Terms for using the CROIX Lighting Design Studio website, including content, intellectual property, and project information.',
})
</script>

<template>
  <div>
    <SiteHeader />
    <main id="main">
      <PageHero
        section="Legal"
        eyebrow="Terms of use"
        title="The fine print."
        intro="The rules for using this website, and the limits of what a website can promise about a project."
      />

      <section class="bg-gallery py-20 sm:py-24">
        <div class="mx-auto max-w-7xl px-5 sm:px-8">
          <div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <aside class="lg:col-span-3">
              <div class="border-t border-ink/15 pt-5 lg:sticky lg:top-28">
                <p class="label text-bronze-ink">Last updated</p>
                <p class="mt-2 text-sm font-light text-mineral">26 November 2026</p>
                <p class="label mt-7 text-bronze-ink">Questions</p>
                <a
                  href="mailto:info@croixlighting.com.ph"
                  class="mt-2 block break-words text-sm font-light text-ink underline underline-offset-2"
                >
                  info@croixlighting.com.ph
                </a>
              </div>
            </aside>

            <div class="prose-croix lg:col-span-8 lg:col-start-5">
              <h2>Using this website</h2>
              <p>
                This website is operated by CROIX Lighting Design Studio. By using it, you agree to
                these terms. If you do not agree, please stop using the site.
              </p>

              <h2>Content and intellectual property</h2>
              <p>
                The text, layout, photographs, renders, drawings, diagrams, marks, and other content on
                this site are owned by CROIX or used with permission. You may view and share links to
                the site for ordinary reference. You may not reproduce, republish, or use the content for
                commercial purposes without written permission.
              </p>
              <p>
                Project credits to collaborators, including Voltaire Light Design, In-visible lab, and
                Sergio Boccia Lighting Design, are shown for attribution. Their names and work remain
                their property.
              </p>

              <h2>Project information is indicative</h2>
              <p>
                Project descriptions, scope summaries, images, and photometric studies are presented for
                general information. Some images are design studies, renders, or verification plates
                rather than built photography. A project page is not a technical specification, a
                guarantee of performance, or an offer to provide services on the same terms.
              </p>

              <h2>No professional advice or fee proposal</h2>
              <p>
                Nothing on this site is a fee proposal, a contract, or professional advice for a specific
                project. Any engagement begins only when both parties sign a written agreement that sets
                out the scope, deliverables, fees, and responsibilities.
              </p>

              <h2>External links</h2>
              <p>
                Links to third-party websites are provided for convenience. We do not control those
                sites and are not responsible for their content, availability, or privacy practices.
              </p>

              <h2>Limitation of liability</h2>
              <p>
                To the extent permitted by law, CROIX is not liable for indirect or consequential loss
                arising from use of this website. Nothing in these terms limits rights that cannot be
                limited under applicable law.
              </p>

              <h2>Governing law</h2>
              <p>
                These terms are governed by the laws of the Republic of the Philippines. Disputes are
                subject to the courts of the appropriate jurisdiction in the Philippines, unless a
                signed agreement says otherwise.
              </p>

              <h2>Changes</h2>
              <p>
                We may update these terms when the site or our services change. The date at the top shows
                the latest revision.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>
