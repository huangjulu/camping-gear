import { useState } from 'react'
import { ChevronRight, ChevronLeft, Plus, X } from 'lucide-react'
import type { Category, Item, Assignment } from '@/types'

interface Selection {
  item_id: string
  custom_note?: string
}

interface Props {
  categories: Category[]
  items: Item[]
  assignments: Assignment[]
  selectedCategoryIds: string[]
  selections: Selection[]
  onSelectionsChange: (s: Selection[]) => void
  onNext: () => void
  onBack: () => void
  userName: string
}

export function Step3Items({
  categories,
  items,
  assignments,
  selectedCategoryIds,
  selections,
  onSelectionsChange,
  onNext,
  onBack,
  userName,
}: Props) {
  const [noteInputs, setNoteInputs] = useState<Record<string, string>>({})
  const [customItems, setCustomItems] = useState<string[]>([])
  const [customInput, setCustomInput] = useState('')

  const filteredCategories = categories.filter((c) => selectedCategoryIds.includes(c.id))
  const itemsByCategory = new Map<string, Item[]>()
  for (const item of items) {
    const list = itemsByCategory.get(item.category_id) ?? []
    list.push(item)
    itemsByCategory.set(item.category_id, list)
  }

  // Assignments count by item (excluding current user's existing)
  const assignmentCountByItem = new Map<string, number>()
  for (const a of assignments) {
    assignmentCountByItem.set(a.item_id, (assignmentCountByItem.get(a.item_id) ?? 0) + 1)
  }

  const isSelected = (itemId: string) => selections.some((s) => s.item_id === itemId)

  const toggleItem = (item: Item, note?: string) => {
    if (isSelected(item.id)) {
      onSelectionsChange(selections.filter((s) => s.item_id !== item.id))
    } else {
      // Check slot limit
      const count = assignmentCountByItem.get(item.id) ?? 0
      if (item.slot_limit !== null && count >= item.slot_limit) return
      onSelectionsChange([...selections, { item_id: item.id, custom_note: note }])
    }
  }

  const updateNote = (itemId: string, note: string) => {
    setNoteInputs((prev) => ({ ...prev, [itemId]: note }))
    onSelectionsChange(
      selections.map((s) => (s.item_id === itemId ? { ...s, custom_note: note } : s))
    )
  }

  const addCustomItem = () => {
    if (!customInput.trim()) return
    setCustomItems((prev) => [...prev, customInput.trim()])
    setCustomInput('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">選擇想認領的品項</h2>
        <p className="text-sm text-gray-500">
          <span className="font-medium text-[#08BFA0]">{userName}</span> 的認領清單
        </p>
      </div>

      <div className="space-y-5">
        {filteredCategories.map((cat) => {
          const catItems = itemsByCategory.get(cat.id) ?? []
          return (
            <div key={cat.id} className="space-y-2">
              <h3 className="text-sm font-bold text-[#08BFA0] flex items-center gap-1">
                {cat.icon} {cat.name}
              </h3>
              <div className="space-y-2">
                {catItems.map((item) => {
                  const count = assignmentCountByItem.get(item.id) ?? 0
                  const isFull = item.slot_limit !== null && count >= item.slot_limit
                  const sel = isSelected(item.id)

                  return (
                    <div
                      key={item.id}
                      className={`rounded-xl border-2 p-3 transition-all ${
                        isFull && !sel
                          ? 'border-gray-100 bg-gray-50 opacity-60'
                          : sel
                          ? 'border-[#08BFA0] bg-[#08BFA0]/5'
                          : 'border-gray-200 bg-white hover:border-[#08BFA0]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => toggleItem(item, noteInputs[item.id])}
                          disabled={isFull && !sel}
                          className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            sel
                              ? 'border-[#08BFA0] bg-[#08BFA0] text-white'
                              : isFull
                              ? 'border-gray-200 bg-gray-100'
                              : 'border-gray-300 hover:border-[#08BFA0]'
                          }`}
                        >
                          {sel && <span className="text-xs">✓</span>}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-sm font-medium ${isFull && !sel ? 'text-gray-400' : 'text-gray-800'}`}>
                              {item.name}
                            </span>
                            {item.note && (
                              <span className="text-xs text-gray-400">({item.note})</span>
                            )}
                            {isFull && !sel && (
                              <span className="text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-full font-medium">
                                已滿
                              </span>
                            )}
                          </div>

                          {/* Slot progress */}
                          {item.slot_limit !== null && (
                            <div className="mt-1.5 flex items-center gap-2">
                              <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all ${isFull ? 'bg-red-400' : 'bg-[#08BFA0]'}`}
                                  style={{ width: `${Math.min((count / item.slot_limit) * 100, 100)}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-400 flex-shrink-0">
                                {count}/{item.slot_limit}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Note input when selected */}
                      {sel && (
                        <div className="mt-2 ml-9">
                          <input
                            type="text"
                            placeholder="備註（選填，如：水果刀）"
                            value={noteInputs[item.id] ?? ''}
                            onChange={(e) => updateNote(item.id, e.target.value)}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-[#08BFA0] transition-all bg-white"
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* Custom items section */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-gray-500 flex items-center gap-1">
            📝 其他（自填）
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="想帶的其他東西…"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCustomItem()}
              className="flex-1 px-3 py-2 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-[#08BFA0] transition-all"
            />
            <button
              type="button"
              onClick={addCustomItem}
              className="px-3 py-2 bg-[#08BFA0]/10 text-[#08BFA0] rounded-xl hover:bg-[#08BFA0]/20 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          {customItems.map((ci, i) => (
            <div key={i} className="flex items-center gap-2 text-sm bg-[#08BFA0]/5 px-3 py-2 rounded-lg">
              <span className="flex-1 text-gray-700">✓ {ci}</span>
              <button
                type="button"
                onClick={() => setCustomItems((prev) => prev.filter((_, j) => j !== i))}
                className="text-gray-400 hover:text-red-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
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
          disabled={selections.length === 0}
          className="flex-[2] py-4 bg-[#08BFA0] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#07aa8e] transition-colors min-h-[48px] shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
        >
          確認清單
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
