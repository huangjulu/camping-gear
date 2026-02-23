import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'

interface SearchBoxProps {
  value: string
  onChange: (v: string) => void
}

export function SearchBox({ value, onChange }: SearchBoxProps) {
  const [draft, setDraft] = useState(value)

  // 外部清空時同步 draft
  useEffect(() => {
    if (value === '') setDraft('')
  }, [value])

  const commit = () => onChange(draft.trim())

  const clear = () => {
    setDraft('')
    onChange('')
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder="尼要找水嗎??"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && commit()}
        className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-[#08BFA0]/30 bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-[#08BFA0]/40 focus:border-[#08BFA0] transition-all"
      />
      {draft && (
        <button
          onClick={clear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
