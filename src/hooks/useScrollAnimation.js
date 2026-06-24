import { useEffect, useRef } from 'react'

const SELECTORS = [
  '.animate',
  '.animate-heading',
  '.animate-fade',
  '.animate-scale',
  '.animate-stagger',
].join(', ')

export function useScrollAnimation(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const found = container.querySelectorAll(SELECTORS)
    const targets = found.length > 0 ? Array.from(found) : [container]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          } else {
            entry.target.classList.remove('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px', ...options }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return ref
}
