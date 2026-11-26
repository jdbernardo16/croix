/**
 * Cloudflare Worker entrypoint.
 *
 * Static files are served by the Workers assets binding from `.output/public`.
 * Only `/api/contact` runs code — it reuses the same handler as the Pages
 * Function in `functions/api/contact.ts`, so either hosting model works.
 */
import { onRequestPost } from '../functions/api/contact'

type WorkerEnv = {
  ASSETS: { fetch: (request: Request) => Promise<Response> }
  BREVO_API_KEY?: string
  CONTACT_TO?: string
  CONTACT_FROM?: string
}

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const { pathname } = new URL(request.url)

    if (pathname === '/api/contact' || pathname === '/api/contact/') {
      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ ok: false, error: 'Method not allowed.' }), {
          status: 405,
          headers: {
            'content-type': 'application/json; charset=utf-8',
            allow: 'POST',
            'cache-control': 'no-store',
          },
        })
      }

      return onRequestPost({ request, env })
    }

    return env.ASSETS.fetch(request)
  },
}
