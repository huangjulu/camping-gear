import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createElement, type ReactNode } from 'react'

const mockOrder = vi.fn()
const mockSelect = vi.fn()

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn((table: string) => {
      if (table === 'categories' || table === 'items') {
        return { select: mockSelect }
      }
      return {}
    }),
  },
}))

import { useCategories, useItems } from '@/hooks/useCategories'

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return function Wrapper({ children }: { children: ReactNode }) {
    return createElement(QueryClientProvider, { client: queryClient }, children)
  }
}

describe('useCategories', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches categories ordered by sort_order', async () => {
    const mockData = [
      { id: 'cat-1', name: '炊事', icon: '🍳', sort_order: 1 },
      { id: 'cat-2', name: '照明', icon: '🔦', sort_order: 2 },
    ]
    mockOrder.mockResolvedValue({ data: mockData, error: null })
    mockSelect.mockReturnValue({ order: mockOrder })

    const { result } = renderHook(() => useCategories(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toHaveLength(2)
    expect(result.current.data![0].name).toBe('炊事')
    expect(mockSelect).toHaveBeenCalledWith('*')
    expect(mockOrder).toHaveBeenCalledWith('sort_order')
  })

  it('handles error', async () => {
    mockOrder.mockResolvedValue({ data: null, error: { message: 'fail' } })
    mockSelect.mockReturnValue({ order: mockOrder })

    const { result } = renderHook(() => useCategories(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isError).toBe(true))
  })
})

describe('useItems', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches items ordered by sort_order', async () => {
    const mockData = [
      { id: 'item-1', category_id: 'cat-1', name: '卡式爐', slot_limit: 1, note: null, sort_order: 1 },
      { id: 'item-2', category_id: 'cat-1', name: '鍋子', slot_limit: 2, note: '大的', sort_order: 2 },
    ]
    mockOrder.mockResolvedValue({ data: mockData, error: null })
    mockSelect.mockReturnValue({ order: mockOrder })

    const { result } = renderHook(() => useItems(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toHaveLength(2)
    expect(result.current.data![0].name).toBe('卡式爐')
    expect(result.current.data![1].note).toBe('大的')
  })

  it('handles error', async () => {
    mockOrder.mockResolvedValue({ data: null, error: { message: 'fail' } })
    mockSelect.mockReturnValue({ order: mockOrder })

    const { result } = renderHook(() => useItems(), { wrapper: createWrapper() })

    await waitFor(() => expect(result.current.isError).toBe(true))
  })
})
