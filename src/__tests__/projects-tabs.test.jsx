import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Projects from '../components/Projects'

describe('Projects tabs', () => {
  it('switches between tabs', async () => {
    render(<Projects />)
    // default is DS
    expect(screen.getByText(/Deepfake Detection/)).toBeInTheDocument()
    // switch to Web
    fireEvent.click(screen.getByRole('button', { name: /Web Development/ }))
    expect(await screen.findByText(/Animated Portfolio/)).toBeInTheDocument()
  })
})
