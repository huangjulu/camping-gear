import { useMemo, useState } from 'react'
import type { Category, Item, Assignment } from '@/types'
import { Trash2 } from 'lucide-react'
import { useDeleteAssignment } from '@/hooks/useAssignments'

interface GearTableProps {
  categories: Category[]
  items: Item[]
  assignments: Assignment[]
  searchQuery: string
}

export function GearTable({ categories, items, assignments, searchQuery }: GearTableProps) {
  const [tooltip, setTooltip] = useState<{ id: string; note: string; x: number; y: number } | null>(null)
  const deleteAssignment = useDeleteAssignment()

  // Gather all unique user names dynamically
  const allNames = useMemo(() => {
    const names = new Set(assignments.map((a) => a.user_name))
    return Array.from(names).sort()
  }, [assignments])

  // Build lookup: item_id -> assignments
  const assignmentsByItem = useMemo(() => {
    const map = new Map<string, Assignment[]>()
    for (const a of assignments) {
      const list = map.get(a.item_id) ?? []
      list.push(a)
      map.set(a.item_id, list)
    }
    return map
  }, [assignments])

  // Items by category
  const itemsByCategory = useMemo(() => {
    const map = new Map<string, Item[]>()
    for (const item of items) {
      const list = map.get(item.category_id) ?? []
      list.push(item)
      map.set(item.category_id, list)
    }
    return map
  }, [items])

  const highlightName = searchQuery.trim().toLowerCase()

  if (allNames.length === 0 && assignments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 text-sm">
        還沒有人認領裝備，點「我要登記」開始分配！
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#08BFA0]/20 bg-white/80 backdrop-blur-sm shadow-sm scrollbar-thin">
      <table className="min-w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[#08BFA0]/10">
            <th className="sticky left-0 z-10 bg-[#08BFA0]/10 text-left px-4 py-3 font-semibold text-gray-700 min-w-[140px] border-b border-[#08BFA0]/20">
              品項
            </th>
            {allNames.map((name) => {
              const isHighlighted =
                highlightName && name.toLowerCase().includes(highlightName)
              return (
                <th
                  key={name}
                  className={`px-3 py-3 font-semibold min-w-[80px] border-b border-[#08BFA0]/20 transition-colors ${
                    isHighlighted
                      ? 'bg-[#08BFA0] text-white'
                      : 'text-gray-600'
                  }`}
                >
                  {name}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => {
            const catItems = itemsByCategory.get(cat.id) ?? []
            if (catItems.length === 0) return null
            return [
              // Category header row
              <tr key={`cat-${cat.id}`} className="bg-[#08BFA0]/5">
                <td
                  colSpan={allNames.length + 1}
                  className="sticky left-0 px-4 py-2 font-bold text-[#08BFA0] text-xs uppercase tracking-wider border-b border-[#08BFA0]/10"
                >
                  {cat.icon} {cat.name}
                </td>
              </tr>,
              // Item rows
              ...catItems.map((item) => {
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
                    {allNames.map((name) => {
                      const userAssignments = itemAssignments.filter(
                        (a) => a.user_name === name
                      )
                      const isHighlighted =
                        highlightName && name.toLowerCase().includes(highlightName)
                      return (
                        <td
                          key={name}
                          className={`px-3 py-3 text-center transition-colors ${
                            isHighlighted ? 'bg-[#08BFA0]/10' : ''
                          }`}
                        >
                          {userAssignments.map((a) => (
                            <div
                              key={a.id}
                              className="inline-flex items-center gap-1 group"
                            >
                              <span
                                className="text-[#08BFA0] cursor-pointer text-base relative"
                                onMouseEnter={(e) => {
                                  if (a.custom_note) {
                                    const rect = e.currentTarget.getBoundingClientRect()
                                    setTooltip({
                                      id: a.id,
                                      note: a.custom_note,
                                      x: rect.left,
                                      y: rect.top,
                                    })
                                  }
                                }}
                                onMouseLeave={() => setTooltip(null)}
                                title={a.custom_note ?? undefined}
                              >
                                ✓{a.custom_note ? '*' : ''}
                              </span>
                              <button
                                onClick={() => deleteAssignment.mutate(a.id)}
                                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-opacity"
                                title="取消認領"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
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

      {/* Floating tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 bg-gray-800 text-white text-xs rounded-lg px-3 py-2 shadow-lg pointer-events-none"
          style={{ top: tooltip.y - 40, left: tooltip.x }}
        >
          {tooltip.note}
        </div>
      )}
    </div>
  )
}
