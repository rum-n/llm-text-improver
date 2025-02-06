import { render, screen, fireEvent } from '@testing-library/react'
import TextInput from './TextInput'

describe('TextInput', () => {
  it('renders textarea and button', () => {
    render(
      <TextInput
        value=""
        onChange={() => { }}
        onSubmit={() => { }}
      />
    )

    expect(screen.getByPlaceholderText('Enter your text here...')).toBeInTheDocument()
    expect(screen.getByText('Enhance Text')).toBeInTheDocument()
  })

  it('calls onChange when text is entered', () => {
    const mockOnChange = jest.fn()
    render(
      <TextInput
        value=""
        onChange={mockOnChange}
        onSubmit={() => { }}
      />
    )

    fireEvent.change(screen.getByPlaceholderText('Enter your text here...'), {
      target: { value: 'test text' },
    })

    expect(mockOnChange).toHaveBeenCalledWith('test text')
  })

  it('calls onSubmit when button is clicked', () => {
    const mockOnSubmit = jest.fn()
    render(
      <TextInput
        value=""
        onChange={() => { }}
        onSubmit={mockOnSubmit}
      />
    )

    fireEvent.click(screen.getByText('Enhance Text'))
    expect(mockOnSubmit).toHaveBeenCalled()
  })
})