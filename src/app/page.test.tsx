import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Home from './page'

global.fetch = jest.fn()

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the title and text input', () => {
    render(<Home />)
    expect(screen.getByText('The Magic Text Enhancer')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your text here...')).toBeInTheDocument()
  })

  it('handles text enhancement flow', async () => {
    const mockResponse = { correctedText: 'Enhanced text' }
      ; (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse),
      })

    render(<Home />)

    fireEvent.change(screen.getByPlaceholderText('Enter your text here...'), {
      target: { value: 'test text' },
    })

    fireEvent.click(screen.getByText('Enhance Text'))

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: 'test text' }),
      })
    })

    expect(await screen.findByText('Enhanced text')).toBeInTheDocument()
  })

  it('handles API error gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { })
      ; (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

    render(<Home />)

    fireEvent.change(screen.getByPlaceholderText('Enter your text here...'), {
      target: { value: 'test text' },
    })

    fireEvent.click(screen.getByText('Enhance Text'))

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled()
    })

    consoleSpy.mockRestore()
  })
})