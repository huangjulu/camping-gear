import { Search, X } from 'lucide-react'

interface SearchBoxProps {
  value: string
  onChange: (v: string) => void
}

export function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder="搜尋名字高亮欄位…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-[#08BFA0]/30 bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-[#08BFA0]/40 focus:border-[#08BFA0] transition-all"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
