import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Home from './page'

let mockComplete = jest.fn();

jest.mock('ai/react', () => ({
  useCompletion: () => ({
    complete: mockComplete,
    completion: '',
    isLoading: false
  })
}));

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockComplete = jest.fn();
  })

  it('renders the title and text input', () => {
    render(<Home />)
    expect(screen.getByText('The Magic Text Enhancer')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your text here...')).toBeInTheDocument()
  })

  it('handles text enhancement flow', async () => {
    const { getByPlaceholderText, getByText } = render(<Home />)

    const textarea = getByPlaceholderText('Enter your text here...')
    fireEvent.change(textarea, { target: { value: 'test text' } })

    const button = getByText('Enhance Text')
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.queryByText('Failed to enhance text. Please try again.')).not.toBeInTheDocument()
    })
  })

  it('handles API error gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { })
    mockComplete.mockRejectedValueOnce(new Error('API Error'))

    render(<Home />)

    fireEvent.change(screen.getByPlaceholderText('Enter your text here...'), {
      target: { value: 'test text' },
    })

    fireEvent.click(screen.getByText('Enhance Text'))

    await waitFor(() => {
      expect(screen.getByText('Failed to enhance text. Please try again.')).toBeInTheDocument()
    })

    consoleSpy.mockRestore()
  })
})