import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBox } from '@/components/SearchBox'

describe('SearchBox', () => {
  it('renders with placeholder text', () => {
    render(<SearchBox value="" onChange={vi.fn()} />)
    expect(screen.getByPlaceholderText('尼要找水嗎??')).toBeInTheDocument()
  })

  it('displays the draft value from props', () => {
    render(<SearchBox value="test" onChange={vi.fn()} />)
    expect(screen.getByDisplayValue('test')).toBeInTheDocument()
  })

  it('calls onChange on Enter key', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SearchBox value="" onChange={onChange} />)

    const input = screen.getByPlaceholderText('尼要找水嗎??')
    await user.type(input, '瑞{Enter}')

    expect(onChange).toHaveBeenCalledWith('瑞')
  })

  it('trims whitespace on commit', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SearchBox value="" onChange={onChange} />)

    const input = screen.getByPlaceholderText('尼要找水嗎??')
    await user.type(input, '  瑞  {Enter}')

    expect(onChange).toHaveBeenCalledWith('瑞')
  })

  it('shows clear button when draft has value', async () => {
    const user = userEvent.setup()
    render(<SearchBox value="" onChange={vi.fn()} />)

    const input = screen.getByPlaceholderText('尼要找水嗎??')
    await user.type(input, 'test')

    // The X button should now be visible
    const clearButtons = screen.getAllByRole('button')
    expect(clearButtons.length).toBeGreaterThan(0)
  })

  it('clears input and calls onChange with empty string when clear button clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SearchBox value="" onChange={onChange} />)

    const input = screen.getByPlaceholderText('尼要找水嗎??')
    await user.type(input, 'test')

    const clearButton = screen.getByRole('button')
    await user.click(clearButton)

    expect(onChange).toHaveBeenCalledWith('')
    expect(input).toHaveValue('')
  })

  it('syncs draft when external value resets to empty', async () => {
    const { rerender } = render(<SearchBox value="hello" onChange={vi.fn()} />)

    expect(screen.getByDisplayValue('hello')).toBeInTheDocument()

    rerender(<SearchBox value="" onChange={vi.fn()} />)

    expect(screen.getByPlaceholderText('尼要找水嗎??')).toHaveValue('')
  })

  it('does not show clear button when input is empty', () => {
    render(<SearchBox value="" onChange={vi.fn()} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
