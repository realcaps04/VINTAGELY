import { SectionHeader } from './SectionHeader'

export function SpecialOffer() {
  return (
    <section className="mt-6">
      <SectionHeader title="Special Offers" />

      <div className="px-6 pt-4">
        <article className="relative overflow-hidden rounded-[26px] bg-linear-120 from-offer-500 via-offer-600 to-offer-700 shadow-[0_18px_34px_-16px_rgba(198,13,22,0.85)]">
          <img
            src="/images/app/offer-shoe.jpg"
            alt="Red running sneaker on special offer"
            className="offer-fade pointer-events-none absolute inset-y-0 right-0 h-full w-[62%] object-cover object-center"
          />

          <div className="relative max-w-[60%] px-6 py-7">
            <p className="text-[40px] font-extrabold leading-none tracking-[-0.02em] text-white">
              25%
            </p>
            <p className="mt-2.5 text-[17px] font-bold leading-tight text-white">
              Today&apos;s Special!
            </p>
            <p className="mt-2 text-[11.5px] font-medium leading-[1.5] text-white/85">
              Get discount for every order. only valid for today
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
