import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function CaseList() {
  return (
    <>
      <Helmet>
        <title>Case – STYR</title>
        <meta name="description" content="Projekt som faktiskt blivit av. Se hur vi byggt digitala lösningar för riktiga kunder." />
      </Helmet>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-24">
        <p className="label mb-6">CASE</p>
        <h1 className="font-heading font-semibold text-5xl md:text-7xl text-brand-text leading-tight tracking-tight max-w-2xl">
          Projekt som faktiskt blivit av.
        </h1>
      </section>

      {/* Case lista */}
      <section className="max-w-6xl mx-auto px-6 pb-28">
        <div className="border-t border-gray-100 pt-12">
          {/* Image placeholder */}
          <div className="w-full aspect-video bg-teal-tint rounded-sm flex items-center justify-center mb-8">
            <span className="text-brand-muted text-sm font-body">[Mila screenshot]</span>
          </div>
          <p className="label mb-3">COMMUNITY-PLATTFORM</p>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-brand-text mb-4 leading-tight">
            Mila Workspace
          </h2>
          <p className="text-brand-muted leading-relaxed font-body max-w-xl mb-6">
            Ett coworking-space i Göteborg behövde en hel community-plattform för sina medlemmar – med inloggning, bokningar, nyhetsbrev och app-känsla på mobilen. På några veckor.
          </p>
          <Link
            to="/case/mila"
            className="text-teal-primary font-body hover:text-teal-deep transition-colors duration-150 cursor-pointer"
          >
            Läs caset →
          </Link>
        </div>
      </section>
    </>
  )
}
