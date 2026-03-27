import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createElement, type ReactNode } from 'react'
import { GearTable } from '@/components/GearTable'
import type { Category, Item, Assignment } from '@/types'

// Mock supabase for hooks used inside GearTable
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnValue({
        order: vi.fn().mockResolvedValue({ data: [], error: null }),
      }),
      insert: vi.fn().mockReturnValue({
        select: vi.fn().mockResolvedValue({ data: [], error: null }),
      }),
      delete: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ error: null }),
      }),
    })),
    channel: vi.fn().mockReturnValue({
      on: vi.fn().mockReturnValue({
        subscribe: vi.fn().mockReturnValue({ id: 'ch' }),
      }),
    }),
    removeChannel: vi.fn(),
  },
}))

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return function Wrapper({ children }: { children: ReactNode }) {
    return createElement(QueryClientProvider, { client: queryClient }, children)
  }
}

const sampleCategories: Category[] = [
  { id: 'cat-1', name: '炊事', icon: '🍳', sort_order: 1 },
  { id: 'cat-2', name: '照明', icon: '🔦', sort_order: 2 },
]

const sampleItems: Item[] = [
  { id: 'item-1', category_id: 'cat-1', name: '卡式爐', slot_limit: 1, note: null, sort_order: 1 },
  { id: 'item-2', category_id: 'cat-1', name: '鍋子', slot_limit: 2, note: '大的', sort_order: 2 },
  { id: 'item-3', category_id: 'cat-2', name: '頭燈', slot_limit: null, note: null, sort_order: 1 },
]

const sampleAssignments: Assignment[] = [
  { id: 'a1', item_id: 'item-1', user_name: '瑞', custom_note: null, created_at: '2026-01-01' },
  { id: 'a2', item_id: 'item-2', user_name: '豪豪', custom_note: '大鍋', created_at: '2026-01-02' },
  { id: 'a3', item_id: 'item-3', user_name: '瑞', custom_note: null, created_at: '2026-01-03' },
]

describe('GearTable', () => {
  it('renders empty state when no assignments', () => {
    render(
      createElement(createWrapper(), null,
        createElement(GearTable, {
          categories: sampleCategories,
          items: sampleItems,
          assignments: [],
          searchQuery: '',
        })
      )
    )

    expect(screen.getByText(/還沒有人認領裝備/)).toBeInTheDocument()
  })

  it('renders category headers and item names', () => {
    render(
      createElement(createWrapper(), null,
        createElement(GearTable, {
          categories: sampleCategories,
          items: sampleItems,
          assignments: sampleAssignments,
          searchQuery: '',
        })
      )
    )

    // Category headers
    expect(screen.getByText(/炊事/)).toBeInTheDocument()
    expect(screen.getByText(/照明/)).toBeInTheDocument()

    // Item names
    expect(screen.getByText('卡式爐')).toBeInTheDocument()
    expect(screen.getByText('鍋子')).toBeInTheDocument()
    expect(screen.getByText('頭燈')).toBeInTheDocument()
  })

  it('renders user names as column headers', () => {
    render(
      createElement(createWrapper(), null,
        createElement(GearTable, {
          categories: sampleCategories,
          items: sampleItems,
          assignments: sampleAssignments,
          searchQuery: '',
        })
      )
    )

    expect(screen.getByText('瑞')).toBeInTheDocument()
    expect(screen.getByText('豪豪')).toBeInTheDocument()
  })

  it('shows slot limit counts', () => {
    render(
      createElement(createWrapper(), null,
        createElement(GearTable, {
          categories: sampleCategories,
          items: sampleItems,
          assignments: sampleAssignments,
          searchQuery: '',
        })
      )
    )

    // item-1 (卡式爐) has slot_limit=1, 1 assignment → (1/1)
    expect(screen.getByText('(1/1)')).toBeInTheDocument()
    // item-2 (鍋子) has slot_limit=2, 1 assignment → (1/2)
    expect(screen.getByText('(1/2)')).toBeInTheDocument()
  })

  it('shows item notes', () => {
    render(
      createElement(createWrapper(), null,
        createElement(GearTable, {
          categories: sampleCategories,
          items: sampleItems,
          assignments: sampleAssignments,
          searchQuery: '',
        })
      )
    )

    expect(screen.getByText('大的')).toBeInTheDocument()
  })

  it('shows not-found state when search has no matches', () => {
    render(
      createElement(createWrapper(), null,
        createElement(GearTable, {
          categories: sampleCategories,
          items: sampleItems,
          assignments: sampleAssignments,
          searchQuery: '不存在的人',
        })
      )
    )

    expect(screen.getByText(/找不到/)).toBeInTheDocument()
  })

  it('filters by search query matching user name', () => {
    render(
      createElement(createWrapper(), null,
        createElement(GearTable, {
          categories: sampleCategories,
          items: sampleItems,
          assignments: sampleAssignments,
          searchQuery: '瑞',
        })
      )
    )

    // 瑞 should be visible, 豪豪 should not
    expect(screen.getByText('瑞')).toBeInTheDocument()
    expect(screen.queryByText('豪豪')).not.toBeInTheDocument()
  })
})
