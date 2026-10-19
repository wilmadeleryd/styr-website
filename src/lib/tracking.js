// Annonsspårning (Meta Pixel, Google-tagg, TikTok-pixel) och UTM-attribution.
//
// Inga skript från Meta, Google eller TikTok laddas förrän besökaren har godkänt
// cookies i CookieBanner. Id:n sätts som miljövariabler i Vercel (se .env.example);
// en pixel vars id saknas laddas aldrig.

const IDS = {
  meta: import.meta.env.VITE_META_PIXEL_ID,
  google: import.meta.env.VITE_GOOGLE_TAG_ID,
  googleAdsConversion: import.meta.env.VITE_GOOGLE_ADS_CONVERSION, // t.ex. AW-123456789/AbC-dEfGhIj
  tiktok: import.meta.env.VITE_TIKTOK_PIXEL_ID,
}

const CONSENT_KEY = 'styr_cookie_consent'
const ATTRIBUTION_KEY = 'styr_attribution'
const LEAD_PENDING_KEY = 'styr_lead_pending'
const ATTRIBUTION_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid', 'ttclid']

export const CONSENT_EVENT = 'styr:open-cookie-settings'

export const hasTrackers = () => Boolean(IDS.meta || IDS.google || IDS.tiktok)

// ─── Lagring (kan kasta i privata fönster – fel ignoreras) ───

function read(storage, key) {
  try { return window[storage].getItem(key) } catch { return null }
}

function write(storage, key, value) {
  try {
    if (value === null) window[storage].removeItem(key)
    else window[storage].setItem(key, value)
  } catch { /* lagring blockerad */ }
}

// ─── Samtycke ───

export const getConsent = () => read('localStorage', CONSENT_KEY) // 'granted' | 'denied' | null

export function setConsent(value) {
  const previous = getConsent()
  write('localStorage', CONSENT_KEY, value)
  if (value === 'granted') {
    trackPageView()
  } else if (previous === 'granted') {
    // Redan laddade skript går inte att ladda ur – en omladdning rensar dem.
    window.location.reload()
  }
}

// ─── Laddning av pixlar ───

let loaded = false

function addScript(src) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

function loadMeta(id) {
  const fbq = function (...args) {
    if (fbq.callMethod) fbq.callMethod(...args)
    else fbq.queue.push(args)
  }
  fbq.push = fbq
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.queue = []
  window.fbq = fbq
  window._fbq = fbq
  addScript('https://connect.facebook.net/en_US/fbevents.js')
  window.fbq('init', id)
}

function loadGoogle(id) {
  window.dataLayer = window.dataLayer || []
  window.gtag = function () { window.dataLayer.push(arguments) }
  addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`)
  window.gtag('js', new Date())
  window.gtag('config', id, { send_page_view: false })
  const adsId = IDS.googleAdsConversion?.split('/')[0]
  if (adsId && adsId !== id) window.gtag('config', adsId)
}

function loadTikTok(id) {
  // Officiell TikTok-snippet, omskriven utan minifiering.
  const ttq = (window.ttq = window.ttq || [])
  window.TiktokAnalyticsObject = 'ttq'
  ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie', 'holdConsent', 'revokeConsent', 'grantConsent']
  ttq.setAndDefer = (target, method) => {
    target[method] = (...args) => { target.push([method, ...args]) }
  }
  ttq.methods.forEach(m => ttq.setAndDefer(ttq, m))
  ttq.instance = (pixelId) => {
    const inst = ttq._i[pixelId] || []
    ttq.methods.forEach(m => ttq.setAndDefer(inst, m))
    return inst
  }
  ttq.load = (pixelId, options) => {
    const src = 'https://analytics.tiktok.com/i18n/pixel/events.js'
    ttq._i = ttq._i || {}
    ttq._i[pixelId] = []
    ttq._i[pixelId]._u = src
    ttq._t = ttq._t || {}
    ttq._t[pixelId] = +new Date()
    ttq._o = ttq._o || {}
    ttq._o[pixelId] = options || {}
    addScript(`${src}?sdkid=${encodeURIComponent(pixelId)}&lib=ttq`)
  }
  ttq.load(id)
}

// Laddar pixlarna en gång, och bara om besökaren har godkänt.
function ensureLoaded() {
  if (getConsent() !== 'granted' || !hasTrackers()) return false
  if (!loaded) {
    if (IDS.meta) loadMeta(IDS.meta)
    if (IDS.google) loadGoogle(IDS.google)
    if (IDS.tiktok) loadTikTok(IDS.tiktok)
    loaded = true
  }
  return true
}

// ─── Händelser ───

export function trackPageView() {
  if (!ensureLoaded()) return
  if (window.fbq) window.fbq('track', 'PageView')
  if (window.gtag) window.gtag('event', 'page_view', { page_location: window.location.href, page_path: window.location.pathname })
  if (window.ttq) window.ttq.page()
}

export function trackLead(tjanst) {
  if (!ensureLoaded()) return
  if (window.fbq) window.fbq('track', 'Lead', { content_category: tjanst })
  if (window.gtag) {
    window.gtag('event', 'generate_lead', { service: tjanst })
    if (IDS.googleAdsConversion) window.gtag('event', 'conversion', { send_to: IDS.googleAdsConversion })
  }
  if (window.ttq) window.ttq.track('SubmitForm', { content_category: tjanst })
}

// ─── Konvertering: formuläret markerar, tack-sidan rapporterar ───

export const markLeadPending = (tjanst) => write('sessionStorage', LEAD_PENDING_KEY, tjanst || 'Okänd')

export function consumeLeadPending() {
  const tjanst = read('sessionStorage', LEAD_PENDING_KEY)
  if (tjanst !== null) write('sessionStorage', LEAD_PENDING_KEY, null)
  return tjanst
}

// ─── UTM-attribution (skickas med i formuläret, delas inte med tredje part) ───

export function captureAttribution() {
  const params = new URLSearchParams(window.location.search)
  const found = {}
  ATTRIBUTION_PARAMS.forEach(key => {
    const value = params.get(key)
    if (value) found[key] = value.slice(0, 200)
  })
  if (Object.keys(found).length === 0) return
  found.landningssida = window.location.pathname
  write('sessionStorage', ATTRIBUTION_KEY, JSON.stringify(found))
}

export function getAttribution() {
  try { return JSON.parse(read('sessionStorage', ATTRIBUTION_KEY)) || null } catch { return null }
}
