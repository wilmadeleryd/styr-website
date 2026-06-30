const BOT_PATTERN = /facebookexternalhit|LinkedInBot|Twitterbot|Slackbot|WhatsApp/i;
const BASE = 'https://styrmedia.se';

const META = {
  '/': {
    type: 'website',
    title: 'STYR | Digitala verktyg, hemsidor och marknadsföring',
    description:
      'STYR är små och medelstora företags högra hand när det kommer till digitala verktyg, hemsidor och marknadsföring. Smart, snabbt och skräddarsytt efter era behov.',
    image: `${BASE}/styr-og-image.jpg?v=2`,
    url: `${BASE}/`,
  },
  '/kontakt': {
    type: 'website',
    title: 'Kontakt | STYR',
    description: 'Hör av er så pratar vi om vad ni behöver. Vi skräddarsyr varje projekt efter er verksamhet.',
    image: `${BASE}/styr-og-image.jpg?v=2`,
    url: `${BASE}/kontakt`,
  },
  '/case/mila': {
    type: 'article',
    title: 'Mila Workspace | Case study | STYR',
    description:
      'Så byggde vi en hel community plattform åt Mila Workspace. Inloggning, bokningar, nyhetsbrev och medlemskatalog, allt på några veckor.',
    image: `${BASE}/mila-case.png`,
    url: `${BASE}/case/mila`,
  },
};

export const config = {
  matcher: ['/', '/kontakt', '/case/mila'],
};

export default async function middleware(request) {
  // Prevent infinite loop when this middleware fetches the base HTML
  if (request.headers.get('x-bot-prefetch')) return;

  const ua = request.headers.get('user-agent') || '';
  if (!BOT_PATTERN.test(ua)) return;

  const { pathname } = new URL(request.url);
  const meta = META[pathname] ?? META['/'];

  // Fetch the SPA shell (always index.html regardless of route)
  const res = await fetch(`${BASE}/`, { headers: { 'x-bot-prefetch': '1' } });
  if (!res.ok) return;

  const html = patchHtml(await res.text(), meta);

  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

function esc(s) {
  return String(s).replace(/"/g, '&quot;');
}

// Replace an existing <meta> tag or leave html unchanged if not found
function replaceMeta(html, attr, name, value) {
  const re = new RegExp(`<meta ${attr}="${name.replace(':', '\\:')}"[^>]*>`, 'i');
  const tag = `<meta ${attr}="${name}" content="${esc(value)}" />`;
  return html.replace(re, tag);
}

function patchHtml(html, { type, title, description, image, url }) {
  // Replace tags that already exist in the static index.html
  html = replaceMeta(html, 'property', 'og:type', type);
  html = replaceMeta(html, 'property', 'og:title', title);
  html = replaceMeta(html, 'property', 'og:description', description);
  html = replaceMeta(html, 'property', 'og:image', image);
  html = replaceMeta(html, 'property', 'og:url', url);

  // Inject tags that are only in Helmet (not in static HTML)
  const inject = [
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
  ].join('\n    ');

  return html.replace('</head>', `    ${inject}\n  </head>`);
}
