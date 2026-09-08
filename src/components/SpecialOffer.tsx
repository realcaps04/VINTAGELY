import { useCallback, useEffect, useRef, useState } from 'react'
import { offers } from '../data/catalog'
import { SectionHeader } from './SectionHeader'

const AUTOPLAY_MS = 4200

// The first offer is repeated at the end of the track. Autoplay always moves
// forwards into that clone, then silently resets to the real first slide once
// the scroll settles — so the loop never visually rewinds.
const slides = [...offers, offers[0]]

export function SpecialOffer() {
  const trackRef = useRef<HTMLDivElement>(null)
  const settleTimer = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const scrollToSlide = useCallback((index: number) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' })
  }, [])

  // Autoplay reads the live scroll position instead of state, so the timer
  // stays correct even when the user swipes between ticks.
  useEffect(() => {
    if (isPaused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timer = window.setInterval(() => {
      const track = trackRef.current
      if (!track || document.visibilityState !== 'visible') return
      const current = Math.round(track.scrollLeft / track.clientWidth)
      const next = current >= offers.length ? 1 : current + 1
      track.scrollTo({ left: next * track.clientWidth, behavior: 'smooth' })
    }, AUTOPLAY_MS)

    return () => window.clearInterval(timer)
  }, [isPaused])

  useEffect(() => () => window.clearTimeout(settleTimer.current), [])

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return

    const width = track.clientWidth
    setActiveIndex(Math.round(track.scrollLeft / width) % offers.length)

    window.clearTimeout(settleTimer.current)
    settleTimer.current = window.setTimeout(() => {
      if (Math.round(track.scrollLeft / width) !== offers.length) return
      // Snapping is briefly disabled so the instant jump can't be intercepted.
      track.style.scrollSnapType = 'none'
      track.scrollLeft = 0
      track.style.scrollSnapType = ''
    }, 140)
  }

  return (
    <section className="mt-6">
      <SectionHeader title="Special Offers" />

      <div
        className="pt-4"
        onPointerEnter={() => setIsPaused(true)}
        onPointerLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
        >
          {slides.map((offer, index) => (
            <div
              key={`${offer.id}-${index}`}
              aria-hidden={index === offers.length}
              className="w-full shrink-0 snap-start px-6"
            >
              <article
                className="relative aspect-16/9 overflow-hidden rounded-[26px]"
                style={{ boxShadow: `0 18px 34px -18px ${offer.glow}` }}
              >
                <img
                  src={offer.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="relative flex h-full max-w-[58%] flex-col justify-center px-6">
                  <p className="text-[42px] font-extrabold leading-none tracking-[-0.03em] text-white">
                    {offer.headline}
                  </p>
                  <p className="mt-2.5 text-[17px] font-bold leading-tight tracking-[-0.01em] text-white">
                    {offer.title}
                  </p>
                  <p className="mt-2 text-[12.5px] font-medium leading-[1.5] text-white/85">
                    {offer.body}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className="mt-3.5 flex items-center justify-center gap-1.5">
          {offers.map((offer, index) => {
            const isActive = index === activeIndex

            return (
              <button
                key={offer.id}
                type="button"
                onClick={() => scrollToSlide(index)}
                aria-label={`Go to offer ${index + 1}`}
                aria-current={isActive ? 'true' : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive ? 'w-5 bg-ink' : 'w-1.5 bg-ink/20'
                }`}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
