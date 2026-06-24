import { Helmet } from 'react-helmet-async'
import profilbild from '../assets/Profilbild-Wilma-Deleryd.png'

export default function About() {
  return (
    <>
      <Helmet>
        <title>Om STYR – Wilma Deleryd</title>
        <meta name="description" content="Jag driver STYR och jobbar med företag som behöver få saker byggda – digitalt, snabbt och på ett sätt som faktiskt fungerar i verksamheten." />
      </Helmet>

      <div className="bg-cream min-h-screen">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
          <p className="label mb-6">OM STYR</p>
          <h1 className="font-heading font-semibold text-5xl md:text-7xl text-brand-text leading-tight tracking-tight max-w-xl">
            Hej, jag är Wilma.
          </h1>
        </section>

        {/* Om mig */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div className="space-y-5">
              <p className="text-brand-text leading-relaxed font-body text-lg">
                Jag driver STYR och jobbar med företag som behöver få saker byggda – digitalt, snabbt och på ett sätt som faktiskt fungerar i verksamheten.
              </p>
              <p className="text-brand-muted leading-relaxed font-body">
                Bakgrunden är från Handelshögskolan i Göteborg och två år som konsult där jag skött allt från SEO och nyhetsbrev till att projektleda hela webbplatser. Längs vägen insåg jag att det jag gillar mest är när strategi och byggande möts – när man inte bara planerar utan faktiskt gör.
              </p>
            </div>
            <div className="w-full aspect-[3/4] overflow-hidden rounded-sm">
              <img
                src={profilbild}
                alt="Wilma Deleryd, grundare av STYR"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }}
              />
            </div>
          </div>
        </section>

        {/* Varför STYR */}
        <section className="bg-cream border-t border-gray-200 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="label mb-6">VARFÖR STYR</p>
            <p className="font-body text-lg md:text-xl text-brand-text leading-relaxed max-w-2xl">
              De flesta företag som behöver digital hjälp hamnar i ett av två läger: antingen anlitar de en stor byrå som tar lång tid och kostar mycket, eller försöker de lösa allt själva och hinner aldrig klart. STYR är något annat. Du får en person som förstår affären, kan marknadsföringen och bygger det tekniska.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
