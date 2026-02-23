import { useMemo } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import type { Category, Item, Assignment } from '@/types'

interface Props {
  categories: Category[]
  items: Item[]
  assignments: Assignment[]
  selected: string[]
  onToggle: (id: string) => void
  onNext: () => void
  onBack: () => void
}

export function Step2Categories({ categories, items, assignments, selected, onToggle, onNext, onBack }: Props) {
  // 計算每個類別的認領額度（只計算有 slot_limit 的品項）
  const quotaByCategory = useMemo(() => {
    const map = new Map<string, { used: number; total: number }>()
    for (const cat of categories) {
      const limitedItems = items.filter((i) => i.category_id === cat.id && i.slot_limit !== null)
      if (limitedItems.length === 0) continue
      const total = limitedItems.reduce((sum, i) => sum + (i.slot_limit ?? 0), 0)
      const used = limitedItems.reduce(
        (sum, i) => sum + assignments.filter((a) => a.item_id === i.id).length,
        0
      )
      map.set(cat.id, { used, total })
    }
    return map
  }, [categories, items, assignments])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">想認領哪些類別？</h2>
        <p className="text-sm text-gray-500">可多選，接著選品項</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => {
          const isSelected = selected.includes(cat.id)
          const quota = quotaByCategory.get(cat.id)
          const isFull = quota ? quota.used >= quota.total : false

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onToggle(cat.id)}
              className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl border-2 transition-all min-h-[88px] ${
                isSelected
                  ? 'border-[#08BFA0] bg-[#08BFA0]/10 shadow-md'
                  : 'border-gray-200 bg-white hover:border-[#08BFA0]/40'
              }`}
            >
              <span className="text-2xl">{cat.icon ?? '📦'}</span>
              <span className={`text-sm font-medium ${isSelected ? 'text-[#08BFA0]' : 'text-gray-700'}`}>
                {cat.name}
              </span>
              {quota && (
                <span className={`text-xs font-medium ${
                  isFull ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {quota.used}/{quota.total}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-4 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl flex items-center justify-center gap-2 hover:border-gray-300 transition-colors min-h-[48px]"
        >
          <ChevronLeft className="w-5 h-5" />
          上一步
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={selected.length === 0}
          className="flex-[2] py-4 bg-[#08BFA0] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#07aa8e] transition-colors min-h-[48px] shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
        >
          下一步
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
