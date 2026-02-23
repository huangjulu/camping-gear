import { useMemo, useState, useRef, useEffect, useCallback } from 'react'
import type { Category, Item, Assignment } from '@/types'
import { Trash2, X, Plus } from 'lucide-react'

function PencilSolid({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
    </svg>
  )
}
import { useDeleteAssignment, useAddAssignments } from '@/hooks/useAssignments'

interface GearTableProps {
  categories: Category[]
  items: Item[]
  assignments: Assignment[]
  searchQuery: string
}

export function GearTable({ categories, items, assignments, searchQuery }: GearTableProps) {
  const [tooltip, setTooltip] = useState<{ id: string; note: string; x: number; y: number } | null>(null)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [editingUser, setEditingUser] = useState<string | null>(null)
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const deleteAssignment = useDeleteAssignment()
  const addAssignments = useAddAssignments()

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  const handleAddAssignment = (item: Item, userName: string) => {
    const count = (assignmentsByItem.get(item.id) ?? []).length
    if (item.slot_limit !== null && count >= item.slot_limit) {
      showToast('項目已經夠了喔~')
      return
    }
    addAssignments.mutate([{ item_id: item.id, user_name: userName }])
  }

  const allNames = useMemo(() => {
    const names = new Set(assignments.map((a) => a.user_name))
    return Array.from(names).sort()
  }, [assignments])

  const q = searchQuery.trim().toLowerCase()
  const displayedNames = useMemo(() => {
    if (!q) return allNames
    return allNames.filter((n) => n.toLowerCase().includes(q))
  }, [allNames, q])

  const assignmentsByItem = useMemo(() => {
    const map = new Map<string, Assignment[]>()
    for (const a of assignments) {
      const list = map.get(a.item_id) ?? []
      list.push(a)
      map.set(a.item_id, list)
    }
    return map
  }, [assignments])

  const itemsByCategory = useMemo(() => {
    const map = new Map<string, Item[]>()
    for (const item of items) {
      const list = map.get(item.category_id) ?? []
      list.push(item)
      map.set(item.category_id, list)
    }
    return map
  }, [items])

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
    setCanScrollLeft(el.scrollLeft > 4)
  }, [])

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [checkScroll, displayedNames])

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 120, behavior: 'smooth' })
  }

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -120, behavior: 'smooth' })
  }

  if (allNames.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 text-sm">
        還沒有人認領裝備，點「我要登記」開始分配！
      </div>
    )
  }

  if (q && displayedNames.length === 0) {
    return (
      <div className="rounded-2xl border border-[#08BFA0]/20 bg-white/80 backdrop-blur-sm shadow-sm px-6 py-10 text-center space-y-3">
        <p className="text-2xl">🔍</p>
        <p className="text-gray-500 font-medium">找不到「{searchQuery}」</p>
        <p className="text-gray-400 text-sm">尼要先建立窩 &gt;&lt;</p>
      </div>
    )
  }

  const isSearchMode = q && displayedNames.length > 0

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="overflow-x-auto overflow-y-hidden rounded-2xl border border-[#08BFA0]/20 bg-white/80 backdrop-blur-sm shadow-sm scrollbar-thin"
      >
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#08BFA0]/10">
              <th className="sticky left-0 z-10 bg-[#08BFA0]/10 text-left px-4 py-3 font-semibold text-gray-700 min-w-[140px] border-b border-[#08BFA0]/20">
                品項
              </th>
              {displayedNames.map((name) => {
                const isEditing = editingUser === name
                return (
                  <th
                    key={name}
                    className={`min-w-[96px] border-b border-[#08BFA0]/20 transition-colors ${
                      isEditing
                        ? 'bg-amber-50'
                        : isSearchMode
                        ? 'bg-[#08BFA0]'
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-between px-3 py-3 gap-2">
                      <span className={`font-semibold ${
                        isEditing ? 'text-amber-600' : isSearchMode ? 'text-white' : 'text-gray-600'
                      }`}>
                        {name}
                      </span>
                      <button
                        onClick={() => setEditingUser(isEditing ? null : name)}
                        title={isEditing ? '結束編輯' : '編輯認領'}
                        className={`flex-shrink-0 transition-all ${
                          isEditing
                            ? 'opacity-100 text-amber-500'
                            : 'opacity-40 hover:opacity-80 text-gray-400'
                        }`}
                      >
                        {isEditing
                          ? <X className="w-3 h-3" />
                          : <PencilSolid className="w-3 h-3" />
                        }
                      </button>
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => {
              const catItems = itemsByCategory.get(cat.id) ?? []
              const visibleItems = isSearchMode
                ? catItems.filter((item) =>
                    (assignmentsByItem.get(item.id) ?? []).some((a) =>
                      displayedNames.includes(a.user_name)
                    )
                  )
                : catItems
              if (visibleItems.length === 0) return null

              return [
                <tr key={`cat-${cat.id}`} className="bg-[#08BFA0]/5">
                  <td
                    colSpan={displayedNames.length + 1}
                    className="sticky left-0 px-4 py-2 font-bold text-[#08BFA0] text-xs uppercase tracking-wider border-b border-[#08BFA0]/10"
                  >
                    {cat.icon} {cat.name}
                  </td>
                </tr>,
                ...visibleItems.map((item) => {
                  const itemAssignments = assignmentsByItem.get(item.id) ?? []
                  return (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 hover:bg-[#08BFA0]/5 transition-colors"
                    >
                      <td className="sticky left-0 z-10 bg-white/95 backdrop-blur-sm px-4 py-3 text-gray-700 min-w-[140px]">
                        <div className="flex items-center gap-1">
                          <span>{item.name}</span>
                          {item.slot_limit !== null && (
                            <span className="text-xs text-gray-400">
                              ({itemAssignments.length}/{item.slot_limit})
                            </span>
                          )}
                        </div>
                        {item.note && (
                          <div className="text-xs text-gray-400 mt-0.5">{item.note}</div>
                        )}
                      </td>
                      {displayedNames.map((name) => {
                        const isEditing = editingUser === name
                        const userAssignments = itemAssignments.filter(
                          (a) => a.user_name === name
                        )
                        return (
                          <td
                            key={name}
                            className={`px-3 py-3 text-center transition-colors ${
                              isEditing
                                ? 'bg-amber-50/60'
                                : isSearchMode
                                ? 'bg-[#08BFA0]/5'
                                : ''
                            }`}
                          >
                            {userAssignments.map((a) => (
                              <div
                                key={a.id}
                                className="inline-flex items-center gap-1"
                              >
                                <span
                                  className="text-[#08BFA0] text-base"
                                  onMouseEnter={(e) => {
                                    if (a.custom_note) {
                                      const rect = e.currentTarget.getBoundingClientRect()
                                      setTooltip({ id: a.id, note: a.custom_note, x: rect.left, y: rect.top })
                                    }
                                  }}
                                  onMouseLeave={() => setTooltip(null)}
                                  title={a.custom_note ?? undefined}
                                >
                                  ✓{a.custom_note ? '*' : ''}
                                </span>
                                {isEditing && (
                                  <button
                                    onClick={() => deleteAssignment.mutate(a.id)}
                                    className="text-red-400 hover:text-red-600 transition-colors ml-0.5"
                                    title="取消認領"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            ))}
                            {isEditing && userAssignments.length === 0 && item.id !== 'item-other' && (
                              <button
                                onClick={() => handleAddAssignment(item, name)}
                                className="text-gray-300 hover:text-[#08BFA0] transition-colors"
                                title="認領此品項"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  )
                }),
              ]
            })}
          </tbody>
        </table>

        {tooltip && (
          <div
            className="fixed z-50 bg-gray-800 text-white text-xs rounded-lg px-3 py-2 shadow-lg pointer-events-none"
            style={{ top: tooltip.y - 40, left: tooltip.x }}
          >
            {tooltip.note}
          </div>
        )}
      </div>

      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-2 w-9 h-9 rounded-full bg-[#08BFA0] text-white shadow-lg flex items-center justify-center z-20 text-base font-bold hover:bg-[#07aa8e] transition-colors"
          aria-label="捲動查看左側"
        >
          ‹
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-2 top-2 w-9 h-9 rounded-full bg-[#08BFA0] text-white shadow-lg flex items-center justify-center z-20 text-base font-bold hover:bg-[#07aa8e] transition-colors"
          aria-label="捲動查看更多"
        >
          ›
        </button>
      )}

      {toastMsg && (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg pointer-events-none">
          {toastMsg}
        </div>
      )}
    </div>
  )
}
