/**
 * POST /api/prayer — prayer request + praise report intake.
 *
 * Cloudflare Pages Function. Submissions are emailed, never stored here and
 * never posted anywhere public. Sharing consent is explicit opt-in and is
 * passed through verbatim so whoever reads the request can honor it.
 *
 * Required env var (Pages project → Settings → Variables):
 *   WEB3FORMS_KEY   free access key from web3forms.com, created with the
 *                   inbox that should receive requests
 *                   (lightofcambodia.loc@gmail.com)
 * Optional:
 *   TURNSTILE_SECRET  Cloudflare Turnstile secret. When set, the matching site
 *                     key must also be set in app.js (TURNSTILE_SITEKEY), or
 *                     every submission will be rejected.
 */

const MIN_FILL_MS = 3000; // a real person takes longer than this to fill the form

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

async function readBody(request) {
  const type = request.headers.get('content-type') || '';
  if (type.includes('application/json')) return await request.json();
  const form = await request.formData();
  return Object.fromEntries(form);
}

async function verifyTurnstile(secret, token, ip) {
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token || '');
  if (ip) body.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  });
  const data = await res.json();
  return data.success === true;
}

export async function onRequestPost({ request, env }) {
  const wantsJson = (request.headers.get('accept') || '').includes('application/json');
  const done = (status, payload, redirect) =>
    wantsJson
      ? json(status, payload)
      : Response.redirect(new URL(redirect, request.url).toString(), 303);

  let data;
  try {
    data = await readBody(request);
  } catch {
    return done(400, { ok: false, error: 'bad request' }, '/prayer.html?sent=error');
  }

  // honeypot: silently accept and drop
  if ((data.website || '').trim() !== '') {
    return done(200, { ok: true }, '/prayer.html?sent=1');
  }

  // timing check: bots post instantly
  const loadedAt = Number(data.loaded_at || 0);
  if (loadedAt && Date.now() - loadedAt < MIN_FILL_MS) {
    return done(200, { ok: true }, '/prayer.html?sent=1');
  }

  const message = (data.message || '').trim();
  if (!message) {
    return done(400, { ok: false, error: 'message required' }, '/prayer.html?sent=error');
  }

  if (env.TURNSTILE_SECRET) {
    const ok = await verifyTurnstile(
      env.TURNSTILE_SECRET,
      data['cf-turnstile-response'],
      request.headers.get('CF-Connecting-IP')
    );
    if (!ok) {
      return done(400, { ok: false, error: 'verification failed' }, '/prayer.html?sent=error');
    }
  }

  if (!env.WEB3FORMS_KEY) {
    return done(
      503,
      { ok: false, error: 'form not configured' },
      '/prayer.html?sent=error'
    );
  }

  const kind = data.kind === 'Praise Report' ? 'Praise Report' : 'Prayer Request';
  const payload = {
    access_key: env.WEB3FORMS_KEY,
    subject: `${kind} from lightofcambodia.org`,
    from_name: 'Light of Cambodia website',
    'Type': kind,
    'Name': (data.name || '').trim() || 'Anonymous',
    'Email or phone': (data.contact || '').trim() || 'Not provided',
    'Request': message,
    'May share with prayer team': data.share_team === 'yes' ? 'YES' : 'no',
    'May share publicly': data.share_public === 'yes' ? 'YES' : 'no',
  };

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  // Web3Forms answers 200 with {success:false} on a bad or missing key, so check the body too
  let delivered = res.ok;
  try {
    const result = await res.json();
    delivered = res.ok && result.success !== false;
  } catch {
    delivered = res.ok;
  }
  if (!delivered) {
    return done(502, { ok: false, error: 'delivery failed' }, '/prayer.html?sent=error');
  }

  return done(200, { ok: true }, '/prayer.html?sent=1');
}

export async function onRequest() {
  return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
}
