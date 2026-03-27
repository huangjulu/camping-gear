import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createElement, type ReactNode } from 'react'

const {
  mockSelect,
  mockInsert,
  mockDelete,
  mockEq,
  mockOrder,
  mockSubscribe,
  mockOn,
  mockChannel,
  mockRemoveChannel,
} = vi.hoisted(() => {
  const mockSelect = vi.fn()
  const mockInsert = vi.fn()
  const mockDelete = vi.fn()
  const mockEq = vi.fn()
  const mockOrder = vi.fn()
  const mockSubscribe = vi.fn().mockReturnValue({ id: 'test-channel' })
  const mockOn = vi.fn().mockReturnValue({ subscribe: mockSubscribe })
  const mockChannel = vi.fn().mockReturnValue({ on: mockOn })
  const mockRemoveChannel = vi.fn()
  return { mockSelect, mockInsert, mockDelete, mockEq, mockOrder, mockSubscribe, mockOn, mockChannel, mockRemoveChannel }
})

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn((table: string) => {
      if (table === 'assignments') {
        return {
          select: mockSelect,
          insert: mockInsert,
          delete: mockDelete,
        }
      }
      return {}
    }),
    channel: mockChannel,
    removeChannel: mockRemoveChannel,
  },
}))

import { useAssignments, useAddAssignments, useDeleteAssignment } from '@/hooks/useAssignments'

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  return function Wrapper({ children }: { children: ReactNode }) {
    return createElement(QueryClientProvider, { client: queryClient }, children)
  }
}

describe('useAssignments', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockOrder.mockResolvedValue({
      data: [
        { id: '1', item_id: 'item-1', user_name: 'Alice', custom_note: null, created_at: '2026-01-01' },
        { id: '2', item_id: 'item-2', user_name: 'Bob', custom_note: 'my knife', created_at: '2026-01-02' },
      ],
      error: null,
    })
    mockSelect.mockReturnValue({ order: mockOrder })
  })

  it('fetches assignments from supabase', async () => {
    const { result } = renderHook(() => useAssignments(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toHaveLength(2)
    expect(result.current.data![0].user_name).toBe('Alice')
    expect(result.current.data![1].custom_note).toBe('my knife')
  })

  it('handles supabase error', async () => {
    mockOrder.mockResolvedValue({ data: null, error: { message: 'DB error' } })

    const { result } = renderHook(() => useAssignments(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error).toBeTruthy()
  })

  it('subscribes to realtime channel and cleans up', () => {
    const wrapper = createWrapper()
    const { unmount } = renderHook(() => useAssignments(), { wrapper })

    expect(mockChannel).toHaveBeenCalledWith('assignments-realtime')
    expect(mockOn).toHaveBeenCalledWith(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'assignments' },
      expect.any(Function)
    )
    expect(mockSubscribe).toHaveBeenCalled()

    unmount()
    expect(mockRemoveChannel).toHaveBeenCalled()
  })
})

describe('useAddAssignments', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSelect.mockReturnValue({
      order: vi.fn().mockResolvedValue({ data: [], error: null }),
    })
  })

  it('inserts assignments via supabase', async () => {
    const mockInsertSelect = vi.fn().mockResolvedValue({
      data: [{ id: '3', item_id: 'item-1', user_name: 'Charlie', custom_note: null, created_at: '2026-01-03' }],
      error: null,
    })
    mockInsert.mockReturnValue({ select: mockInsertSelect })

    const { result } = renderHook(() => useAddAssignments(), { wrapper: createWrapper() })

    result.current.mutate([{ item_id: 'item-1', user_name: 'Charlie' }])

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(mockInsert).toHaveBeenCalledWith([{ item_id: 'item-1', user_name: 'Charlie' }])
  })

  it('handles insert error', async () => {
    const mockInsertSelect = vi.fn().mockResolvedValue({
      data: null,
      error: { message: 'Insert failed' },
    })
    mockInsert.mockReturnValue({ select: mockInsertSelect })

    const { result } = renderHook(() => useAddAssignments(), { wrapper: createWrapper() })

    result.current.mutate([{ item_id: 'item-1', user_name: 'Charlie' }])

    await waitFor(() => expect(result.current.isError).toBe(true))
  })
})

describe('useDeleteAssignment', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSelect.mockReturnValue({
      order: vi.fn().mockResolvedValue({ data: [], error: null }),
    })
  })

  it('deletes an assignment by id', async () => {
    mockEq.mockResolvedValue({ error: null })
    mockDelete.mockReturnValue({ eq: mockEq })

    const { result } = renderHook(() => useDeleteAssignment(), { wrapper: createWrapper() })

    result.current.mutate('assignment-1')

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(mockDelete).toHaveBeenCalled()
    expect(mockEq).toHaveBeenCalledWith('id', 'assignment-1')
  })

  it('handles delete error', async () => {
    mockEq.mockResolvedValue({ error: { message: 'Delete failed' } })
    mockDelete.mockReturnValue({ eq: mockEq })

    const { result } = renderHook(() => useDeleteAssignment(), { wrapper: createWrapper() })

    result.current.mutate('assignment-1')

    await waitFor(() => expect(result.current.isError).toBe(true))
  })
})
