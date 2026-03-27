import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn()', () => {
  it('merges class names', () => {
    expect(cn('px-2', 'py-3')).toBe('px-2 py-3')
  })

  it('handles conditional classes via clsx', () => {
    expect(cn('base', false && 'hidden', 'extra')).toBe('base extra')
  })

  it('resolves Tailwind conflicts (last wins)', () => {
    const result = cn('px-2', 'px-4')
    expect(result).toBe('px-4')
  })

  it('handles undefined and null inputs', () => {
    expect(cn(undefined, null, 'valid')).toBe('valid')
  })

  it('handles empty call', () => {
    expect(cn()).toBe('')
  })

  it('handles array inputs', () => {
    expect(cn(['px-2', 'py-3'])).toBe('px-2 py-3')
  })

  it('deduplicates and resolves complex Tailwind conflicts', () => {
    const result = cn('text-red-500', 'text-blue-500')
    expect(result).toBe('text-blue-500')
  })
})
