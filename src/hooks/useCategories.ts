import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Category, Item } from '@/types'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order')
      if (error) throw error
      return data as Category[]
    },
  })
}

export function useItems() {
  return useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('sort_order')
      if (error) throw error
      return data as Item[]
    },
  })
}
