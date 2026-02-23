import { ChevronRight, ChevronLeft } from 'lucide-react'
import type { Category } from '@/types'

interface Props {
  categories: Category[]
  selected: string[]
  onToggle: (id: string) => void
  onNext: () => void
  onBack: () => void
}

export function Step2Categories({ categories, selected, onToggle, onNext, onBack }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">想認領哪些類別？</h2>
        <p className="text-sm text-gray-500">可多選，接著選品項</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => {
          const isSelected = selected.includes(cat.id)
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onToggle(cat.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all min-h-[80px] ${
                isSelected
                  ? 'border-[#08BFA0] bg-[#08BFA0]/10 shadow-md'
                  : 'border-gray-200 bg-white hover:border-[#08BFA0]/40'
              }`}
            >
              <span className="text-2xl">{cat.icon ?? '📦'}</span>
              <span className={`text-sm font-medium ${isSelected ? 'text-[#08BFA0]' : 'text-gray-700'}`}>
                {cat.name}
              </span>
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
