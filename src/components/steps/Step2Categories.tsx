import { useMemo, useState, useRef, useEffect } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import type { Category, Item, Assignment } from '@/types'

interface CustomCategory {
  id: string
  name: string
}

interface Props {
  categories: Category[]
  items: Item[]
  assignments: Assignment[]
  selected: string[]
  customCategories: CustomCategory[]
  onToggle: (id: string) => void
  onAddCustomCategory: (name: string) => void
  onNext: () => void
  onBack: () => void
}

export function Step2Categories({
  categories,
  items,
  assignments,
  selected,
  customCategories,
  onToggle,
  onAddCustomCategory,
  onNext,
  onBack,
}: Props) {
  const [adding, setAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (adding) inputRef.current?.focus()
  }, [adding])

  const regularCategories = categories.filter((c) => c.id !== 'cat-other')

  const quotaByCategory = useMemo(() => {
    const map = new Map<string, { used: number; total: number }>()
    for (const cat of regularCategories) {
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
  }, [regularCategories, items, assignments])

  const handleConfirm = () => {
    const name = newName.trim()
    if (!name) return
    onAddCustomCategory(name)
    setNewName('')
    setAdding(false)
  }

  const handleCancel = () => {
    setNewName('')
    setAdding(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">想認領哪些類別？</h2>
        <p className="text-sm text-gray-500">可多選，接著選品項</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* DB categories (excluding cat-other) */}
        {regularCategories.map((cat) => {
          const isSelected = selected.includes(cat.id)
          const quota = quotaByCategory.get(cat.id)
          const isFull = quota ? quota.used >= quota.total : false

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => (isFull && !isSelected ? undefined : onToggle(cat.id))}
              disabled={isFull && !isSelected}
              className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl border-2 transition-all min-h-[88px] ${
                isFull && !isSelected
                  ? 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                  : isSelected
                  ? 'border-[#08BFA0] bg-[#08BFA0]/10 shadow-md'
                  : 'border-gray-200 bg-white hover:border-[#08BFA0]/40'
              }`}
            >
              <span className="text-2xl">{cat.icon ?? '📦'}</span>
              <span className={`text-sm font-medium ${isSelected ? 'text-[#08BFA0]' : 'text-gray-700'}`}>
                {cat.name}
              </span>
              {quota && (
                <span className={`text-xs font-medium ${isFull ? 'text-red-400' : 'text-gray-400'}`}>
                  {quota.used}/{quota.total}
                </span>
              )}
            </button>
          )
        })}

        {/* User-created custom categories */}
        {customCategories.map((cat) => {
          const isSelected = selected.includes(cat.id)
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
              <span className="text-2xl">✏️</span>
              <span className={`text-sm font-medium text-center leading-snug ${isSelected ? 'text-[#08BFA0]' : 'text-gray-700'}`}>
                {cat.name}
              </span>
            </button>
          )
        })}

        {/* "+" add new custom category card */}
        {adding ? (
          <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 border-[#08BFA0] bg-[#08BFA0]/5 min-h-[88px]">
            <input
              ref={inputRef}
              type="text"
              placeholder="類別名稱"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleConfirm()
                if (e.key === 'Escape') handleCancel()
              }}
              className="w-full text-center text-sm border-b border-[#08BFA0]/60 bg-transparent outline-none pb-0.5 placeholder-gray-400"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleConfirm}
                className="text-xs text-white bg-[#08BFA0] px-2.5 py-1 rounded-lg font-medium"
              >
                確認
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="flex flex-col items-center justify-center gap-1.5 p-4 rounded-2xl border-2 border-dashed border-gray-300 bg-white hover:border-[#08BFA0]/50 hover:bg-[#08BFA0]/5 transition-all min-h-[88px]"
          >
            <span className="text-2xl">➕</span>
            <span className="text-sm font-medium text-gray-400">新增類別</span>
          </button>
        )}
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
