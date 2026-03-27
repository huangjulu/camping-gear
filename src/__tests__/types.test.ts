import { describe, it, expectTypeOf } from 'vitest'
import type { Category, Item, Assignment, CategoryWithItems, ItemWithAssignments, FormData } from '@/types'

describe('Type definitions', () => {
  it('Category has correct shape', () => {
    expectTypeOf<Category>().toHaveProperty('id')
    expectTypeOf<Category>().toHaveProperty('name')
    expectTypeOf<Category>().toHaveProperty('icon')
    expectTypeOf<Category>().toHaveProperty('sort_order')

    // icon is nullable
    expectTypeOf<Category['icon']>().toEqualTypeOf<string | null>()
  })

  it('Item has correct shape', () => {
    expectTypeOf<Item>().toHaveProperty('id')
    expectTypeOf<Item>().toHaveProperty('category_id')
    expectTypeOf<Item>().toHaveProperty('name')
    expectTypeOf<Item>().toHaveProperty('slot_limit')
    expectTypeOf<Item>().toHaveProperty('note')
    expectTypeOf<Item>().toHaveProperty('sort_order')

    // nullable fields
    expectTypeOf<Item['slot_limit']>().toEqualTypeOf<number | null>()
    expectTypeOf<Item['note']>().toEqualTypeOf<string | null>()
  })

  it('Assignment has correct shape', () => {
    expectTypeOf<Assignment>().toHaveProperty('id')
    expectTypeOf<Assignment>().toHaveProperty('item_id')
    expectTypeOf<Assignment>().toHaveProperty('user_name')
    expectTypeOf<Assignment>().toHaveProperty('custom_note')
    expectTypeOf<Assignment>().toHaveProperty('created_at')

    expectTypeOf<Assignment['custom_note']>().toEqualTypeOf<string | null>()
  })

  it('CategoryWithItems extends Category with items array', () => {
    expectTypeOf<CategoryWithItems>().toHaveProperty('items')
    expectTypeOf<CategoryWithItems['items']>().toEqualTypeOf<Item[]>()
    // Also has Category fields
    expectTypeOf<CategoryWithItems>().toHaveProperty('id')
    expectTypeOf<CategoryWithItems>().toHaveProperty('name')
  })

  it('ItemWithAssignments extends Item with assignments array', () => {
    expectTypeOf<ItemWithAssignments>().toHaveProperty('assignments')
    expectTypeOf<ItemWithAssignments['assignments']>().toEqualTypeOf<Assignment[]>()
    expectTypeOf<ItemWithAssignments>().toHaveProperty('id')
    expectTypeOf<ItemWithAssignments>().toHaveProperty('category_id')
  })

  it('FormData has user_name and selections', () => {
    expectTypeOf<FormData>().toHaveProperty('user_name')
    expectTypeOf<FormData>().toHaveProperty('selections')
    expectTypeOf<FormData['user_name']>().toEqualTypeOf<string>()
  })
})
