import { Helmet } from 'react-helmet-async'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const deliverables = [
  'Inloggning med rollsystem med tre nivåer och olika åtkomst',
  'Rum- och skrivbordsbokningar i realtid',
  'Sökbar medlemskatalog med kompetensfiltrering, så medlemmar hittar varandra för samarbeten',
  'Flöde där medlemmar kan dela uppdateringar, jobbtips och frågor',
  'Tipsbank med samlade resurser och rekommendationer',
  'Eventkalender med anmälan, synkad med Luma',
  'Nyhetsbrev direkt från plattformen via Resend',
  'Push-notiser och PWA med app-känsla i mobilen',
  'Admin-panel där Sofia driver allt själv, utan teknisk hjälp',
]

const heading = { color: '#004444' }
const body = { color: '#3a3a3a' }
const muted = { color: '#555555' }
const divider = { borderTopColor: 'rgba(0,68,68,0.12)' }

export default function CaseMila() {
  const heroRef = useScrollAnimation()
  const bakgrundRef = useScrollAnimation()
  const byggdeRef = useScrollAnimation()
  const resultatRef = useScrollAnimation()

  return (
    <>
      <Helmet>
        <title>Mila Workspace | Case study | STYR</title>
        <meta name="description" content="Så byggde vi en hel community plattform åt Mila Workspace. Inloggning, bokningar, nyhetsbrev och medlemskatalog, allt på några veckor." />
        <link rel="canonical" href="https://styrmedia.se/case/mila" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Mila Workspace | Case study | STYR" />
        <meta property="og:description" content="Så byggde vi en hel community plattform åt Mila Workspace. Inloggning, bokningar, nyhetsbrev och medlemskatalog, allt på några veckor." />
        <meta property="og:url" content="https://styrmedia.se/case/mila" />
        <meta property="og:image" content="https://styrmedia.se/styr-og-image.png?v=2" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mila Workspace | Case study | STYR" />
        <meta name="twitter:description" content="Så byggde vi en hel community plattform åt Mila Workspace. Inloggning, bokningar, nyhetsbrev och medlemskatalog, allt på några veckor." />
        <meta name="twitter:image" content="https://styrmedia.se/styr-og-image.png?v=2" />
      </Helmet>

      <div style={{ background: '#f5f0e8', minHeight: '100vh' }}>

        {/* Hero */}
        <section ref={heroRef} className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="label mb-6 animate" style={{ color: '#006666' }}>CASE – COMMUNITY-PLATTFORM</p>
          <h1 className="font-heading font-semibold text-5xl md:text-7xl leading-tight tracking-tight mb-4 max-w-3xl animate-heading" style={{ ...heading, transitionDelay: '0.1s' }}>
            Mila Workspace
          </h1>
          <p className="font-heading text-2xl md:text-3xl font-normal mb-8 max-w-2xl leading-snug animate-fade" style={{ color: '#555555', transitionDelay: '0.2s' }}>
            Från idé till en levande community, på några veckor.
          </p>
          <p className="text-sm font-body animate-fade" style={{ ...muted, transitionDelay: '0.3s' }}>
            Kund: Mila Workspace · Göteborg · Stack: Lovable, Supabase, Resend, OneSignal
          </p>
        </section>

        {/* Bakgrunden */}
        <section ref={bakgrundRef} className="max-w-6xl mx-auto px-6 py-12 border-t" style={divider}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
            <h2 className="font-heading text-2xl font-semibold animate-heading" style={heading}>Bakgrunden</h2>
            <div className="space-y-5 leading-relaxed font-body animate-fade" style={{ ...body, transitionDelay: '0.15s' }}>
              <p>
                Mila Workspace är ett coworking-space i Göteborg för kvinnliga entreprenörer. Sofia, grundaren, hade byggt en fysisk plats där medlemmarna trivdes och växte. Men allt som inte var fysiskt rum hanterades manuellt. Bokningar via meddelanden, event i separata kalendrar, medlemsinfo utspridd över olika kanaler.
              </p>
              <p>
                Hon ville ha en digital hub, en plats där medlemmarna kunde boka rum, hitta varandra och dela tips utan att Sofia behövde sköta allt för hand. Budgeten för en traditionell byrå fanns inte, och tiden att vänta i månader på en lösning fanns inte heller.
              </p>
            </div>
          </div>
        </section>

        {/* Vad vi byggde */}
        <section ref={byggdeRef} className="max-w-6xl mx-auto px-6 py-12 border-t" style={divider}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
            <h2 className="font-heading text-2xl font-semibold animate-heading" style={heading}>Vad vi byggde</h2>
            <div>
              <div className="w-full aspect-[16/9] rounded-sm overflow-hidden mb-8 animate-scale" style={{ transitionDelay: '0.1s' }}>
                <img
                  src="/mila-case.png"
                  alt="Mila Workspace – community-plattform"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <p className="leading-relaxed font-body mb-6 animate-fade" style={{ ...body, transitionDelay: '0.2s' }}>
                En skräddarsydd plattform som blev navet för hela verksamheten, med allt från praktiska bokningar till community och utbyte mellan medlemmarna.
              </p>
              <ul className="space-y-3 animate-fade" style={{ transitionDelay: '0.3s' }}>
                {deliverables.map((item) => (
                  <li key={item} className="flex gap-3 font-body leading-relaxed" style={body}>
                    <span className="shrink-0 mt-0.5" style={{ color: '#006666' }}>·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Resultatet */}
        <section ref={resultatRef} className="max-w-6xl mx-auto px-6 py-12 border-t" style={divider}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
            <h2 className="font-heading text-2xl font-semibold animate-heading" style={heading}>Resultatet</h2>
            <div className="space-y-5 animate-fade" style={{ transitionDelay: '0.15s' }}>
              <p className="leading-relaxed font-body" style={body}>
                Plattformen lanserades och används av riktiga medlemmar från dag ett. Det som tidigare krävde meddelanden fram och tillbaka, separata kalendrar och manuell uppföljning sköts nu på en plats. Sofia driver hela verksamheten själv och har en grund att bygga vidare på när Mila växer.
              </p>
              <a
                href="https://milaworkspace.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body inline-block"
                style={{ color: '#006666', transition: 'opacity 0.15s ease' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.7' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                Besök milaworkspace.com →
              </a>
            </div>
          </div>
        </section>

        <div className="pb-24" />
      </div>
    </>
  )
}
