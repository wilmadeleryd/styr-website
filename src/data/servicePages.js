import {
  Layers, MousePointerClick, Package, PenTool, Search, Sparkles, Users, Workflow,
} from 'lucide-react'

// Innehåll för tjänstesidorna. Varje sida renderas av src/components/ServicePage.jsx.
// /annonsering har en egen landningssida: src/pages/AnnonseringLanding.jsx.
// `tjanst` måste matcha ett av valen i TJANSTER i src/components/ContactForm.jsx (annars blir inget val förvalt).

const omWilma =
  'Bakom STYR står Wilma Deleryd, med bakgrund från Handelshögskolan i Göteborg och erfarenhet av att arbeta med tillväxtbolag och entreprenörer.'

export const servicePages = {
  hemsidor: {
    path: '/hemsidor',
    tjanst: 'Hemsida',
    meta: {
      title: 'Hemsidor med SEO- och AI-optimering | STYR',
      description:
        'Mobilanpassade hemsidor som syns på Google och i AI-sök som ChatGPT, Claude och Gemini. Byggda för att ge fler förfrågningar.',
    },
    label: 'HEMSIDOR · SEO · AI-OPTIMERING',
    heading: 'Hemsidor som syns och som får kunder att höra av sig.',
    intro:
      'Vi bygger mobilanpassade hemsidor och landningssidor som ser bra ut och driver affärer. Varje sajt är SEO-optimerad för Google och AI-optimerad så att ni hittas även när kunder söker via ChatGPT, Claude, Gemini och Perplexity.',
    cta: 'Boka ett gratis möte',
    ctaNote: 'Kostnadsfritt och utan förpliktelser.',
    includesHeading: 'Det här hjälper vi er med.',
    includes: [
      {
        icon: PenTool,
        title: 'Design och struktur',
        body: 'En sajt som speglar ert varumärke och gör det enkelt för besökare att förstå vad ni gör och ta nästa steg.',
      },
      {
        icon: Search,
        title: 'SEO-optimering',
        body: 'Teknisk SEO, snabba laddtider och innehåll som är strukturerat så att Google förstår vad ni erbjuder och för vem.',
      },
      {
        icon: Sparkles,
        title: 'AI-optimering',
        body: 'Innehåll och strukturerad data som gör det lätt för AI-assistenter att hitta, förstå och rekommendera er.',
      },
      {
        icon: MousePointerClick,
        title: 'Formulär och flöden',
        body: 'Kontaktformulär, bokningsflöden och e-handel som fungerar, så att besök blir förfrågningar.',
      },
    ],
    stepsHeading: 'Så kommer vi igång.',
    steps: [
      { title: 'Samtal', body: 'Vi pratar om ert företag, era kunder och vad sajten ska åstadkomma.' },
      { title: 'Förslag och design', body: 'Ni får ett upplägg för struktur, innehåll och design att ta ställning till.' },
      { title: 'Bygge och lansering', body: 'Vi bygger, testar och lanserar sajten och ser till att den är redo att synas.' },
    ],
    whyHeading: 'En sajt byggd för att växa med er.',
    why: [
      omWilma,
      'Eftersom vi även arbetar med annonsering och digitala verktyg bygger vi sajter som är redo att ta emot trafik, mäta resultat och byggas vidare på.',
    ],
    showCase: false,
    formHeading: 'Boka ett gratis intromöte.',
    formIntro: 'Ett kostnadsfritt möte på 30 minuter där vi går igenom er hemsida och vad den behöver för att ge fler förfrågningar. Ingen förberedelse krävs från er sida.',
  },

  digitalaVerktyg: {
    path: '/digitala-verktyg',
    tjanst: 'Digitala verktyg',
    meta: {
      title: 'Digitala verktyg och plattformar | STYR',
      description:
        'Skräddarsydda plattformar, interna verktyg, kundportaler och AI-verktyg för små och medelstora företag. Snabbt och anpassat efter er verksamhet.',
    },
    label: 'PLATTFORMAR · VERKTYG · PRODUKTER',
    heading: 'Digitala verktyg byggda för just er verksamhet.',
    intro:
      'Vi bygger skräddarsydda plattformar, interna verktyg och digitala produkter. Det kan vara en kundportal, ett bokningssystem, ett AI-verktyg eller en produkt ni vill sälja vidare till era kunder.',
    cta: 'Boka ett gratis möte',
    ctaNote: 'Kostnadsfritt och utan förpliktelser.',
    includesHeading: 'Det här hjälper vi er med.',
    includes: [
      {
        icon: Layers,
        title: 'Interna verktyg',
        body: 'System som ersätter manuella rutiner, kalkylark och mejltrådar, så att ert team kan lägga tiden på rätt saker.',
      },
      {
        icon: Users,
        title: 'Kundportaler och plattformar',
        body: 'Inloggning, bokningar, medlemskap och community, samlat på ett ställe för era kunder eller medlemmar.',
      },
      {
        icon: Workflow,
        title: 'AI-verktyg och integrationer',
        body: 'Vi kopplar ihop era system och bygger in AI där det sparar tid, till exempel för att sammanfatta, sortera eller svara.',
      },
      {
        icon: Package,
        title: 'Digitala produkter',
        body: 'Har ni en idé om en digital tjänst att sälja vidare? Vi hjälper er från första version till lansering.',
      },
    ],
    stepsHeading: 'Så kommer vi igång.',
    steps: [
      { title: 'Samtal', body: 'Vi kartlägger problemet ni vill lösa och hur ni arbetar idag.' },
      { title: 'Förslag', body: 'Ni får ett konkret förslag på lösning, tidsplan och pris.' },
      { title: 'Bygge och lansering', body: 'Vi bygger i korta steg så att ni kan testa tidigt, och lanserar när allt fungerar som det ska.' },
    ],
    whyHeading: 'Snabbt, och utan en stor byrås prislapp.',
    why: [
      omWilma,
      'Vi bygger med moderna verktyg som gör att en första version kan vara klar på veckor i stället för månader, så att ni snabbt kan testa och bygga vidare.',
    ],
    showCase: true,
    formHeading: 'Boka ett gratis intromöte.',
    formIntro: 'Ett kostnadsfritt möte på 30 minuter där vi går igenom vad ni vill bygga och hur det kan lösas. Ingen förberedelse krävs från er sida.',
  },
}
