import { BatteryIcon, SignalIcon, WifiIcon } from './Icons'

export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pb-1 pt-3.5 text-ink">
      <span className="text-[15px] font-semibold tracking-[-0.01em] tabular-nums">9:41</span>
      <div className="flex items-center gap-1.5">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  )
}
