import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Assignment } from '@/types'

export function useAssignments() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['assignments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .order('created_at')
      if (error) throw error
      return data as Assignment[]
    },
  })

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('assignments-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'assignments' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['assignments'] })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [queryClient])

  return query
}

export function useAddAssignments() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (
      items: { item_id: string; user_name: string; custom_note?: string }[]
    ) => {
      const { data, error } = await supabase
        .from('assignments')
        .insert(items)
        .select()
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] })
    },
  })
}

export function useDeleteAssignment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('assignments')
        .delete()
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] })
    },
  })
}
