import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  devtools: { enabled: false },
  css: [
    '@fontsource-variable/manrope/index.css',
    '@fontsource-variable/inter/index.css',
    '@fontsource-variable/space-grotesk/index.css',
    '@fontsource/ibm-plex-mono/400.css',
    '@fontsource/ibm-plex-mono/500.css',
    '~/assets/css/main.css',
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'CROIX — Light, resolved.',
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'CROIX Lighting Design Studio — architectural lighting, photometric engineering, and control systems. Milan design leadership, Manila delivery.',
        },
        { name: 'theme-color', content: '#F6F5F1' },
      ],
    },
  },
})
