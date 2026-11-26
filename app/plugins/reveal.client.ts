export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null

  function reveal() {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)')
    if (!elements.length) return

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-revealed'))
      return
    }

    observer?.disconnect()
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-revealed')
          observer?.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    )

    elements.forEach((element) => observer?.observe(element))
  }

  nuxtApp.hook('app:mounted', () => requestAnimationFrame(reveal))
  nuxtApp.hook('page:finish', () => {
    window.setTimeout(reveal, 80)
  })
})
