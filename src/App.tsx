import { useState } from 'react'
import { X, Tent } from 'lucide-react'
import { useCategories, useItems } from '@/hooks/useCategories'
import { useAssignments, useAddAssignments } from '@/hooks/useAssignments'
import { ForestBackground } from '@/components/ForestBackground'
import { Banner } from '@/components/Banner'
import { SearchBox } from '@/components/SearchBox'
import { GearTable } from '@/components/GearTable'
import { Step1Name } from '@/components/steps/Step1Name'
import { Step2Categories } from '@/components/steps/Step2Categories'
import { Step3Items } from '@/components/steps/Step3Items'
import { Step4Confirm } from '@/components/steps/Step4Confirm'

type AppView = 'main' | 'form'

interface Selection {
  item_id: string
  custom_note?: string
}

export default function App() {
  const [view, setView] = useState<AppView>('main')
  const [step, setStep] = useState(1)
  const [userName, setUserName] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selections, setSelections] = useState<Selection[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const { data: categories = [] } = useCategories()
  const { data: items = [] } = useItems()
  const { data: assignments = [] } = useAssignments()
  const addAssignments = useAddAssignments()

  const openForm = () => {
    setStep(1)
    setSelectedCategories([])
    setSelections([])
    setView('form')
  }

  const closeForm = () => {
    setView('main')
    setSearchQuery('')   // Bug fix: 關閉表單時清除搜尋狀態
  }

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  const handleSubmit = async () => {
    if (selections.length === 0) return
    await addAssignments.mutateAsync(
      selections.map((s) => ({
        item_id: s.item_id,
        user_name: userName,
        custom_note: s.custom_note || undefined,
      }))
    )
    setSuccessMsg(`🎉 ${userName} 認領成功！`)
    setView('main')
    setTimeout(() => setSuccessMsg(''), 4000)
  }

  return (
    <div className="min-h-screen relative">
      {/* Forest background */}
      <ForestBackground />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-6 pb-48 space-y-5">
        {/* Header */}
        <div className="text-center space-y-1 pt-2">
          <div className="flex items-center justify-center gap-2">
            <Tent className="w-7 h-7 text-[#08BFA0]" />
            <h1 className="text-2xl font-black text-gray-800 tracking-tight">
              露營裝備認領
            </h1>
          </div>
          <p className="text-sm text-gray-500">5/30–5/31 · 大家一起分工 🌲</p>
        </div>

        {/* Success message */}
        {successMsg && (
          <div className="bg-[#08BFA0] text-white text-sm font-medium px-4 py-3 rounded-xl shadow-md text-center">
            {successMsg}
          </div>
        )}

        {/* Banner */}
        <Banner />

        {/* Search — 有資料才顯示 */}
        {assignments.length > 0 && (
          <SearchBox value={searchQuery} onChange={setSearchQuery} />
        )}

        {/* Table */}
        <GearTable
          categories={categories}
          items={items}
          assignments={assignments}
          searchQuery={searchQuery}
        />

        {/* Register button */}
        <div className="sticky bottom-6">
          <button
            onClick={openForm}
            className="w-full py-4 bg-[#08BFA0] text-white font-bold text-base rounded-2xl shadow-xl hover:bg-[#07aa8e] active:scale-95 transition-all min-h-[56px] flex items-center justify-center gap-2"
          >
            <Tent className="w-5 h-5" />
            我要登記裝備
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {view === 'form' && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeForm}
          />

          {/* Sheet */}
          <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">
            {/* Handle bar (mobile) */}
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-gray-200 rounded-full" />
            </div>

            {/* Header with step indicator */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`h-2 rounded-full transition-all ${
                      s === step
                        ? 'bg-[#08BFA0] w-6'
                        : s < step
                        ? 'bg-[#08BFA0]/40 w-2'
                        : 'bg-gray-200 w-2'
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-400 ml-1">步驟 {step}/4</span>
              </div>
              <button
                onClick={closeForm}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step content */}
            <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
              {step === 1 && (
                <Step1Name
                  initialName={userName}
                  onNext={(name) => {
                    setUserName(name)
                    setStep(2)
                  }}
                />
              )}
              {step === 2 && (
                <Step2Categories
                  categories={categories}
                  items={items}
                  assignments={assignments}
                  selected={selectedCategories}
                  onToggle={toggleCategory}
                  onNext={() => setStep(3)}
                  onBack={() => setStep(1)}
                />
              )}
              {step === 3 && (
                <Step3Items
                  categories={categories}
                  items={items}
                  assignments={assignments}
                  selectedCategoryIds={selectedCategories}
                  selections={selections}
                  onSelectionsChange={setSelections}
                  onNext={() => setStep(4)}
                  onBack={() => setStep(2)}
                  userName={userName}
                />
              )}
              {step === 4 && (
                <Step4Confirm
                  userName={userName}
                  selections={selections}
                  items={items}
                  onConfirm={handleSubmit}
                  onBack={() => setStep(3)}
                  isLoading={addAssignments.isPending}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
