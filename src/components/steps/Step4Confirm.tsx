import { ChevronLeft, Check, Loader2 } from 'lucide-react'
import type { Item } from '@/types'

interface Selection {
  item_id: string
  custom_note?: string
}

interface Props {
  userName: string
  selections: Selection[]
  items: Item[]
  onConfirm: () => void
  onBack: () => void
  isLoading: boolean
}

export function Step4Confirm({ userName, selections, items, onConfirm, onBack, isLoading }: Props) {
  const itemMap = new Map(items.map((i) => [i.id, i]))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">確認你的清單</h2>
        <p className="text-sm text-gray-500">
          <span className="font-medium text-[#08BFA0]">{userName}</span> 即將認領以下裝備
        </p>
      </div>

      <div className="space-y-2 bg-[#08BFA0]/5 rounded-2xl p-4">
        {selections.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">沒有選擇任何品項</p>
        ) : (
          selections.map((sel, i) => {
            const item = itemMap.get(sel.item_id)
            return (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-[#08BFA0]/10 last:border-0">
                <span className="text-[#08BFA0] text-lg mt-0.5">✓</span>
                <div>
                  <p className="text-sm font-medium text-gray-800">{item?.name ?? sel.item_id}</p>
                  {sel.custom_note && (
                    <p className="text-xs text-gray-500 mt-0.5">備註：{sel.custom_note}</p>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="flex-1 py-4 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl flex items-center justify-center gap-2 hover:border-gray-300 transition-colors min-h-[48px] disabled:opacity-40"
        >
          <ChevronLeft className="w-5 h-5" />
          修改
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading || selections.length === 0}
          className="flex-[2] py-4 bg-[#08BFA0] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#07aa8e] transition-colors min-h-[48px] shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              送出中…
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              確認送出
            </>
          )}
        </button>
      </div>
    </div>
  )
}
