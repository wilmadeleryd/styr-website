import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import ServicePage from './components/ServicePage'
import { servicePages } from './data/servicePages'
import { captureAttribution, trackPageView } from './lib/tracking'
import Home from './pages/Home'
import CaseMila from './pages/CaseMila'
import Contact from './pages/Contact'
import Tack from './pages/Tack'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const id = hash.slice(1)
    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
    // Small delay to let the page render before scrolling
    setTimeout(tryScroll, 80)
  }, [pathname, hash])
  return null
}

function RouteTracking() {
  const { pathname } = useLocation()
  useEffect(() => { captureAttribution() }, [])
  useEffect(() => { trackPageView() }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen font-body">
      <ScrollToTop />
      <RouteTracking />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case/mila" element={<CaseMila />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/tack" element={<Tack />} />
          {Object.values(servicePages).map(page => (
            <Route key={page.path} path={page.path} element={<ServicePage key={page.path} page={page} />} />
          ))}
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  )
}
