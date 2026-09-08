import { useEffect, useId, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  defaultFilters,
  formatPrice,
  genderOptions,
  popularFilters,
  priceHistogram,
  priceSlider,
  ratingOptions,
  sortOptions,
  type ProductFilters,
} from '../data/catalog'
import { useShop } from '../store/shop'
import { StarIcon } from './Icons'

export function FilterSheet() {
  const { isFilterOpen } = useShop()

  return <AnimatePresence>{isFilterOpen && <FilterPanel />}</AnimatePresence>
}

function FilterPanel() {
  const { filters, applyFilters, closeFilter } = useShop()
  const [draft, setDraft] = useState<ProductFilters>(filters)
  const titleId = useId()

  useEffect(() => {
    setDraft(filters)
  }, [filters])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeFilter()
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [closeFilter])

  const setField = <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  return (
    <motion.div
      className="fixed inset-0 z-90 flex items-end justify-center bg-ink/35"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={closeFilter}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex max-h-[92dvh] w-full max-w-[430px] flex-col rounded-t-[36px] bg-white shadow-[0_-12px_40px_-10px_rgba(0,0,0,0.2)]"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 380, damping: 36 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col items-center pt-3">
          <span className="h-1 w-10 rounded-full bg-hairline" />
          <h2 id={titleId} className="mt-4 text-[22px] font-bold tracking-[-0.02em]">
            Sort & Filter
          </h2>
        </div>

        <div className="no-scrollbar mt-5 flex-1 space-y-7 overflow-y-auto px-6 pb-4">
          <ChipSection
            title="Categories"
            options={popularFilters}
            value={draft.category}
            onChange={(value) => setField('category', value)}
          />

          <ChipSection
            title="Gender"
            options={[...genderOptions]}
            value={draft.gender}
            onChange={(value) => setField('gender', value as ProductFilters['gender'])}
          />

          <PriceRangeSection
            min={draft.priceMin}
            max={draft.priceMax}
            onChange={(priceMin, priceMax) => setDraft((current) => ({ ...current, priceMin, priceMax }))}
          />

          <ChipSection
            title="Sort by"
            options={[...sortOptions]}
            value={draft.sortBy}
            onChange={(value) => setField('sortBy', value as ProductFilters['sortBy'])}
          />

          <RatingSection
            value={draft.rating}
            onChange={(value) => setField('rating', value)}
          />
        </div>

        <div className="flex gap-3 border-t border-hairline px-6 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={() => setDraft(defaultFilters)}
            className="flex-1 rounded-[28px] bg-surface py-4 text-[16px] font-bold text-ink transition-opacity duration-200 active:opacity-70"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => applyFilters(draft)}
            className="flex-1 rounded-[28px] bg-ink py-4 text-[16px] font-bold text-white shadow-[0_10px_24px_-8px_rgba(0,0,0,0.45)] transition-opacity duration-200 active:opacity-80"
          >
            Apply
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ChipSection({
  title,
  options,
  value,
  onChange,
}: {
  title: string
  options: string[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <section>
      <h3 className="text-[18px] font-bold tracking-[-0.01em]">{title}</h3>
      <div className="no-scrollbar mt-3.5 flex gap-3 overflow-x-auto pb-0.5">
        {options.map((option) => {
          const isActive = option === value

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-[14px] font-semibold transition-colors duration-200 ${
                isActive ? 'border-ink bg-ink text-white' : 'border-ink bg-white text-ink'
              }`}
            >
              {option}
            </button>
          )
        })}
      </div>
    </section>
  )
}

function RatingSection({
  value,
  onChange,
}: {
  value: ProductFilters['rating']
  onChange: (value: ProductFilters['rating']) => void
}) {
  return (
    <section>
      <h3 className="text-[18px] font-bold tracking-[-0.01em]">Rating</h3>
      <div className="no-scrollbar mt-3.5 flex gap-3 overflow-x-auto pb-0.5">
        {ratingOptions.map((option) => {
          const isActive = option === value

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-5 py-2.5 text-[14px] font-semibold transition-colors duration-200 ${
                isActive ? 'border-ink bg-ink text-white' : 'border-ink bg-white text-ink'
              }`}
            >
              <StarIcon className="h-3.5 w-3.5" />
              {option}
            </button>
          )
        })}
      </div>
    </section>
  )
}

function PriceRangeSection({
  min,
  max,
  onChange,
}: {
  min: number
  max: number
  onChange: (min: number, max: number) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const peak = Math.max(...priceHistogram, 1)
  const span = priceSlider.max - priceSlider.min

  const toPercent = (value: number) => ((value - priceSlider.min) / span) * 100

  const valueFromClientX = (clientX: number) => {
    const track = trackRef.current
    if (!track) return priceSlider.min
    const rect = track.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    const raw = priceSlider.min + ratio * span
    return Math.round(raw / priceSlider.step) * priceSlider.step
  }

  const drag = (which: 'min' | 'max', clientX: number) => {
    const next = valueFromClientX(clientX)
    if (which === 'min') onChange(Math.min(next, max - priceSlider.step), max)
    else onChange(min, Math.max(next, min + priceSlider.step))
  }

  const bindDrag = (which: 'min' | 'max') => (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const target = event.currentTarget
    target.setPointerCapture(event.pointerId)

    const onMove = (moveEvent: PointerEvent) => drag(which, moveEvent.clientX)
    const onUp = () => {
      target.releasePointerCapture(event.pointerId)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  return (
    <section>
      <h3 className="text-[18px] font-bold tracking-[-0.01em]">Price Range</h3>

      <div className="mt-5 flex h-12 items-end gap-0.5 px-1">
        {priceHistogram.map((count, index) => {
          const height = Math.max(4, (count / peak) * 100)
          const binStart = priceSlider.min + (span / priceHistogram.length) * index
          const binEnd = binStart + span / priceHistogram.length
          const inRange = binEnd > min && binStart < max

          return (
            <span
              key={index}
              className={`flex-1 rounded-t-[2px] transition-colors duration-200 ${
                inRange ? 'bg-ink/35' : 'bg-surface'
              }`}
              style={{ height: `${height}%` }}
            />
          )
        })}
      </div>

      <div ref={trackRef} className="relative mt-1 h-8">
        <div className="absolute top-1/2 right-0 left-0 h-[3px] -translate-y-1/2 rounded-full bg-hairline" />
        <div
          className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-ink"
          style={{ left: `${toPercent(min)}%`, right: `${100 - toPercent(max)}%` }}
        />

        <button
          type="button"
          aria-label={`Minimum price ${formatPrice(min)}`}
          onPointerDown={bindDrag('min')}
          className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-ink bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] touch-none"
          style={{ left: `${toPercent(min)}%` }}
        />
        <button
          type="button"
          aria-label={`Maximum price ${formatPrice(max)}`}
          onPointerDown={bindDrag('max')}
          className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-ink bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] touch-none"
          style={{ left: `${toPercent(max)}%` }}
        />
      </div>

      <div className="mt-1 flex justify-between text-[13px] font-semibold text-ink">
        <span>{formatPrice(min)}</span>
        <span>{formatPrice(max)}</span>
      </div>
    </section>
  )
}
