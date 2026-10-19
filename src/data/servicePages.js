import {
  Bot, ChartLine, Clapperboard, LayoutTemplate, MousePointerClick, Package,
  Search, SlidersHorizontal, Sparkles, Target, Users, Wrench,
} from 'lucide-react'

// Innehåll för tjänstesidorna. Varje sida renderas av src/components/ServicePage.jsx.
// `tjanst` måste matcha ett av valen i TJANSTER i src/components/ContactForm.jsx (annars blir inget val förvalt).

const omWilma =
  'Bakom STYR står Wilma Deleryd, med bakgrund från Handelshögskolan i Göteborg och erfarenhet av att arbeta med tillväxtbolag och entreprenörer.'

export const servicePages = {
  annonsering: {
    path: '/annonsering',
    tjanst: 'Annonsering',
    meta: {
      title: 'Annonsering på Google, Meta och TikTok | STYR',
      description:
        'Annonser som ger kunder, inte bara klick. Vi bygger och driver annonser på Google, Meta och TikTok åt små och medelstora företag. Boka ett kostnadsfritt samtal.',
    },
    label: 'ANNONSERING PÅ GOOGLE, META OCH TIKTOK',
    heading: 'Annonser som ger kunder. Inte bara klick.',
    intro:
      'Vi bygger och driver annonser på Google, Meta och TikTok åt små och medelstora företag. Med en plan som utgår från er affär, annonser som stoppar tummen och siffror ni faktiskt förstår.',
    cta: 'Boka ett kostnadsfritt samtal',
    ctaNote: 'Kostnadsfritt. Inga förpliktelser. Ärliga råd.',

    problemsHeading: 'Annonserar ni redan, men vet inte riktigt vad det ger?',
    problems: [
      'Vi har boostat några inlägg, men vet inte vad det gav.',
      'Annonskontot sköts när någon hinner. Alltså sällan.',
      'Vi får klick, men telefonen ringer inte.',
      'Vi borde nog synas på TikTok. Men var börjar man?',
    ],
    problemsAnswer: 'Ni är inte ensamma. Och det går att göra bättre, utan att det blir krångligt.',

    includesHeading: 'Allt från strategi till siffror.',
    includesIntro: 'AI finns med i varje steg. Det gör oss snabbare och annonserna vassare. Strategin och omdömet står fortfarande en människa för.',
    includes: [
      {
        icon: Target,
        title: 'Strategi som börjar i affären',
        body: 'Innan vi lägger en krona tar vi reda på vem ni vill nå, vad en ny kund är värd för er och vilka kanaler som passar. Sedan gör vi en plan.',
        ai: 'marknads- och konkurrentanalys på timmar i stället för veckor.',
      },
      {
        icon: Clapperboard,
        title: 'Annonser som hör hemma i flödet',
        body: 'Text, bild och video gjorda för varje kanal. Sökannonser som svarar på det folk faktiskt googlar, och Reels och TikToks som inte ser ut som reklam.',
        ai: 'fler varianter att testa, så att vinnarna hittas snabbare.',
      },
      {
        icon: ChartLine,
        title: 'Spårning som visar sanningen',
        body: 'Vi sätter upp konverteringsspårning från start. Då ser ni vilka annonser som ger förfrågningar och försäljning, inte bara visningar och likes.',
        ai: 'mönster i datan som är svåra att se med blotta ögat.',
      },
      {
        icon: SlidersHorizontal,
        title: 'Optimering som inte står still',
        body: 'Vi följer upp löpande, flyttar pengar till det som fungerar och stänger av det som inte gör det. Ni får rapporter på vanlig svenska.',
        ai: 'rapporter som förklarar vad som hänt och vad vi gör härnäst.',
      },
    ],

    stepsHeading: 'Så kommer vi igång.',
    steps: [
      { title: 'Ett första samtal', body: 'Vi pratar om era mål, er budget och vad ni har testat hittills. Ni får ärliga råd, även om svaret är att annonser inte är rätt för er just nu.' },
      { title: 'En tydlig plan', body: 'Ni får ett konkret förslag på kanaler, upplägg och budget. Inget är bindande förrän ni säger ja.' },
      { title: 'Lansering och uppföljning', body: 'Vi bygger kampanjerna och lanserar. Det som fungerar får mer budget, resten stänger vi av.' },
    ],

    whyHeading: 'Annonsen är bara halva jobbet.',
    why: [
      'Den andra halvan är sidan den leder till. Eftersom vi även bygger hemsidor och landningssidor tar vi ansvar för hela vägen, från första klick till förfrågan i er inkorg.',
      'Bakom STYR står Wilma Deleryd, med bakgrund från Handelshögskolan i Göteborg och erfarenhet av tillväxtbolag och entreprenörer. Ni får en person som förstår er affär, inte ett säljteam och en ny kontaktperson varje kvartal.',
    ],
    showCase: false,

    faq: [
      {
        q: 'Vad kostar det?',
        a: 'Det beror på hur många kanaler ni vill synas i och hur mycket annonsmaterial som behövs. Efter första samtalet får ni ett förslag med tydligt pris, innan något sätts igång.',
      },
      {
        q: 'Hur stor annonsbudget behöver vi?',
        a: 'Det finns ingen magisk siffra. Vi hjälper er att hitta en nivå där ni hinner se vad som fungerar, utan att chansa med pengar ni inte vill förlora.',
      },
      {
        q: 'Vilken kanal passar oss?',
        a: 'Google passar när folk redan söker efter det ni erbjuder. Meta och TikTok passar när ni vill väcka intresse hos dem som ännu inte vet att de behöver er. Ofta är svaret en kombination, och det reder vi ut tillsammans.',
      },
      {
        q: 'Hur snabbt ser vi resultat?',
        a: 'Sökannonser på Google kan ge förfrågningar redan de första veckorna. På Meta och TikTok behöver annonserna oftast lite tid för att lära sig vem som ska se dem. Vi är tydliga med vad ni kan förvänta er, från start.',
      },
      {
        q: 'Vi har redan annonser igång. Kan ni ta över?',
        a: 'Absolut. Vi börjar med att gå igenom det ni har, behåller det som fungerar och rättar till resten.',
      },
    ],

    formHeading: 'Boka ett kostnadsfritt samtal.',
    formIntro: 'Berätta kort om ert företag och vad ni vill uppnå. Vi hör av oss och bokar en tid som passar er.',
  },

  hemsidor: {
    path: '/hemsidor',
    tjanst: 'Hemsida',
    meta: {
      title: 'Hemsidor med SEO- och AI-optimering | STYR',
      description:
        'Mobilanpassade hemsidor som syns på Google och i AI-sök som ChatGPT, Claude och Gemini. Byggda för att ge fler förfrågningar.',
    },
    label: 'HEMSIDOR · SEO · AI-OPTIMERING',
    heading: 'Hemsidor som syns, och som får folk att höra av sig.',
    intro:
      'Vi bygger mobilanpassade hemsidor och landningssidor som ser bra ut och driver affärer. Varje sajt är SEO-optimerad för Google och AI-optimerad så att ni hittas även när kunder söker via ChatGPT, Claude, Gemini och Perplexity.',
    cta: 'Boka ett kostnadsfritt samtal',
    ctaNote: 'Kostnadsfritt och utan förpliktelser.',
    includesHeading: 'Det här hjälper vi er med.',
    includes: [
      {
        icon: LayoutTemplate,
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
    showCase: true,
    formHeading: 'Berätta om er hemsida.',
    formIntro: 'Oavsett om ni behöver en ny sajt eller vill förbättra den ni har, så hör jag av mig.',
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
    cta: 'Boka ett kostnadsfritt samtal',
    ctaNote: 'Kostnadsfritt och utan förpliktelser.',
    includesHeading: 'Det här hjälper vi er med.',
    includes: [
      {
        icon: Wrench,
        title: 'Interna verktyg',
        body: 'System som ersätter manuella rutiner, kalkylark och mejltrådar, så att ert team kan lägga tiden på rätt saker.',
      },
      {
        icon: Users,
        title: 'Kundportaler och plattformar',
        body: 'Inloggning, bokningar, medlemskap och community, samlat på ett ställe för era kunder eller medlemmar.',
      },
      {
        icon: Bot,
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
    formHeading: 'Berätta vad ni vill bygga.',
    formIntro: 'Beskriv kort problemet eller idén, så hör jag av mig.',
  },
}
