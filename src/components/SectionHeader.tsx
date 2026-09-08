export function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between px-6">
      <h2 className="text-[19px] font-bold tracking-[-0.01em]">{title}</h2>
      <button
        type="button"
        className="text-[15px] font-bold text-ink transition-opacity duration-200 active:opacity-60"
      >
        See All
      </button>
    </div>
  )
}
