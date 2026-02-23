import { BANNER_ITEMS } from '@/lib/constants'

export function Banner() {
  return (
    <div className="rounded-2xl border border-[#08BFA0]/30 bg-white/80 backdrop-blur-sm shadow-sm p-4 space-y-2">
      <h2 className="text-sm font-semibold text-[#08BFA0] uppercase tracking-wider mb-3">
        📋 活動公告
      </h2>
      {BANNER_ITEMS.map((item, i) => (
        <p key={i} className="text-sm text-gray-700 leading-relaxed">
          {item}
        </p>
      ))}
    </div>
  )
}
