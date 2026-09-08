export function SectionHeader({
  title,
  actionLabel = 'See All',
  onAction,
}: {
  title: string
  actionLabel?: string
  onAction?: () => void
}) {
  return (
    <div className="flex items-center justify-between px-6">
      <h2 className="text-[20px] font-bold tracking-[-0.02em]">{title}</h2>
      <button
        type="button"
        onClick={onAction}
        className="text-[15px] font-semibold text-ink transition-opacity duration-200 active:opacity-60"
      >
        {actionLabel}
      </button>
    </div>
  )
}
