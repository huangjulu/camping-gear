import { useForm } from 'react-hook-form'
import { KNOWN_MEMBERS } from '@/lib/constants'
import { ChevronRight } from 'lucide-react'

interface Props {
  initialName: string
  onNext: (name: string) => void
}

export function Step1Name({ initialName, onNext }: Props) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<{ name: string }>({
    defaultValues: { name: initialName },
  })

  const nameValue = watch('name')

  const onSubmit = ({ name }: { name: string }) => {
    onNext(name.trim())
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">你叫什麼名字？</h2>
        <p className="text-sm text-gray-500">選擇或輸入你的名字</p>
      </div>

      {/* Quick pick */}
      <div>
        <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">快速選擇</p>
        <div className="flex flex-wrap gap-2">
          {KNOWN_MEMBERS.map((member) => (
            <button
              key={member}
              type="button"
              onClick={() => setValue('name', member)}
              className={`px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all min-h-[48px] ${
                nameValue === member
                  ? 'border-[#08BFA0] bg-[#08BFA0] text-white shadow-md'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-[#08BFA0]/50'
              }`}
            >
              {member}
            </button>
          ))}
        </div>
      </div>

      {/* Custom input */}
      <div>
        <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">或手動輸入</p>
        <input
          {...register('name', { required: '請輸入名字' })}
          type="text"
          placeholder="你的名字…"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#08BFA0] transition-all text-sm bg-white"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-[#08BFA0] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#07aa8e] transition-colors min-h-[48px] shadow-md"
      >
        下一步
        <ChevronRight className="w-5 h-5" />
      </button>
    </form>
  )
}
