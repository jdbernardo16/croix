<script setup lang="ts">
import { sectors } from '~/data/projects'
import { packages } from '~/data/services'

const route = useRoute()

// `packages` is the mapped service data: `shortName` already falls back to the
// package name, so a package is never dropped from the select.
const packageOptions = packages.map((pkg) => ({
  value: pkg.shortName || pkg.name,
  label: [pkg.number, pkg.name].filter(Boolean).join(' — ') || pkg.shortName || pkg.name,
}))

const form = reactive({
  name: '',
  firm: '',
  role: '',
  email: '',
  phone: '',
  location: '',
  sector: '',
  package: String(route.query.package ?? ''),
  schedule: '',
  message: '',
  consent: false,
  website: '',
})

const files = ref<File[]>([])
const errors = reactive<Record<string, string>>({})
const submitted = ref(false)
const sending = ref(false)
const sendError = ref('')

const mailtoHref = computed(() => {
  const subject = `New lighting project — ${form.firm || form.name || 'website enquiry'}`
  const lines = [
    `Name: ${form.name}`,
    `Firm: ${form.firm}`,
    `Role: ${form.role}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone}`,
    `Project location: ${form.location}`,
    `Sector: ${form.sector}`,
    `Package: ${form.package}`,
    `Target schedule: ${form.schedule}`,
    '',
    'Project notes:',
    form.message,
    '',
    files.value.length ? `Files to attach: ${files.value.map((file) => file.name).join(', ')}` : '',
  ].filter(Boolean)

  return `mailto:info@croixlighting.com.ph?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
})

function onFiles(event: Event) {
  const input = event.target as HTMLInputElement
  files.value = Array.from(input.files ?? [])
}

function validate() {
  for (const key of Object.keys(errors)) delete errors[key]

  if (!form.name.trim()) errors.name = 'Please add your name.'
  if (!form.email.trim()) {
    errors.email = 'Please add an email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please check the email address.'
  }
  if (!form.message.trim()) errors.message = 'Tell us a little about the project.'
  if (!form.consent) errors.consent = 'Please confirm we may contact you about this enquiry.'

  return Object.keys(errors).length === 0
}

async function submit() {
  if (sending.value) return
  sendError.value = ''

  if (!validate()) {
    const first = ['name', 'email', 'message', 'consent'].find((key) => errors[key])
    if (first) document.getElementById(first)?.focus()
    return
  }

  sending.value = true

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        ...form,
        files: files.value.map((file) => file.name),
      },
    })

    submitted.value = true
    await nextTick()
    document.getElementById('form-status')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  } catch (error: unknown) {
    const err = error as { data?: { error?: string } }
    sendError.value =
      err?.data?.error || 'We could not send the enquiry. Please email info@croixlighting.com.ph.'
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <div>
    <div
      v-if="submitted"
      id="form-status"
      class="rounded-panel border border-ink/15 bg-gallery p-7 sm:p-9"
      role="status"
      aria-live="polite"
    >
      <p class="label text-bronze-ink">Enquiry received</p>
      <h2 class="mt-3 font-museum text-3xl font-extralight tracking-tight text-ink">
        Thank you — we have the brief.
      </h2>
      <p class="mt-4 max-w-lg text-sm font-light leading-relaxed text-mineral">
        We will review the details and come back within a few days. If you have drawings, reply to our
        email or send them to
        <a href="mailto:info@croixlighting.com.ph" class="underline underline-offset-2">info@croixlighting.com.ph</a>
        with your project name.
      </p>
      <div class="mt-6 flex flex-wrap items-center gap-4">
        <a
          :href="mailtoHref"
          class="inline-flex items-center gap-2 rounded-full bg-darkroom px-5 py-2.5 text-label font-mono uppercase tracking-label text-gallery transition hover:bg-ink"
        >
          Send drawings by email <span aria-hidden="true">↗</span>
        </a>
        <button type="button" class="label text-mineral transition hover:text-ink" @click="submitted = false">
          Send another enquiry
        </button>
      </div>
      <p v-if="files.length" class="mt-5 border-t border-ink/10 pt-4 text-xs font-light text-mineral">
        Remember to attach: {{ files.map((file) => file.name).join(', ') }}
      </p>
    </div>

    <div
      v-if="sendError && !submitted"
      id="form-status"
      class="mb-6 rounded-2xl border border-danger/30 bg-danger/5 p-5"
      role="alert"
      aria-live="polite"
    >
      <p class="label text-danger">Could not send</p>
      <p class="mt-2 text-sm font-light leading-relaxed text-mineral">{{ sendError }}</p>
      <a :href="mailtoHref" class="label mt-3 inline-block text-ink underline underline-offset-4">
        Email the studio instead ↗
      </a>
    </div>

    <form v-if="!submitted" class="space-y-8" novalidate @submit.prevent="submit">
      <div class="hidden" aria-hidden="true">
        <label for="website">Website</label>
        <input id="website" v-model="form.website" type="text" tabindex="-1" autocomplete="off" />
      </div>

      <div class="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2">
        <div>
          <label for="name" class="label text-mineral">Name <span class="text-bronze-ink">*</span></label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            autocomplete="name"
            class="mt-2 w-full border-b bg-transparent pb-2 text-sm font-light text-ink outline-none transition placeholder:text-mineral/50 focus:border-ink"
            :class="errors.name ? 'border-danger' : 'border-ink/20'"
            placeholder="Your name"
            :aria-invalid="Boolean(errors.name)"
            :aria-describedby="errors.name ? 'name-error' : undefined"
          />
          <p v-if="errors.name" id="name-error" class="mt-1.5 text-xs text-danger">{{ errors.name }}</p>
        </div>

        <div>
          <label for="firm" class="label text-mineral">Firm / studio</label>
          <input
            id="firm"
            v-model="form.firm"
            type="text"
            autocomplete="organization"
            class="mt-2 w-full border-b border-ink/20 bg-transparent pb-2 text-sm font-light text-ink outline-none transition placeholder:text-mineral/50 focus:border-ink"
            placeholder="Company or practice"
          />
        </div>

        <div>
          <label for="email" class="label text-mineral">Email <span class="text-bronze-ink">*</span></label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            class="mt-2 w-full border-b bg-transparent pb-2 text-sm font-light text-ink outline-none transition placeholder:text-mineral/50 focus:border-ink"
            :class="errors.email ? 'border-danger' : 'border-ink/20'"
            placeholder="you@firm.com"
            :aria-invalid="Boolean(errors.email)"
            :aria-describedby="errors.email ? 'email-error' : undefined"
          />
          <p v-if="errors.email" id="email-error" class="mt-1.5 text-xs text-danger">{{ errors.email }}</p>
        </div>

        <div>
          <label for="phone" class="label text-mineral">Phone</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            autocomplete="tel"
            class="mt-2 w-full border-b border-ink/20 bg-transparent pb-2 text-sm font-light text-ink outline-none transition placeholder:text-mineral/50 focus:border-ink"
            placeholder="+63"
          />
        </div>

        <div>
          <label for="location" class="label text-mineral">Project location</label>
          <input
            id="location"
            v-model="form.location"
            type="text"
            class="mt-2 w-full border-b border-ink/20 bg-transparent pb-2 text-sm font-light text-ink outline-none transition placeholder:text-mineral/50 focus:border-ink"
            placeholder="City, country"
          />
        </div>

        <div>
          <label for="sector" class="label text-mineral">Sector</label>
          <select
            id="sector"
            v-model="form.sector"
            class="mt-2 w-full border-b border-ink/20 bg-transparent pb-2 text-sm font-light text-ink outline-none transition focus:border-ink"
          >
            <option value="">Select a sector</option>
            <option v-for="sector in sectors" :key="sector" :value="sector">{{ sector }}</option>
            <option value="Mixed-use">Mixed-use</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label for="package" class="label text-mineral">Preferred package</label>
          <select
            id="package"
            v-model="form.package"
            class="mt-2 w-full border-b border-ink/20 bg-transparent pb-2 text-sm font-light text-ink outline-none transition focus:border-ink"
          >
            <option value="">Not sure yet</option>
            <option v-for="option in packageOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <div>
          <label for="schedule" class="label text-mineral">Target schedule</label>
          <input
            id="schedule"
            v-model="form.schedule"
            type="text"
            class="mt-2 w-full border-b border-ink/20 bg-transparent pb-2 text-sm font-light text-ink outline-none transition placeholder:text-mineral/50 focus:border-ink"
            placeholder="e.g. tender Q2 2027"
          />
        </div>
      </div>

      <div>
        <label for="message" class="label text-mineral">Project notes <span class="text-bronze-ink">*</span></label>
        <textarea
          id="message"
          v-model="form.message"
          rows="5"
          class="mt-2 w-full resize-y border-b bg-transparent pb-2 text-sm font-light leading-relaxed text-ink outline-none transition placeholder:text-mineral/50 focus:border-ink"
          :class="errors.message ? 'border-danger' : 'border-ink/20'"
          placeholder="What are you building, what stage is it at, and which decisions are still open?"
          :aria-invalid="Boolean(errors.message)"
          :aria-describedby="errors.message ? 'message-error' : undefined"
        ></textarea>
        <p v-if="errors.message" id="message-error" class="mt-1.5 text-xs text-danger">{{ errors.message }}</p>
      </div>

      <div>
        <span class="label text-mineral">Drawings &amp; references</span>
        <label
          for="files"
          class="mt-2 flex cursor-pointer flex-col items-start justify-between gap-3 rounded-2xl border border-dashed border-ink/25 bg-plaster/40 px-5 py-6 transition hover:border-ink/50 sm:flex-row sm:items-center"
        >
          <span class="text-sm font-light text-mineral">
            {{ files.length ? `${files.length} file${files.length > 1 ? 's' : ''} selected` : 'DWG, RVT, PDF, JPG, or PNG' }}
          </span>
          <span class="label rounded-full border border-ink/20 px-4 py-2 text-ink">Choose files</span>
        </label>
        <input
          id="files"
          type="file"
          multiple
          accept=".dwg,.rvt,.pdf,.jpg,.jpeg,.png,.webp"
          class="sr-only"
          @change="onFiles"
        />
        <ul v-if="files.length" class="mt-3 space-y-1 text-xs font-light text-mineral">
          <li v-for="file in files" :key="file.name">{{ file.name }}</li>
        </ul>
        <p class="mt-2 text-xs font-light text-mineral">
          File names are included in the enquiry. The drawings themselves should be emailed to
          info@croixlighting.com.ph so large files are not lost.
        </p>
      </div>

      <div>
        <label for="consent" class="flex items-start gap-3 text-xs font-light leading-relaxed text-mineral">
          <input
            id="consent"
            v-model="form.consent"
            type="checkbox"
            class="mt-0.5 h-4 w-4 shrink-0 accent-darkroom"
            :aria-invalid="Boolean(errors.consent)"
            :aria-describedby="errors.consent ? 'consent-error' : undefined"
          />
          <span>
            I agree that CROIX may use these details to respond to this enquiry, as described in the
            <NuxtLink to="/privacy" class="underline underline-offset-2 hover:text-ink">privacy notice</NuxtLink>.
          </span>
        </label>
        <p v-if="errors.consent" id="consent-error" class="mt-1.5 text-xs text-danger">{{ errors.consent }}</p>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6">
        <p class="label text-mineral">Response: within a few days</p>
        <button
          type="submit"
          :disabled="sending"
          class="inline-flex items-center gap-2 rounded-full bg-darkroom px-6 py-3 text-label font-mono uppercase tracking-label text-gallery transition hover:bg-ink disabled:cursor-wait disabled:opacity-60"
        >
          {{ sending ? 'Sending…' : 'Send enquiry' }} <span aria-hidden="true">↗</span>
        </button>
      </div>
    </form>
  </div>
</template>
