import { useEffect, useRef } from 'react'
import { trackLead, trackSchedule } from '../lib/tracking'

// Cal.com-bokning inbäddad direkt på sidan. Skriptet laddas en gång; en lyckad
// bokning rapporteras som Lead + Schedule (kräver cookie-samtycke, se tracking.js).

const NAMESPACE = 'gratis-intromote'
const CAL_LINK = 'wilma-deleryd-v4t3g7/gratis-intromote'
const BRAND = '#004444'

let initialized = false
let lastBookingAt = 0

// Officiell Cal.com-loader, omskriven utan minifiering.
function loadCal() {
  if (window.Cal) return
  const queue = (api, args) => { api.q.push(args) }
  const Cal = function (...args) {
    if (!Cal.loaded) {
      Cal.ns = {}
      Cal.q = Cal.q || []
      const script = document.createElement('script')
      script.src = 'https://app.cal.com/embed/embed.js'
      document.head.appendChild(script)
      Cal.loaded = true
    }
    if (args[0] === 'init') {
      const api = function (...apiArgs) { queue(api, apiArgs) }
      const namespace = args[1]
      api.q = api.q || []
      if (typeof namespace === 'string') {
        Cal.ns[namespace] = Cal.ns[namespace] || api
        queue(Cal.ns[namespace], args)
        queue(Cal, ['initNamespace', namespace])
      } else {
        queue(Cal, args)
      }
      return
    }
    queue(Cal, args)
  }
  Cal.q = []
  window.Cal = Cal
}

function onBooked() {
  // bookingSuccessful och bookingSuccessfulV2 kan båda komma för samma bokning.
  const now = Date.now()
  if (now - lastBookingAt < 10000) return
  lastBookingAt = now
  trackLead('Annonsering – bokning')
  trackSchedule()
}

function init() {
  if (initialized) return
  loadCal()
  window.Cal('init', NAMESPACE, { origin: 'https://app.cal.com' })
  window.Cal.config = window.Cal.config || {}
  window.Cal.config.forwardQueryParams = true // UTM från annonsen följer med in i bokningen
  const cal = window.Cal.ns[NAMESPACE]
  cal('ui', {
    theme: 'light',
    hideEventTypeDetails: true,
    layout: 'month_view',
    cssVarsPerTheme: { light: { 'cal-brand': BRAND } },
  })
  cal('on', { action: 'bookingSuccessfulV2', callback: onBooked })
  cal('on', { action: 'bookingSuccessful', callback: onBooked })
  initialized = true
}

export default function CalBooking() {
  const ref = useRef(null)

  useEffect(() => {
    init()
    const el = ref.current
    // StrictMode kör effekten två gånger på samma element – montera bara en gång.
    if (!el || el.dataset.calMounted) return
    el.dataset.calMounted = 'true'
    window.Cal.ns[NAMESPACE]('inline', {
      elementOrSelector: el,
      calLink: CAL_LINK,
      config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
    })
  }, [])

  return <div ref={ref} style={{ width: '100%', minHeight: '560px' }} />
}
